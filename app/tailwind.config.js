module.exports = {
  content: [
    './packages/**/*.{vue,js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ec6726'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
