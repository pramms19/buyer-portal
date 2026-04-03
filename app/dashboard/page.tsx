"use client";
import { useEffect, useState } from "react";
import { Heart, Home, LogOut, User, MapPin } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [properties, setProperties] = useState<any[]>([]);
  const [favs, setFavs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null); 

  useEffect(() => {
    const loadData = async () => {
      try {
        const [propRes, favRes] = await Promise.all([
          fetch("/api/properties", {
            credentials: "include", 
          }),
          fetch("/api/favourites", {
            credentials: "include", 
          }),
        ]);

        if (!propRes.ok) throw new Error("Failed to load properties");

        if (favRes.status === 401) {
          window.location.href = "/login";
          return;
        }

        if (!favRes.ok) throw new Error("Failed to load favourites");

        const propData = await propRes.json();
        const favData = await favRes.json();

        setProperties(propData);

        if (Array.isArray(favData)) {
          setFavs(favData.map((f: any) => f.propertyId));
        } else {
          setFavs([]);
        }

        try {
          const userRes = await fetch("/api/me", {
            credentials: "include",
          });
          if (userRes.ok) {
            const userData = await userRes.json();
            setUser(userData);
          }
        } catch {}

      } catch (err: any) {
        console.error("Failed to load data", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleFav = async (id: string) => {
    const isFav = favs.includes(id);

    setFavs(prev =>
      isFav ? prev.filter(favId => favId !== id) : [...prev, id]
    );

    try {
      const res = await fetch("/api/favourites", {
        method: isFav ? "DELETE" : "POST",
        credentials: "include", // ✅ FIX
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: id }),
      });

      if (!res.ok) throw new Error("Failed to update favourite");
    } catch (err) {
      console.error(err);

      // rollback
      setFavs(prev =>
        isFav ? [...prev, id] : prev.filter(favId => favId !== id)
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <Home className="w-6 h-6" />
          <span>EstatePortal</span>
        </div>

        <div className="flex items-center gap-4">
        
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
            <User className="w-4 h-4" />
            {user?.name || "Buyer Account"}
          </div>

          <Link
            href="/login"
            className="text-primary hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">
            Recommended Properties
          </h1>
          <p className="text-slate-500">
            Based on your recent searches
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 group"
            >
              <div className="relative h-48 bg-slate-200">
                <img
                  src={
                    p.image ||
                    "https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
                  }
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />

                <button
                  onClick={() => toggleFav(p.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full shadow-lg ${
                    favs.includes(p.id)
                      ? "bg-accent text-white"
                      : "bg-white/80 text-slate-600"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favs.includes(p.id) ? "fill-current" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="p-5">
                <div className="flex justify-between mb-2">
                  <h2 className="font-bold text-lg">{p.title}</h2>
                  <span className="text-accent font-bold">
                    ${p.price?.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center text-sm text-slate-400 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {p.location || "Unknown"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-20">
            No properties found.
          </div>
        )}
      </main>
    </div>
  );
}