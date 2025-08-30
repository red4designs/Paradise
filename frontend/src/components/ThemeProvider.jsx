import React, { createContext, useContext, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

// Create context for theme
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Check for user preference in localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('paradise-theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Update theme in localStorage and document when it changes
  useEffect(() => {
    localStorage.setItem('paradise-theme', theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Theme toggle button component with futuristic styling
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className="relative p-3 rounded-xl overflow-hidden transition-all duration-500 group backdrop-blur-sm"
      style={{
        backgroundColor: 'hsl(var(--card) / 0.8)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'hsl(var(--border))',
        color: 'hsl(var(--foreground))',
        boxShadow: `0 0 20px hsl(var(--primary) / 0.1), inset 0 1px 0 hsl(var(--border))`,
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = 'hsl(var(--card))';
        e.target.style.borderColor = 'hsl(var(--primary))';
        e.target.style.boxShadow = `0 0 30px hsl(var(--primary) / 0.3), inset 0 1px 0 hsl(var(--primary) / 0.5)`;
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'hsl(var(--card) / 0.8)';
        e.target.style.borderColor = 'hsl(var(--border))';
        e.target.style.boxShadow = `0 0 20px hsl(var(--primary) / 0.1), inset 0 1px 0 hsl(var(--border))`;
        e.target.style.transform = 'translateY(0)';
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(45deg, hsl(var(--primary) / 0.1), hsl(var(--primary) / 0.05), transparent)`
        }}
      />
      
      {/* Futuristic border glow effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)`,
          animation: 'pulse 2s ease-in-out infinite'
        }}
      />
      
      {/* Icon with enhanced animations */}
      <div className="relative z-10">
        {theme === 'light' ? (
          <Moon 
            size={20} 
            style={{ color: 'hsl(var(--foreground))' }}
            className="transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110 drop-shadow-lg" 
          />
        ) : (
          <Sun 
            size={20} 
            style={{ color: 'hsl(var(--primary))' }}
            className="transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110 drop-shadow-lg" 
          />
        )}
      </div>
      
      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 transition-opacity duration-150"
           style={{
             background: `radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)`
           }}
      />
    </button>
  );
};