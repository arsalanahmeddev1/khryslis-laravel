module.exports = {
    darkMode: 'class',
    content: [
      './resources/**/*.blade.php',
      './resources/js/**/*.{js,jsx}',
    ],
    theme: {
      extend: {
        colors: {
          'theme-color': '#5213AA',
          'gradient-start': '#1e3a8a',
          'gradient-end': '#6b21a8',
  
          'gradient-start-hover': '#172554',
          'gradient-end-hover': '#581c87',
        }
      },
    },
    plugins: [],
  } 