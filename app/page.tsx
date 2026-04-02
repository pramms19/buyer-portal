import { HomeIcon, LayoutDashboard, LogIn } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-background px-6">
      {/* Subtle Background Pattern */}

      <div className="z-10 w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-6">
          <HomeIcon className="w-8 h-8 text-primary-foreground" />
        </div>

        <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">
          Buyer Portal
        </h1>

        <p className="text-slate-500 mb-8 text-sm">
          Find your dream home. Log in to save properties and manage your
          personal dashboard.
        </p>

        <div className="grid grid-cols-1 gap-4">
          <Link href="/login">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/10 text-white hover:text-accent font-semibold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95">
              <LogIn className="w-5 h-5" />
              Login
            </button>
          </Link>

          <Link href="/dashboard">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-a text-accent hover:border-accent hover:bg-accent/10 font-semibold rounded-xl transition-all active:scale-95">
              <LayoutDashboard className="w-5 h-5 text-accent" />
              Go to Dashboard
            </button>
          </Link>
        </div>

        <p className="mt-8 text-sm text-slate-400">
          Trusted by over 10,000+ home buyers.
        </p>
      </div>
    </main>
  );
}
