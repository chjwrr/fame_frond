import { defineConfig } from "umi";

export default defineConfig({
  plugins: [
    '@umijs/plugins/dist/react-query',
    '@umijs/plugins/dist/antd',
    '@umijs/plugins/dist/styled-components',
    '@umijs/plugins/dist/locale'
  ],
  routes: [
    { path: "/", component: "index" },
    { path: "/personal", component: "personal" },
    { path: "/verifyTwitter", component: "verifyTwitter" }
  ],
  npmClient: 'pnpm',
  title:"FAME",
  jsMinifierOptions: {
    target: ['chrome80', 'es2020']
  },
  styledComponents: {},
  reactQuery: {},
  antd:{},
  clientLoader: {},
  locale: {
    default: 'en',
    baseSeparator: '-',
  },
  chainWebpack(config:any) {
    config.module
      .rule('ttf')
      .test(/.(woff|eot|woff2|ttf|otf)$/)
      .use('file-loader')
      .loader('file-loader');
  },
});
