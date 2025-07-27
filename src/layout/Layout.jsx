import { useContext } from "react";
import { Outlet } from "react-router";
import { ThemeContext } from "../Context/Theme.context";
import { Moon, Sun } from "lucide-react";

export default function Layout() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen ${
        theme ? "bg-white" : "bg-black text-white dark"
      }`}
    >
      <button
        onClick={() => setTheme(!theme)}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800  text-gray-800 dark:text-gray-200 transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
      >
        {theme ? <Sun className="text-yellow-500" /> : <Moon />}
      </button>
      <Outlet />
    </div>
  );
}
