module.exports = {
  important: true,
  mode: 'jit',
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {
      colors: {
        blackPrimary: '#000000E0',
        bluePrimary: '#1677FF'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
