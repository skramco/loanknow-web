"use client";

import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useId,
  useState,
} from "react";

type Props = {
  placeholder: string;
  hint: string;
  initialValue?: string;
  disabled?: boolean;
  onSubmit: (question: string) => void | Promise<void>;
  compact?: boolean;
};

export function AskForm({
  placeholder,
  hint,
  initialValue = "",
  disabled,
  onSubmit,
  compact,
}: Props) {
  const [value, setValue] = useState(initialValue);
  const [busy, setBusy] = useState(false);
  const textareaId = useId();

  const submit = useCallback(async () => {
    const trimmed = value.trim();
    if (!trimmed || disabled || busy) return;
    setBusy(true);
    try {
      await onSubmit(trimmed);
    } finally {
      setBusy(false);
    }
  }, [busy, disabled, onSubmit, value]);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submit();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void submit();
    }
  };

  return (
    <form
      className={`ask${compact ? " ask-compact" : ""}`}
      onSubmit={onFormSubmit}
    >
      <label htmlFor={textareaId} className="visually-hidden">
        Your mortgage question
      </label>
      <textarea
        id={textareaId}
        rows={compact ? 1 : 2}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled || busy}
      />
      <div className="ask-row">
        <span className="ask-hint">{hint}</span>
        <button
          type="submit"
          className="send"
          aria-label="Submit question"
          disabled={disabled || busy || !value.trim()}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
}