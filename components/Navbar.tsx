import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          ApplyFlow
        </Link>

        <div className="flex gap-6 text-sm font-medium">
          <Link href="/" className="text-gray-700 hover:text-gray-900 hover:underline">
            Dashboard
          </Link>
          <Link href="/applications" className="text-gray-700 hover:text-gray-900 hover:underline">
            Applications
          </Link>
        </div>
      </div>
    </nav>
  );
}