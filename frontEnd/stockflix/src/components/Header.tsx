import { Menu, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import '../App.css'

import LogoName from '../assets/logoname.png'
import LogoName2 from '../assets/logoname2.png'

interface HeaderProps {
  onMenuClick: () => void;
}
function Header({ onMenuClick }: HeaderProps) {

  const [theme, setTheme] = useState(() => {
    const temaSalvo = localStorage.getItem('@App:theme');
    if (temaSalvo) return temaSalvo;

    const prefereDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefereDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('@App:theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <header className="w-full top-0 sticky z-99 flex items-center p-4 md:p-8 h-16 md:h-18 border-b bg-white dark:bg-background border-(var(--borderColor)) dark:border-(var(--borderColor))">
        <section className="flex w-full flex-row justify-between">
          <div className="flex gap-4 md:gap-6 items-center">
            <button onClick={onMenuClick} className="relative flex items-center justify-center cursor-pointer before:content-[''] before:absolute before:m-auto before:flex before:items-center before:justify-center before:w-0 before:h-0 before:rounded-full before:z-[-1] before:bg-zinc-200 hover:before:w-8 hover:before:h-8 transition-all duration-200 dark:before:bg-zinc-800 dark:hover:before:bg-zinc-700/50">
              <Menu size={20} />
            </button>
            {/* <img src={Logo} className="font-bold text-lg md:text-xl"> stockflix </img> */}
            <img src={(theme === 'light') ? (LogoName):(LogoName2)} className='w-24 md:w-36 ' alt="" />
          </div>
          <div className="flex items-center">
            <button onClick={toggleTheme} aria-label="Alternar tema" className="relative flex items-center justify-center cursor-pointer p-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200">
              {theme === 'light' ? (
                <Moon size={20} className="text-slate-900" />
              ) : (
                <Sun size={20} className="text-white-900" />
              )}
            </button>
          </div>

        </section>
      </header>
    </>
  )
}

export default Header