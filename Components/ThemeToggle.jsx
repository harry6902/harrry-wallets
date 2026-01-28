import { useTheme } from "./ThemeContext";
import { useEffect } from "react";
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
   console.log(theme)
  }, [theme])
  
  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg 
                 bg-gray-200 dark:bg-gray-700
                 text-black dark:text-white
                 transition-all"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      
    </button>
  );
}

export default ThemeToggle;
