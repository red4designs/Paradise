// Load configuration from environment or config file
const path = require('path');

// Environment variable overrides
const config = {
  disableHotReload: process.env.DISABLE_HOT_RELOAD === 'true',
};

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      
      // Optimize bundle splitting for better caching
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 20,
          maxAsyncRequests: 20,
          cacheGroups: {
            // React and core libraries
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|react-router)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 20,
            },
            // UI libraries
            ui: {
              test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|cmdk)[\\/]/,
              name: 'ui',
              chunks: 'all',
              priority: 15,
            },
            // Other vendor libraries
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
              minSize: 20000,
              maxSize: 244000,
            },
            // Common code
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
              minSize: 10000,
            },
          },
        },
        runtimeChunk: {
          name: 'runtime',
        },
        // Enable module concatenation for better tree shaking
        concatenateModules: true,
        // Enable better caching with deterministic module ids
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
      };
      
      // Add performance optimizations
      // Disable performance warnings in CI to prevent build failures
      webpackConfig.performance = {
        maxAssetSize: 500000, // Increased limit
        maxEntrypointSize: 500000, // Increased limit
        hints: process.env.CI ? false : 'warning', // Disable hints in CI
      };
      
      // Enable webpack caching for faster builds
      webpackConfig.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack'),
      };
      
      // Optimize output for better caching
      webpackConfig.output = {
        ...webpackConfig.output,
        filename: 'static/js/[name].[contenthash:8].js',
        chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      };
      
      // Disable hot reload completely if environment variable is set
      if (config.disableHotReload) {
        // Remove hot reload related plugins
        webpackConfig.plugins = webpackConfig.plugins.filter(plugin => {
          return !(plugin.constructor.name === 'HotModuleReplacementPlugin');
        });
        
        // Disable watch mode
        webpackConfig.watch = false;
        webpackConfig.watchOptions = {
          ignored: /.*/, // Ignore all files
        };
      } else {
        // Add ignored patterns to reduce watched directories
        webpackConfig.watchOptions = {
          ...webpackConfig.watchOptions,
          ignored: [
            '**/node_modules/**',
            '**/.git/**',
            '**/build/**',
            '**/dist/**',
            '**/coverage/**',
            '**/public/**',
          ],
        };
      }
      
      return webpackConfig;
    },
  },
};