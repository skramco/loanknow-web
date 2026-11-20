export type PartnerLogo = {
  id: string;
  name: string;
  src: string;
  href?: string;
  linkable?: boolean;
};

export const PARTNER_LOGOS: PartnerLogo[] = [
  {
    id: "owen",
    name: "Owen AI",
    src: "/partners/owen-wordmark.svg",
    linkable: false,
  },
  {
    id: "dett",
    name: "dett.io",
    href: "https://dett.io",
    src: "/partners/dett-logo.png",
  },
  {
    id: "clozable",
    name: "Clozable",
    href: "https://clozable.com",
    src: "/partners/clozable-wordmark.svg",
  },
  {
    id: "ratesboard",
    name: "Ratesboard",
    href: "https://ratesboard.com",
    src: "/partners/ratesboard-wordmark-color.svg",
  },
];