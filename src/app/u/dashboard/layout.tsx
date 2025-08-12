import { ReactNode } from 'react';
import Link from 'next/link';
import { 
  Home, 
  LayoutDashboard, 
  Folder, 
  Settings,
  User,
  ChevronRight,
  PlusCircle,
  Bell,
  Search
} from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-gradient-to-b from-blue-500 to-slate-50 min-h-screen">
      <div className="flex h-full">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-lg h-screen sticky top-0 flex flex-col m-2 rounded-2xl">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            </h1>
          </div>
          
          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <NavItem href="/" icon={<Home className="w-5 h-5" />} text="Home" />
            <NavItem href="/projects" icon={<Folder className="w-5 h-5" />} text="Projects" />
            <NavItem href="/tasks" icon={<ChevronRight className="w-5 h-5" />} text="Tasks" />
            <NavItem href="/team" icon={<User className="w-5 h-5" />} text="Team" />
            <NavItem href="/settings" icon={<Settings className="w-5 h-5" />} text="Settings" />
          </nav>
          
          {/* User Profile & Bottom Navigation */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
              <Settings className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          
          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

// Reusable NavItem component
function NavItem({ href, icon, text }: { href: string; icon: ReactNode; text: string }) {
  return (
    <Link href={href}>
      <div className="flex items-center px-4 py-3 mx-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">
        <span className="mr-3">{icon}</span>
        <span className="text-sm font-medium">{text}</span>
      </div>
    </Link>
  );
}