import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // proxy any requests starting with /tasks to your backend
      "/tasks": {
        target: "http://localhost:5000",
      },
    },
  },
});
