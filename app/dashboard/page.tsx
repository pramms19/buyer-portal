"use client";
import { useEffect, useState } from "react";
import { Heart, Home, LogOut, User, MapPin, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [properties, setProperties] = useState<any[]>([]);
  const [favs, setFavs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"all" | "favs">("all");
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [propRes, favRes] = await Promise.all([
          fetch("/api/properties", { credentials: "include" }),
          fetch("/api/favourites", { credentials: "include" }),
        ]);

        if (!propRes.ok) throw new Error("Failed to load properties");

        const propData = await propRes.json();
        setProperties(propData);

        // If user is logged in, favRes will be 200. If guest, it will be 401.
        if (favRes.ok) {
          const favData = await favRes.json();
          setFavs(
            Array.isArray(favData) ? favData.map((f: any) => f.propertyId) : [],
          );
        }

        const userRes = await fetch("/api/me", { credentials: "include" });
        if (userRes.ok) setUser(await userRes.json());
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleFav = async (id: string) => {
    if (!user) {
      alert("Please login to add properties to your favourites!");
      router.push("/login");
      return;
    }

    const isFav = favs.includes(id);
    setFavs((prev) =>
      isFav ? prev.filter((favId) => favId !== id) : [...prev, id],
    );

    try {
      const res = await fetch("/api/favourites", {
        method: isFav ? "DELETE" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: id }),
      });
      if (!res.ok) throw new Error("Failed to update");
    } catch (err) {
      setFavs((prev) =>
        isFav ? [...prev, id] : prev.filter((favId) => favId !== id),
      );
    }
  };

  const displayedProperties =
    activeTab === "all"
      ? properties
      : properties.filter((p) => favs.includes(p.id));

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen font-medium text-slate-500">
        Loading Portal...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <Home className="w-6 h-6" />
          <span>EstatePortal</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
            <User className="w-4 h-4" />
            {user?.name || "Guest Viewer"}
          </div>
          {user ? (
            <Link
              href="/login"
              className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors text-sm font-semibold"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 bg-primary text-white hover:text-primary px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-primary/10 transition-all"
            >
              <span>Login</span>
            </Link>
          )}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {activeTab === "all" ? "Property Listings" : "My Favourites"}
            </h1>
            <p className="text-slate-500">
              {user
                ? `Welcome back, ${user.name}`
                : "Log in to save your favorite homes"}
            </p>
          </div>

          {/* Tab Switcher check */}
          <div className="flex bg-slate-200 p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "all" ? "bg-white shadow-sm text-accent" : "text-slate-600 hover:text-slate-900"}`}
            >
              <LayoutGrid className="w-4 h-4" /> All
            </button>
            <button
              onClick={() => {
                if (!user) {
                  alert("Login required to view favourites.");
                  router.push("/login");
                } else {
                  setActiveTab("favs");
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "favs" ? "bg-white shadow-sm text-accent" : "text-slate-600 hover:text-slate-900"}`}
            >
              <Heart className="w-4 h-4" /> Favourites ({favs.length})
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProperties.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 group"
            >
              <div className="relative h-48 bg-slate-200">
                <img
                  src={`${p.img}.jpg`}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4";
                  }}
                />
                <button
                  onClick={() => toggleFav(p.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-all ${
                    !user
                      ? "bg-white/60 text-slate-400 cursor-not-allowed"
                      : favs.includes(p.id)
                        ? "bg-accent text-white"
                        : "bg-white/80 text-slate-600 hover:bg-white"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${favs.includes(p.id) ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-bold text-lg text-slate-900">
                    {p.title}
                  </h2>
                  <span className="text-secondary-foreground font-bold">
                    ${p.price?.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                  <MapPin className="w-4 h-4" /> {p.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayedProperties.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed text-slate-400">
            {activeTab === "all"
              ? "No properties available."
              : "No favourites yet. Start liking properties to see them here!"}
          </div>
        )}
      </main>
    </div>
  );
}
