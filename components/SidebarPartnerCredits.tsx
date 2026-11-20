import { PARTNER_LOGOS } from "@/lib/partnerLogos";
import { PartnerLogoLink } from "@/components/PartnerLogoLink";
import { PartnerLogoMark } from "@/components/PartnerLogoMark";

const SIDEBAR_LOGO_HEIGHT_PX = 11;

export function SidebarPartnerCredits() {
  return (
    <div className="sidebar-partners">
      <p className="sidebar-partners-label">Powered by</p>
      <ul className="sidebar-partners-list">
        {PARTNER_LOGOS.map((partner) => {
          const imgClassName = `sidebar-partner-wordmark partner-logo sidebar-partner-wordmark--${partner.id}`;
          return (
            <li key={partner.id}>
              {partner.linkable === false || !partner.href ? (
                <PartnerLogoMark
                  label={partner.name}
                  src={partner.src}
                  className="sidebar-partner-mark"
                  imgClassName={imgClassName}
                  height={SIDEBAR_LOGO_HEIGHT_PX}
                />
              ) : (
                <PartnerLogoLink
                  href={partner.href}
                  label={partner.name}
                  src={partner.src}
                  className="sidebar-partner-link"
                  imgClassName={imgClassName}
                  height={SIDEBAR_LOGO_HEIGHT_PX}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}