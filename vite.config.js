import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    const normalizeBase = (value) => {
        if (!value || value === '/') {
            return '/';
        }

        if (/^https?:\/\//i.test(value)) {
            return value.endsWith('/') ? value : `${value}/`;
        }

        const trimmed = value.replace(/^\/+|\/+$/g, '');
        return `/${trimmed}/`;
    };

    const withBuild = (value) => {
        const normalized = normalizeBase(value);
        return normalized.endsWith('build/') ? normalized : `${normalized}build/`;
    };

    const base = withBuild(env.ASSET_URL || '/');

    return {
        base,
        plugins: [
            laravel({
                input: [
                    'resources/sass/app.scss',
                    'resources/js/app.js',
                ],
                refresh: true,
            }),
            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
                // compilerOptions: {
                //     compatConfig: {
                //         MODE: 2
                //     },
                //     isCustomElement: tag => tag === 'lottie-player'
                // },
            }),
        ],
        resolve: {
            alias: {
                vue: 'vue/dist/vue.esm-bundler.js',
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // Disable deprecation warnings
                    quietDeps: true,
                    sassOptions: {
                        quiet: true,
                    },
                },
            },
        },
    };
});
