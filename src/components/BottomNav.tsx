import { NavLink } from "react-router-dom";

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
      <path d="M16 10h-2l-1.5-2h-4L7 10H6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1Z" />
      <circle cx="11" cy="15" r="3.2" />
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

const tabs = [
  { label: "Home", to: "/home", icon: <HomeIcon /> },
  { label: "Plan", to: "/plan", icon: <PlanIcon /> },
  { label: "Nudges", to: "/nudges/settings", icon: <BellIcon /> },
  { label: "Me", to: "/preferences?mode=edit", icon: <UserIcon /> },
];

export function BottomNav() {
  return (
    <nav aria-label="Primary navigation" className="tabbar">
      <NavLink
        className={({ isActive }) => (isActive ? "tab on" : "tab")}
        end
        to="/home"
      >
        {tabs[0].icon}
        <span>Home</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "tab on" : "tab")}
        to="/plan"
      >
        {tabs[1].icon}
        <span>Plan</span>
      </NavLink>
      <NavLink aria-label="Scan" className="tab" to="/scan">
        <span className="scan-btn">
          <ScanIcon />
        </span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "tab on" : "tab")}
        to="/nudges/settings"
      >
        {tabs[2].icon}
        <span>Nudges</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "tab on" : "tab")}
        to={tabs[3].to}
      >
        {tabs[3].icon}
        <span>Me</span>
      </NavLink>
    </nav>
  );
}
