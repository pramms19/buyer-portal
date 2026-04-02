import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Buyer Portal</h1>

      <p>Welcome! Please login to manage your favourite properties.</p>

      <div className="flex gap-4">
        <Link href="/login">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Login
          </button>
        </Link>

        <Link href="/dashboard">
          <button className="px-4 py-2 bg-green-500 text-white rounded">
            Dashboard
          </button>
        </Link>
      </div>
    </main>
  );
}
