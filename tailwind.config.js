/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-purple": "#8D78F3",
        "my-green": "#1A998E",
        "bt-default": "#1E232C",
        "bt-disabled": "#777777",
        "txt-placeholder": "#767678",
        border: "#E6E6EA",
      },
    },
  },
  plugins: [],
};
