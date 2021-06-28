import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import progress from 'rollup-plugin-progress';
// import glob from 'glob';
import { BANNER_TEXT, FILE_EXTENSION, LIBRARY_NAME } from './const';

const path = require('path');
const PACK_ENV = process.env.PACK_ENV;
const cwd = process.cwd();
const entryPath = path.resolve(cwd, 'src/index.ts');


const commonPlugins = [
  progress({
    clearLine: false, // default: true
  }),
  json(),
  commonjs(),
  nodeResolve({ extensions: FILE_EXTENSION }),
  typescript(),
  babel({
    include: 'src',
    exclude: 'node_modules/**',
    extensions: FILE_EXTENSION,
    babelHelpers: 'runtime',
  }),
];

/**
 * Get All Entry file use Glob
 * Deprecated !!
 */
/* const getEntry = () => {
  const entry = glob
    .sync(path.resolve(cwd, 'src/!**!/index.ts'))
    .reduce((result, item) => {
      console.log(item);
      const [dirName] = item.match(REG_DIR) || [];
      if (dirName) {
        result[dirName] = path.resolve(cwd, 'src', dirName, 'index.ts');
      }
      return result;
    }, {});
  entry.index = path.resolve(cwd, 'src/index.ts');
  return entry;
}; */

const umdOutPutCommon = {
  format: 'umd',
  name: LIBRARY_NAME,
  banner: BANNER_TEXT,
};

const esOutPutCommon = {
  exports: 'named',
  preserveModules: true,
  preserveModulesRoot: 'src',
};

export default () => {
  console.log(`====== PACK ENV: ${PACK_ENV} ======`);
  switch (PACK_ENV) {
    case 'umd':
      return {
        input: entryPath,
        output: [
          {
            ...umdOutPutCommon,
            file: path.resolve(cwd, 'dist', 'tinyuen-utils.js'),
          },
          {
            ...umdOutPutCommon,
            file: path.resolve(cwd, 'dist', 'tinyuen-utils.min.js'),
            sourcemap: true,
            plugins: [
              terser(),
            ],
          }
        ],
        plugins: commonPlugins,
      };
    case 'esm':
      return {
        input: entryPath,
        output: {
          ...esOutPutCommon,
          format: 'esm',
          dir: 'es',
        },
        plugins: commonPlugins,
      };
    case 'cjs':
      return {
        input: entryPath,
        output: {
          ...esOutPutCommon,
          format: 'cjs',
          dir: 'lib',
        },
        plugins: commonPlugins,
      };
  }
}

/*export default [
  {
    input: entryPath,
    output: [
      {
        ...umdOutPutCommon,
        file: path.resolve(cwd, 'dist', 'tinyuen-utils.js'),
      },
      {
        ...umdOutPutCommon,
        file: path.resolve(cwd, 'dist', 'tinyuen-utils.min.js'),
        sourcemap: true,
        plugins: [
          terser(),
        ],
      },
      {
        ...esOutPutCommon,
        format: 'esm',
        dir: 'es',
      },
      {
        ...esOutPutCommon,
        format: 'cjs',
        dir: 'lib',
      },
    ],
    plugins: commonPlugins,
  },
];*/
