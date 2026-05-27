import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type Accent = 'blue' | 'orange' | 'green' | 'yellow';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'system'
  );
  
  const [accent, setAccent] = useState<Accent>(
    () => (localStorage.getItem('accent') as Accent) || 'blue'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applySystemTheme = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    if (theme === 'system') {
      applySystemTheme();
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applySystemTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('accent-blue', 'accent-orange', 'accent-green', 'accent-yellow');
    
    root.classList.add(`accent-${accent}`);
    
    localStorage.setItem('accent', accent);
  }, [accent]);

  return { theme, setTheme, accent, setAccent };
}