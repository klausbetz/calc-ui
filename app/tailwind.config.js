module.exports = {
  content: [
    './packages/**/*.{vue,js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ec6726'
      },
      animation: {
        'pulse-hard-pause': 'pulse-hard-pause 2s ease-in-out infinite'
      },
      keyframes: {
        'pulse-hard-pause': {
          '0%, 66%': { opacity: '1' },
          '33%': { opacity: '0.3' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
