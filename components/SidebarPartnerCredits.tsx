import { PARTNER_LOGOS } from "@/lib/partnerLogos";
import { PartnerLogoLink } from "@/components/PartnerLogoLink";

const SIDEBAR_LOGO_HEIGHT_PX = 11;

export function SidebarPartnerCredits() {
  return (
    <div className="sidebar-partners">
      <p className="sidebar-partners-label">Powered by</p>
      <ul className="sidebar-partners-list">
        {PARTNER_LOGOS.map((partner) => (
          <li key={partner.href}>
            <PartnerLogoLink
              href={partner.href}
              label={partner.name}
              src={partner.src}
              className="sidebar-partner-link"
              imgClassName={`sidebar-partner-wordmark partner-logo sidebar-partner-wordmark--${partner.id}`}
              height={SIDEBAR_LOGO_HEIGHT_PX}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}