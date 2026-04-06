import { useState } from "react";
import axios from "axios";

function App() {
    const [city, setCity] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = async () => {
        if (!city) return;
        setLoading(true);
        try {
            const res = await axios.get(
                "https://yelpdemo-backend.onrender.com/api/restaurants",
                {
                    params: { city },
                },
            );
            setRestaurants(res.data);
        } catch (err) {
            console.error("Error fetching data", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-600 mb-2">
                        Restaurant Finder
                    </h1>
                    <p className="text-gray-500 mb-6">
                        Discover the best eats in your favorite city.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="e.g. New York, Tokyo..."
                            className="grow p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all shadow-sm"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && search()}
                        />
                        <button
                            onClick={search}
                            disabled={loading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg active:scale-95 disabled:opacity-50"
                        >
                            {loading ? "Searching..." : "Search"}
                        </button>
                    </div>
                </div>
            </header>
            <main className="max-w-6xl mx-auto px-4 py-10">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 text-lg">
                            Fetching restaurants...
                        </p>
                    </div>
                ) : restaurants.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {restaurants.map((r, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                            >
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-800 leading-tight">
                                            {r.name}
                                        </h3>
                                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-sm font-bold flex items-center">
                                            ⭐ {r.rating}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4 grow">
                                        {r.address}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                                        <div className="flex flex-col">
                                            <span>
                                                Latitude:{" "}
                                                {r.coordinates.latitude.toFixed(
                                                    4,
                                                )}
                                            </span>
                                            <span>
                                                Longitude:{" "}
                                                {r.coordinates.longitude.toFixed(
                                                    4,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-xl font-medium text-gray-400">
                            No restaurants to show. Try searching for a city!
                        </h3>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
