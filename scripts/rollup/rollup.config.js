import { terser } from "rollup-plugin-terser";
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import progress from 'rollup-plugin-progress';
import { BANNER_TEXT, LIBRARY_NAME, REG_DIR } from "./const";
import glob from "glob";

const path = require('path');
const cwd = process.cwd();
const entryPath = path.resolve(cwd, 'src/index.ts');


const commonPlugins = [
  progress({
    clearLine: false // default: true
  }),
  json(),
  commonjs(),
  nodeResolve(),
  typescript(),
  babel({
    include: 'src',
    exclude: 'node_modules/**',
    extensions: ['.ts', '.js'],
    babelHelpers: 'bundled',
  })
];

const getEntry = () => {
  const entry = glob
    .sync(path.resolve(cwd, 'src/**/index.ts'))
    .reduce((result, item) => {
      console.log(item);
      const [dirName] = item.match(REG_DIR) || [];
      if (dirName) {
        result[dirName] = path.resolve(cwd, 'src', dirName, 'index.ts');
      }
      return result;
    }, {});
  entry['index'] = path.resolve(cwd, 'src/index.ts');
  return entry;
};

export default [
  {
    input: entryPath,
    output: [
      {
        file: path.resolve(cwd, 'dist', 'tinyuen-utils.js'),
        format: 'umd',
        name: LIBRARY_NAME,
        banner: BANNER_TEXT,
      },
      {
        file: path.resolve(cwd, 'dist', 'tinyuen-utils.min.js'),
        format: 'umd',
        name: LIBRARY_NAME,
        sourcemap: true,
        banner: BANNER_TEXT,
        plugins: [
          terser()
        ]
      }
    ],
    plugins: commonPlugins,
  },
  {
    input: getEntry(),
    output: [
      {
        format: 'esm',
        exports: 'auto',
        dir: 'es',
      },
      {
        format: 'cjs',
        exports: 'named',
        dir: 'lib',
      }
    ],
    plugins: commonPlugins,
  }
]
