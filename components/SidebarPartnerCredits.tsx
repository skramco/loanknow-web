const WORDMARK_HEIGHT_PX = 15;

type SidebarPartner = {
  name: string;
  href: string;
  src: string;
  color?: boolean;
};

const partners: SidebarPartner[] = [
  {
    name: "Owen AI",
    href: "https://owenai.com",
    src: "/partners/owen-wordmark.svg",
  },
  {
    name: "dett.io",
    href: "https://dett.io",
    src: "/partners/dett-wordmark.svg",
  },
  {
    name: "Clozable",
    href: "https://clozable.com",
    src: "/partners/clozable-wordmark.svg",
    color: true,
  },
  {
    name: "Ratesboard",
    href: "https://ratesboard.com",
    src: "/partners/ratesboard-wordmark-color.svg",
    color: true,
  },
];

export function SidebarPartnerCredits() {
  return (
    <div className="sidebar-partners">
      <p className="sidebar-partners-label">Powered by</p>
      <ul className="sidebar-partners-list">
        {partners.map((partner) => (
          <li key={partner.href}>
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-partner-link"
              aria-label={partner.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.src}
                alt=""
                className={
                  partner.color
                    ? "sidebar-partner-wordmark sidebar-partner-wordmark--color"
                    : "sidebar-partner-wordmark"
                }
                height={WORDMARK_HEIGHT_PX}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}