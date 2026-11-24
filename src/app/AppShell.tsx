import { Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";

export function AppShell() {
  const { pathname } = useLocation();
  const isScan = pathname === "/scan";

  return (
    <div className={isScan ? "app-shell app-shell--scan" : "app-shell"}>
      <div className="app-content">
        <Outlet />
      </div>
      {!isScan && <BottomNav />}
    </div>
  );
}
