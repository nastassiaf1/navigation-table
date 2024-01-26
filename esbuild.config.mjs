import sassPlugin from 'esbuild-plugin-sass';
import cssModulesPlugin from 'esbuild-css-modules-plugin';

const options = {
    entryPoints: ['src/index.tsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: 'dist',
    plugins: [sassPlugin(), cssModulesPlugin()],
}

export default options;
