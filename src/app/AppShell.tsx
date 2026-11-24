import { NavLink, Outlet } from "react-router-dom";

const navigation = [
  { label: "Home", to: "/home" },
  { label: "Plan", to: "/plan" },
  { label: "Scan", to: "/scan" },
  { label: "Nudges", to: "/nudges/settings" },
  { label: "Me", to: "/preferences?mode=edit" },
];

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-wordmark">NutriPal</span>
        <span className="app-status">Prototype</span>
      </header>
      <div className="app-content">
        <Outlet />
      </div>
      <nav aria-label="Primary navigation" className="bottom-nav">
        {navigation.map((item) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? "bottom-nav__item is-active" : "bottom-nav__item"
            }
            key={item.to}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
