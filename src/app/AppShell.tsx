import { Outlet } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import { StatusBar } from "../components/StatusBar";

export function AppShell() {
  return (
    <div className="app-shell">
      <StatusBar />
      <div className="app-content">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
