import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  format: 'esm',
  platform: 'node',
  target: 'es2022',
  minify: true,
  external: [
    'crypto',
    'events',
    'child_process',
    'qs',
    'http',
    'https',
    'node:crypto',
    'node:events',
    'node:child_process',
    'node:http',
    'node:https',
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
})
