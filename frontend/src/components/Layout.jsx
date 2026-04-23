export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold">🚀 Placement Admin</h1>
        <nav className="flex flex-col gap-4">
          <a href="/dashboard" className="hover:text-gray-200">Dashboard</a>
          <a href="/students" className="hover:text-gray-200">Students</a>
          <a href="/companies" className="hover:text-gray-200">Companies</a>
          <a href="/placements" className="hover:text-gray-200">Placements</a>
          <a href="/reports" className="hover:text-gray-200">Reports</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}