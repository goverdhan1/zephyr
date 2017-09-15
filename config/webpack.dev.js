/**
 * @author: @AngularClass
 */

const webpack = require('webpack');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const webpackMergeDll = webpackMerge.strategy({plugins: 'replace'});
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const projectConfig = require('./project-config.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackDevServerOutput = require('webpack-dev-server-output')

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'dev';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5555;
const HMR = true;
const backendUrl = projectConfig.settings.backendUrl;
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR,
  backendUrl: backendUrl,
  baseUrl : '/html5'
});

const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const app_src = projectConfig.settings.appFolder;

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  return webpackMerge(commonConfig({env: ENV}), {

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'inline-source-map',//'cheap-module-source-map',

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {

      /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */
      path: helpers.root('dist'),

      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: http://webpack.github.io/docs/configuration.html#output-filename
       */
      filename: '[name].bundle.js',

      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
       */
      sourceMapFilename: '[file].map',

      /** The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
       */
      chunkFilename: '[id].chunk.js',

      library: 'ac_[name]',
      libraryTarget: 'var',
    },

    module: {

      rules: [
       {
         test: /\.ts$/,
         use: [
           {
             loader: 'tslint-loader',
             options: {
               configFile: 'tslint.json'
             }
           }
         ],
         exclude: [/\.(spec|e2e)\.ts$/]
       },

        /*
         * css loader support for *.css files (styles directory only)
         * Loads external css styles into the DOM, supports HMR
         *
         */
        {
          enforce: 'pre',
          test: /\.scss/,
          loader: 'import-glob-loader'
        },

        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader?outputPath=assets/images/&publicPath=assets/images/&name=[name].[ext]',
        },
        {
          test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
          use: 'file-loader?outputPath=assets/fonts/&publicPath=assets/fonts/&name=[name].[ext]',
          // include: [helpers.root(app_src, 'styles/fonts')]
        }

      ]

    },

    plugins: [

      /**
       * Plugin: DefinePlugins
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * Environment helpers
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'ZEE_URL': JSON.stringify(METADATA.backendUrl),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR,
        }
      }),

      new DllBundlesPlugin({
        bundles: {
          polyfills: [
            'core-js',
            {
              name: 'zone.js',
              path: 'zone.js/dist/zone.js'
            },
            {
              name: 'zone.js',
              path: 'zone.js/dist/long-stack-trace-zone.js'
            },
          ],
          vendor: [
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/core',
            '@angular/common',
            '@angular/forms',
            '@angular/http',
            '@angular/router',
            '@angularclass/hmr',
            'rxjs',
          ]
        },
        dllDir: helpers.root('dll'),
        webpackConfig: webpackMergeDll(commonConfig({env: ENV}), {
          devtool: 'eval', //for dev build performance
          //devtool: 'cheap-module-source-map',
          plugins: []
        })
      }),

      /**
       * Plugin: AddAssetHtmlPlugin
       * Description: Adds the given JS or CSS file to the files
       * Webpack knows about, and put it into the list of assets
       * html-webpack-plugin injects into the generated html.
       *
       * See: https://github.com/SimenB/add-asset-html-webpack-plugin
       */
      new AddAssetHtmlPlugin([
        { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`) },
        { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('vendor')}`) }
      ]),

      /**
       * Plugin: NamedModulesPlugin (experimental)
       * Description: Uses file names as module name.
       *
       * See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
       */
      // new NamedModulesPlugin(),

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({
        debug: true,
        options: {

        }
      }),

      new CopyWebpackPlugin([
        { from: app_src + '/assets/styles/assets/images', to: 'html5/assets/images' },
        { from: helpers.root('node_modules/tinymce/skins/lightgray'), to: 'html5/assets/css/skins/lightgray' }
      ]),

      new webpack.HotModuleReplacementPlugin(),

      new webpack.NamedModulesPlugin(), //This plugin will cause the relative path of the module to be displayed when HMR is enabled.
                                        //Suggested for use in development.

// Can be used for checking output folder
/*      new WebpackDevServerOutput({
        path: '/output',
        isDel: false
      }),*/


    ],

    /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * See: https://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      hot: true,
      proxy: {
        '/flex/services/rest/*': {
          target: backendUrl,
          secure: false
        }
      },
      historyApiFallback: {
        disableDotRule: true
      },
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  });
}
