'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full top-0 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl flex items-center justify-between mx-auto p-3">
        <a href="/" className="flex items-center space-x-3">
          <img src="https://cdn.discordapp.com/icons/1330080534667333653/33dbbaa618196ec5e2f1f34fdda91bdf.png" className="h-7 transform scale-125" alt="Logo" />
          <span className="text-xl text-gray-900 dark:text-white font-semibold">The Dugout</span>
        </a>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            className="p-2 rounded-lg text-gray-700 dark:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-5 ">
          <ul className="flex gap-5">
            <li><a href="/auction" className="py-1 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">Auction</a></li>
            <li><a href="/hand-cricket" className="py-1 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">Hand Cricket</a></li>
            <li><a href="/cricket-guru-go" className="py-1 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">Cricket Guru/Go</a></li>
            <li><a href="/soccer-guru" className="py-1 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">Soccer Guru</a></li>
          </ul>

          <div className="flex items-center gap-2 border-l border-gray-200 dark:border-gray-700 pl-2">
            <button
              onClick={() => setTheme('light')}
              className={`p-2 rounded-lg ${
                mounted && theme === 'light' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
              title="Light mode"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-2 rounded-lg ${
                mounted && theme === 'dark' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
              title="Dark mode"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
            </button>

            <button
              onClick={() => setTheme('system')}
              className={`p-2 rounded-lg ${
                mounted && theme === 'system' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
              title="System mode"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </button>

            <a
              href="/admin"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-2 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              <span className="text-sm font-medium">Admin</span>
            </a>
          </div>
        </div>
      </div>

      <div className={`${mobileOpen ? 'block' : 'hidden'} md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700`}>
        <div className="max-w-6xl mx-auto p-4">
          <ul className="flex flex-col gap-2 font-medium">
            <li><a href="/auction" className="block py-2 text-gray-900 dark:text-white">Auction</a></li>
            <li><a href="/hand-cricket" className="block py-2 text-gray-900 dark:text-white">Hand Cricket</a></li>
            <li><a href="/cricket-guru-go" className="block py-2 text-gray-900 dark:text-white">Cricket Guru/Go</a></li>
            <li><a href="/soccer-guru" className="block py-2 text-gray-900 dark:text-white">Soccer Guru</a></li>
          </ul>

          {mounted && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button onClick={() => setTheme('light')} className={`p-2 rounded-lg text-sm ${theme === 'light' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-800'}`}>Light</button>
              <button onClick={() => setTheme('dark')} className={`p-2 rounded-lg text-sm ${theme === 'dark' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-800'}`}>Dark</button>
              <button onClick={() => setTheme('system')} className={`p-2 rounded-lg text-sm ${theme === 'system' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-800'}`}>System</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}