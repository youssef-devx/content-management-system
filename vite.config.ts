import preactRefresh from '@prefresh/vite'
import type { UserConfig } from 'vite'
import preact from '@preact/preset-vite'

const config = {
  jsx: {
    factory: 'h',
    fragment: 'Fragment'
  },
  resolve: {
    extensions: [
      ".mjs",
      ".js",
      ".ts",
      ".jsx",
      ".tsx",
      ".json",
      ".vue",
      ".scss",
    ],},
  plugins: [preact()]
}

export default config
