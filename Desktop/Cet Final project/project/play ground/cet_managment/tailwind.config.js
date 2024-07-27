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
        }
      },
      backgroundImage: {
        landing: "url('src/assets/images/background.jpg')"
      },
      fontFamily: {
        Somar: ['Somar', 'sans-serif'],
        Tajawal: ['Tajawal', 'sans-serif']
      }
    }
  },
  plugins: []
}
