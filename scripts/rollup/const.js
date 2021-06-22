import pkg from "../../package.json";

export const REG_DIR = /(?<=\/src\/)[\w-_]+(?=\/index\.ts)/g;
export const BANNER_TEXT = [
  '/**',
  ' * @tinyuen/utils',
  ` * version: ${pkg.version}`,
  ' * author: tianxiaohu',
  ' * email: rayden@foxmail.com',
  ' */',
  '',
].join('\n');

export const OUTPUT_PATH_MAP = {
  esm: 'es',
  cjs: 'lib',
};
