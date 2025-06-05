import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        hmr: {
            port: 5173,
            clientPort: 5173,
            host: 'localhost'
        },
        watch: {
            usePolling: true,
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
    build: {
        manifest: true,
        outDir: 'public/build',
        rollupOptions: {
            output: {
                assetFileNames: assetInfo => {
                    // ถ้าเป็น font awesome (webfonts) → ใส่ใน /webfonts/
                    if (assetInfo.name && assetInfo.name.includes('fa-') && assetInfo.name.match(/\.(woff2?|eot|ttf|otf)$/)) {
                        return 'webfonts/[name][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                }
            }
        }
    },
    optimizeDeps: {
        include: ['@nivo/bar', '@nivo/pi', '@nivo/core'],
    },
});
