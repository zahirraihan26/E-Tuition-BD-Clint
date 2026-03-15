import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../Context/ThemeContext/ThemeProvider';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <FaMoon className="text-gray-700" size={20} />
            ) : (
                <FaSun className="text-yellow-400" size={20} />
            )}
        </button>
    );
};

export default ThemeToggle;
