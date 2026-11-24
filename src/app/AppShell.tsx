import { Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import { StatusBar } from "../components/StatusBar";

export function AppShell() {
  const { pathname } = useLocation();
  const isScan = pathname === "/scan";

  return (
    <div className={isScan ? "app-shell app-shell--scan" : "app-shell"}>
      <StatusBar light={isScan} />
      <div className="app-content">
        <Outlet />
      </div>
      {!isScan && <BottomNav />}
    </div>
  );
}
