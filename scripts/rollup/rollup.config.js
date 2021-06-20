import {terser} from "rollup-plugin-terser";
const path = require('path');
const babel = require('rollup-plugin-babel');
const typescript = require('@rollup/plugin-typescript');
const resolve = require('rollup-plugin-node-resolve');
const commonJs = require('rollup-plugin-commonjs');
const cwd = process.cwd();

export default {
  input: path.resolve(cwd, 'src/index.ts'),
  output: [
    // umd
    {
      file: path.resolve(cwd, 'dist', 'tinyuen-utils.js'),
      format: 'umd',
      name: 'tinyuenUtils',
    },
    // umd min.js
    {
      file: path.resolve(cwd, 'dist', 'tinyuen-utils.min.js'),
      format: 'umd',
      name: 'tinyuenUtils',
      sourcemap: true,
      plugins: [
        terser()
      ]
    },
    {
      format: 'esm',
      dir: 'es'
    }
  ],
  plugins: [
    commonJs(),
    resolve(),
    typescript(),
    babel({
      include: 'src',
      exclude: 'node_modules/!**',
    })
  ]
}
