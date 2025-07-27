import { useState, useMemo, useContext } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Link } from "react-router";
import SkeletonLoaderHome from "./SkeletonLoaderHome";
import { useQuery } from "@tanstack/react-query";
import Error from "../Error/Error";
import { ThemeContext } from "../Context/Theme.context";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const { theme } = useContext(ThemeContext);
  const {
    data = [],
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("https://fakestoreapi.com/products");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const filteredProducts = useMemo(() => {
    let updated = [...data];

    if (searchQuery) {
      updated = updated.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortOption) {
      case "price-asc":
        updated.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        updated.sort((a, b) => b.price - a.price);
        break;
      case "title-asc":
        updated.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        updated.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return updated;
  }, [data, searchQuery, sortOption]);

  if (isLoading) return <SkeletonLoaderHome />;
  if (isError)
    return (
      <Error
        error={error?.message || "OoPs Something went wrong"}
        className="max-h-[90vh] max-w-screen  "
      />
    );
  if (!data || data.length === 0)
    return (
      <Error
        error={error?.message || "could'nt fetch the Products"}
        className="max-h-[90vh] max-w-screen  "
      />
    );

  return (
    <div
      className={`bg-gray-50 min-h-screen p-6 dark:bg-gray-900 dark:text-white   `}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center dark:text-white">
          🛍 Explore Our Products
        </h2>

        {/* Filters */}
        <div
          className={`bg-white p-4 rounded-xl shadow mb-12 grid grid-cols-1 md:grid-cols-4 gap-4 items-center dark:bg-gray-900 dark:text-white transition-colors duration-300 
           `}
        >
          <h3 className="font-semibold text-gray-700 col-span-1 dark:text-white">
            🔍 Filters
          </h3>
          <div className="relative col-span-2 md:col-span-2">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 dark:bg-gray-900 dark:text-white transition-colors duration-300 ${
                theme ? "" : "dark"
              }`}
            />
            <input
              type="text"
              placeholder="Search products..."
              className={`w-full pl-10 pr-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none bg-white text-sm dark:bg-gray-900 dark:text-white transition-colors duration-300 `}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className={`border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white transition-colors duration-300 `}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="title-asc">Title: A → Z</option>
            <option value="title-desc">Title: Z → A</option>
          </select>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 dark:bg-gray-900 dark:text-white transition-colors duration-300 `}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <div
                  className={`bg-white border border-gray-100 rounded-3xl shadow-md overflow-hidden group relative transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-gray-900 dark:text-white `}
                >
                  <div className="h-64 bg-white  flex items-center justify-center overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 dark:text-white">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-white">
                      {product.category}
                    </p>

                    <div className="flex items-center gap-1 text-yellow-400 text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>
                          {i < Math.round(product.rating.rate) ? "★" : "☆"}
                        </span>
                      ))}
                      <span className="text-gray-400 ml-2">
                        ({product.rating.count})
                      </span>
                    </div>

                    <div className="flex flex-col mt-2">
                      <span className="text-green-600 font-bold text-sm">
                        {product.price.toFixed(2)} EGP
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 font-medium col-span-full">
              <Error
                error="No products found matching your criteria."
                className="max-h-[50vh] max-w-screen  "
              />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
