import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import sass from 'node-sass';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import replace from '@rollup/plugin-replace';
import inject from '@rollup/plugin-inject';
import packageJson from './package.json' assert { type: "json" };
import terser from '@rollup/plugin-terser'

export default {
  input: [
    'src/index.js',
    'src/api/index.js',
    'src/utils/index.js',
    'src/components/index.js',
    'src/components/airdrop/index.js',
    'src/components/base/index.js',
    'src/components/wallet/index.js',
  ],
  output: [
    {
      dir: 'lib',
      format: 'esm',
      entryFileNames: '[name].js', // Output file name pattern
      preserveModules: true,
    },
  ],
  
  plugins: [
    peerDepsExternal(),
    alias({
      entries: [
        { find: 'path', replacement: 'path-browserify' },
        { find: 'http', replacement: 'stream-http' },
        { find: 'https', replacement: 'https-browserify' },
        { find: 'stream', replacement: 'stream-browserify' },
        { find: 'url', replacement: 'url' },
        { find: 'zlib', replacement: 'browserify-zlib' },
        { find: 'fs', replacement: 'rollup-plugin-node-globals' }, // Mock fs module
      ],
    }),
    json(),
    commonjs({
      include: 'node_modules/**',
    }),
    resolve({
      preferBuiltins: false,
      browser: true,
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    postcss({
      preprocessor: (content, id) => new Promise((res) => {
        const result = sass.renderSync({ file: id });
        res({ code: result.css.toString() });
      }),
      plugins: [autoprefixer],
      modules: {
        scopeBehaviour: 'global',
      },
      sourceMap: true,
      extract: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'), // or 'development'
      preventAssignment: true,
    }),
    inject({
      process: 'process',
      Buffer: ['buffer', 'Buffer'], // Inject Buffer from buffer package
    }),
    terser()

  ],
  external: [
    'react',
    'react-dom',
    '@emotion/react',
    '@chakra-ui/react',
    'rpc-websockets',
    '@solana/web3.js',
    '@solana/spl-token',
    '@solana/wallet-adapter-phantom',
    '@solana/wallet-adapter-solflare',
    '@solana/wallet-adapter-react',
    '@solana/wallet-adapter-react-ui',
    '@project-serum/anchor',
    'bs58',
    'buffer',
  ],
};
