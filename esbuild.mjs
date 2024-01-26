import * as esbuild from 'esbuild';
import buildOptions from './esbuild.config.mjs';

if (process.argv.includes('--watch')) {
  let ctx = await esbuild.context({
    ...buildOptions
  })

  await ctx.watch();

  const { host, port } = await ctx.serve({
    servedir: './',
    port: 4200,
  })

  console.log(host, port)
} else {
  esbuild
    .build({
      ...buildOptions,
    })
    .catch(() => process.exit(1))
}
