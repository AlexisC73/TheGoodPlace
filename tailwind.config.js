/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/application/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/context/**/*.{js,ts,jsx,tsx,mdx}',
    './src/presentation/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      textColor: {
        dark: '#1B2137',
        light: '#9199A5'
      },
      colors: {
        primary: '#085EC4',
        light: '#C6CCD4'
      },
      fontSize: {
        alt: '0.8125rem',
        'default-desktop': '0.9375rem',
        'section-title': '1.5rem'
      },
      gridTemplateColumns: {
        'header:': '1fr 130px',
        cart: '1fr 6fr 3fr 2fr'
      },
      backgroundColor: {
        primary: '#085EC4'
      }
    }
  },
  plugins: []
}
