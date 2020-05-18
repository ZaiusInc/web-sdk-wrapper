import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';

export default [
  {
    input: 'src/index.ts',
    external: ['ms'],
    output: [
      {
        dir: 'dist/',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript(),
      babel({
        babelHelpers: 'inline',
        exclude: 'node_modules/**',
        sourcemap: true,
      }),
      resolve(), // so Rollup can find `ms`
      terser({
        sourcemap: true,
      }),
    ],
  },
];
