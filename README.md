<h1 align="center">daily-utils</h1>

<div align="center">

![node](https://img.shields.io/badge/node-%3E%3D8.0.0-yellowgreen)
![build-cjs](https://img.shields.io/badge/build-cjs-orange)
![build-es](https://img.shields.io/badge/build-es-green)
![build-umd](https://img.shields.io/badge/build-umd-red)
[![Build Status](https://travis-ci.com/Tinyuen/daily-utils.svg?branch=main)](https://travis-ci.com/Tinyuen/daily-utils)

日常开发用到的 js 工具库，已发布到 NPM => `@tinyuen/utils`

已经接入 `TravisCI` 自动化构建。

</div>

## ⚙ Install

```bash
npm install @tinyuen/utils --save
// or
yarn add @tinyuen/utils
```

## 🚀 Usage
```javascript
import { device } from '@tinyuen/utils';

console.log(device.isWeChat())
```

## 🥤 Document

### device
- device.isWeChat()  判断是否是微信环境
- ...

### axios
- ...

## ⚠️ Warning

工具库不包含任何 polyfill，包括但不限于 `Promise`、`map`、`includes`... 需要使用方手动处理 polyfill。


