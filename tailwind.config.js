/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    animation: {
      spinning: 'semipolar-spinner-animation 2s infinite'
    },
    keyframes: {
      'semipolar-spinner-animation': {
        '50%': { transform: 'rotate(360deg)', scale: 0.7 }
      }
    },
    extend: {
      spacing: {
        'ring-tl': 'calc(65px * 0.1 * var(--ring-spacing))',
        'ring-hw': 'calc(65px - 65px * 0.2 * var(--ring-spacing))'
      }
    }
  },
  plugins: []
}
