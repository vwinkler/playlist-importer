import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { setupServer } from 'msw/node'
import { handlers } from './src/spotify/request_handlers.testutils'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    mswPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://accounts.spotify.com',
        changeOrigin: true,
      }
    }
  }
})

function mswPlugin() {
  const server = setupServer(...handlers)

  return {
    name: 'msw-server',
    configureServer() {
      server.listen({ onUnhandledRequest: 'error' })
    },
    closeBundle() {
      server.close()
    }
  }
}
