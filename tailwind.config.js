/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        'curious-blue': {
          50: '#f3f7fc',
          100: '#e5eff9',
          200: '#c6ddf1',
          300: '#94c1e5',
          400: '#4494d0',
          500: '#3585c2',
          600: '#256aa4',
          700: '#1f5585',
          800: '#1e486e',
          900: '#1e3d5c',
          950: '#14283d'
        },
        crimson: {
          50: '#fff0f1',
          100: '#ffdddf',
          200: '#ffc0c3',
          300: '#ff9499',
          400: '#ff5760',
          500: '#ff232e',
          600: '#ff000d',
          700: '#d7000b',
          800: '#b1030c',
          900: '#920a11',
          950: '#500004'
        }
      },
      backgroundImage: {
        landing: "url('src/assets/images/background.jpg')"
      },
      fontFamily: {
        Somar: ['Somar', 'sans-serif'],
        Tajawal: ['Tajawal', 'sans-serif']
      },
      keyframes: {
        'collapsible-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' }
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 }
        },
        'open-up': {
          from: {
            opacity: 0.4,
            height: 0
          },
          to: { opacity: 1, scale: 1 }
        }
      },
      animation: {
        'collapsible-down': 'collapsible-down 0.2s ease-in-out',
        'collapsible-up': 'collapsible-up 0.2s ease-in-out',
        'open-up': 'open-up 0.2s ease-in-out'
      }
    }
  },
  plugins: []
}
