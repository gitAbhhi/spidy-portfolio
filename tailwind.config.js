const c = (v) => `rgb(var(--${v}) / <alpha-value>)`
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        outer: c('outer'), frame: c('frame'), rim: c('rim'), screen: c('screen'), panel: c('panel'),
        neon: c('neon'), hot: c('hot'), gold: c('gold'), ink: c('ink'), mute: c('mute'),
      },
      fontFamily: {
        display: ['Silkscreen', 'monospace'],
        body: ['"Pixelify Sans"', 'monospace'],
      },
      keyframes: {
        blink: { '0%,49%': { opacity: 1 }, '50%,100%': { opacity: 0 } },
        flicker: { '0%,100%': { opacity: 0.2 }, '50%': { opacity: 0.35 } },
      },
      animation: { blink: 'blink 1s steps(1) infinite', flicker: 'flicker 3s ease-in-out infinite' },
    },
  },
  plugins: [],
}
