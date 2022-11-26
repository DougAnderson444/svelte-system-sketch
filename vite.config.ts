import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import path from 'path';

const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@douganderson444/svelte-system-sketch': path.resolve('src/lib')
		}
	},
	server: {
		fs: {
			strict: false
		}
	},
	build: {
		rollupOptions: {
			plugins: [],
			output: {
				minifyInternalExports: false,
				compact: false
			}
		},
		minify: false,
		sourcemap: true,
		optimization: {
			minimize: false
		}
	},
	optimization: {
		minimize: false
	}
};

export default config;
