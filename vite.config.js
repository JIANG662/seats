import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // proxy:{
    //   '/api/Ticket': {
    //     target: 'http://36.yongcun.cc:5000/api/Ticket/',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api\/Ticket/, '')
    //   },
    //   '/api/Film': {
    //     target: 'http://36.yongcun.cc:5000/api/Film/',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api\/Film/, '')
    //   },
    //   '/Showing': {
    //     target: 'http://36.yongcun.cc:5000/api/Showing/',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/Showing/, 'Showing')
    //   },
    // 'api': {
    //   target: 'http://36.yongcun.cc:5000/api/',
    //   changeOrigin: true,
    //   rewrite: (path) => path.replace(/^\/api/,'')
    //   },
    proxy: {
      '/api': {
        target: 'http://36.yongcun.cc:5000/api/',
        //target: 'http://localhost:5000/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/Film': {
        target: 'http://36.yongcun.cc:5000/Film/',
        //target: 'http://localhost:5000/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/Film/, ''),
      },
   
    '/test': {
        target: 'http://36.yongcun.cc:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/test/, '/api/Film/List')
      }
  }
  }
})
