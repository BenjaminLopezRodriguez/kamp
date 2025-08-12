import { ReactNode } from "react";
import Link from "next/link";
import {
  Home,
  LayoutDashboard,
  Folder,
  Settings,
  User,
  ChevronRight,
  PlusCircle,
  Bell,
  Search,
} from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-500 to-slate-50">
      <div className="flex h-full">
        {/* Sidebar Navigation */}
        <aside className="sticky top-0 m-2 flex h-screen w-64 flex-col rounded-2xl bg-white shadow-lg">
          <div className="border-b p-4">
            <h1 className="flex items-center gap-2 text-2xl font-bold text-blue-600"></h1>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <NavItem href="/" icon={<Home className="h-5 w-5" />} text="Home" />
            <NavItem
              href="/projects"
              icon={<Folder className="h-5 w-5" />}
              text="Projects"
            />
            <NavItem
              href="/tasks"
              icon={<ChevronRight className="h-5 w-5" />}
              text="Tasks"
            />
            <NavItem
              href="/team"
              icon={<User className="h-5 w-5" />}
              text="Team"
            />
            <NavItem
              href="/settings"
              icon={<Settings className="h-5 w-5" />}
              text="Settings"
            />
          </nav>

          {/* User Profile & Bottom Navigation */}
          <div className="border-t p-4">
            <div className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                <User className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
              <Settings className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </main>
  );
}

// Reusable NavItem component
function NavItem({
  href,
  icon,
  text,
}: {
  href: string;
  icon: ReactNode;
  text: string;
}) {
  return (
    <Link href={href}>
      <div className="mx-2 flex cursor-pointer items-center rounded-lg px-4 py-3 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600">
        <span className="mr-3">{icon}</span>
        <span className="text-sm font-medium">{text}</span>
      </div>
    </Link>
  );
}
