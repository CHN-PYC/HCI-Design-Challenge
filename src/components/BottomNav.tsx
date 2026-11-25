import { NavLink } from "react-router-dom";
import { useI18n } from "../i18n/useI18n";

function HomeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5Z" />
    </svg>
  );
}

function PlanIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15l1.5-2ZM10 21h4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

const tabClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "tab on" : "tab";

export function BottomNav() {
  const { t } = useI18n();

  return (
    <nav aria-label={t("Primary navigation", "主导航")} className="tabbar">
      <NavLink className={tabClass} end to="/home">
        <HomeIcon />
        <span>{t("Home", "首页")}</span>
      </NavLink>
      <NavLink className={tabClass} to="/plan">
        <PlanIcon />
        <span>{t("Plan", "餐单")}</span>
      </NavLink>
      <NavLink aria-label={t("Scan", "扫描")} className="scan-tab" to="/scan">
        <span className="scan-fab">
          <ScanIcon />
        </span>
      </NavLink>
      <NavLink className={tabClass} to="/nudges/settings">
        <BellIcon />
        <span>{t("Nudges", "提醒")}</span>
      </NavLink>
      <NavLink className={tabClass} to="/me">
        <UserIcon />
        <span>{t("Me", "我")}</span>
      </NavLink>
    </nav>
  );
}
