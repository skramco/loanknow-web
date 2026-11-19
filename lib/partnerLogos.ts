export type PartnerLogo = {
  id: string;
  name: string;
  href: string;
  src: string;
};

export const PARTNER_LOGOS: PartnerLogo[] = [
  {
    id: "owen",
    name: "Owen AI",
    href: "https://owenai.com",
    src: "/partners/owen-wordmark.svg",
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