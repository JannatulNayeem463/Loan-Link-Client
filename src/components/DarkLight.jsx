import React, { useEffect, useState } from 'react'
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';


const DarkLight = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    useEffect(() => {
      document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
      localStorage.setItem("theme", theme);
    }, [theme]);
  
    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

  return (
    <div>
       <div className="flex p-4">
          <button
            onClick={toggleTheme}
            className="px-3 py-3 rounded-full bg-gray-800 text-white dark:bg-gray-300 dark:text-black transition-colors"
          >
            {theme === "light" ?  <MdOutlineLightMode /> : <MdDarkMode /> }
          </button>
        </div>
    </div>
  )
}

export default DarkLight
