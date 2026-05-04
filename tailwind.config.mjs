/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        navy: {
          DEFAULT: '#1C2B3A',
          light: '#243548',
          dark: '#131E28',
        },
        gold: {
          DEFAULT: '#C8973C',
          light: '#E0B05A',
          dark: '#A87C2C',
        },
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
