import sassPlugin from 'esbuild-plugin-sass';

const options = {
    entryPoints: ['src/index.tsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: 'dist',
    plugins: [sassPlugin()],
}
export default options;
