// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });
//
// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {    // <-- this object is added
//     port: 8080,
//     watch: {
//       usePolling: true
//     }
//   },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   plugins: [vue()],
// });

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteSentry from 'vite-plugin-sentry'

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });

const viteSentryConfig = {
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: 'capsho',
  project: 'vue-sentry-course',
  release: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
  setCommits: '',
  sourceMaps: {
    include: ['./dist/assets'],
    ignore: ['node_modules'],
    urlPrefix: '~/assets'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {    // <-- this object is added
    port: 8080,
    watch: {
      usePolling: true
    }
  },
  preview: {
    port: 8090,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [vue(), viteSentry(viteSentryConfig)],
  build: {
    sourcemap: 'hidden',
  },
  define: {
    __SENTRY_RELEASE__:`"${process.env.npm_package_name}@${process.env.npm_package_version}"`,
  },
})
