import {terser} from "rollup-plugin-terser";
const path = require('path');
const babel = require('rollup-plugin-babel');
const typescript = require('@rollup/plugin-typescript');
const resolve = require('rollup-plugin-node-resolve');
const commonJs = require('rollup-plugin-commonjs');
const cwd = process.cwd();
const entryPath = path.resolve(cwd, 'src/index.ts');

// umd 打包输出配置
const umdOutputConfig = [
  {
    file: path.resolve(cwd, 'dist', 'tinyuen-utils.js'),
    format: 'umd',
    name: 'tinyuenUtils',
  },
  {
    file: path.resolve(cwd, 'dist', 'tinyuen-utils.min.js'),
    format: 'umd',
    name: 'tinyuenUtils',
    sourcemap: true,
    plugins: [
      terser()
    ]
  },
];

// esm 打包输出配置
const esOutputConfig =  {
  format: 'esm',
  dir: 'es'
};

// commonjs 打包输出配置
const cjsOutputConfig = {
  format: 'cjs',
  dir: 'lib'
};

export default {
  input: entryPath,
  output: [
    ...umdOutputConfig,
    esOutputConfig,
    cjsOutputConfig,
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
