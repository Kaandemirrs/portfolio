/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#111111',
        border: '#1E1E1E',
        'accent-purple': '#8B5CF6',
        'text-primary': '#F5F5F5',
        'text-muted': '#6B7280',
      },
      fontSize: {
        display: ['4rem', { lineHeight: '1', fontWeight: '700' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      fontFamily: {
        gilroy: ['Gilroy', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
