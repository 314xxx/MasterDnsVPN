/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        dvpn: {
          blue: '#007AFF',
          red: '#FF3B30',
          green: '#34C759',
          bg: '#F5F7FA',
          bg2: '#E8ECF1',
          card: '#FFFFFF',
          text: '#1C1C1E',
          subtext: '#8E8E93',
          border: '#E5E5EA',
        }
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
