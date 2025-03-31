/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        'my-purple': '#8D78F3',
        'my-green': '#1A998E',
        'bt-default': '#1E232C',
        'dfbt-hover': '#3D4759',
        'dfbt-disabled': '#777777',
        'bt-cancel': '#ED2525',
        'ccbt-hover': '#C11E1E',
        'ccbt-disabled': '#EF7B7B',
        'txt-placeholder': '#767678',
        black85: 'rgba(0, 0, 0, 0.85)',
        background: '#E8ECF4',
        border: '#E6E6EA',
      },
    },
  },
  plugins: [],
};
