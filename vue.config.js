/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-08-02 15:29:00
 * @LastEditors: went
 * @LastEditTime: 2022-02-22 15:39:59
 */
// 引入压缩插件
const TerserPlugin = require('terser-webpack-plugin');
const path = require("path");
let timeStamp = new Date().getTime();
function resolve(dir) {
  return path.join(__dirname, ".", dir);
}
module.exports = {
  publicPath: "./",
  filenameHashing: false,
  devServer: {
    // open: true, //是否自动弹出浏览器页面
    host: "0.0.0.0",
    port: "8090",
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://10.10.0.21:7007", //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          "^/api": "" //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        }
      }
    }
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  //配置全局主题色
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#3399ff"
        },
        javascriptEnabled: true
      }
    },
    extract: { // 打包后css文件名称添加时间戳 
      filename: `css/[name].${timeStamp}.css`,
      chunkFilename: `css/chunk.[id].${timeStamp}.css`
    }
  },
  chainWebpack: (config) => {
    //配置svg全局组件
    config.module.rules.delete("svg"); // 重点:删除默认配置中处理svg,
    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(resolve("src/icon")) // 处理svg目录
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@http", resolve("src/http"))
      .set("@utils", resolve("src/utils"));
    //配置打包分析工具
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end()
      config.plugins.delete('prefetch')
    }
    //配置全局使用less变量
    const oneOfsMap = config.module.rule("less").oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use("style-resources-loader")
        .loader("style-resources-loader")
        .options({
          patterns: "./src/assets/css/variable.less"
        })
        .end();  
    });
  },
  configureWebpack: {
    output: { // 输出重构 打包编译后的js文件名称,添加时间戳.
      filename: `js/js[name].${timeStamp}.js`,
      chunkFilename: `js/chunk.[id].${timeStamp}.js`
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          // test: /\.png(\?.*)?$/i,
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vue: {
            name: 'vue',
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            priority: -10
          },
          vuex: {
            name: 'vuex',
            test: /[\\/]node_modules[\\/]vuex[\\/]/,
            priority: -10
          },
          'vue-router': {
            name: 'vue-router',
            test: /[\\/]node_modules[\\/]vue-router[\\/]/,
            priority: -10
          },
          'antd-vue': {
            name: 'antd-vue',
            test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
            priority: -10
          },
          'vendors': {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -20
          }
        }
      }
    }
  }
};
