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

      // Optimize bundle splitting for Core Web Vitals
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 200000, // Reduced for better loading
          maxInitialRequests: 25,
          maxAsyncRequests: 25,
          cacheGroups: {
            // Critical React libraries (highest priority)
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react-core',
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            // React Router (separate for route-based splitting)
            router: {
              test: /[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/,
              name: 'react-router',
              chunks: 'all',
              priority: 25,
            },
            // UI libraries (medium priority)
            ui: {
              test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|cmdk|@heroicons)[\\/]/,
              name: 'ui-libs',
              chunks: 'all',
              priority: 20,
            },
            // Three.js and 3D libraries (heavy, isolate them)
            three: {
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              name: 'three-libs',
              chunks: 'all', // Will be loaded async since Background3D is lazy
              priority: 22,
            },
            // Performance libraries
            performance: {
              test: /[\\/]node_modules[\\/](@floating-ui|framer-motion|intersection-observer)[\\/]/,
              name: 'performance-libs',
              chunks: 'async',
              priority: 18,
            },
            // Other vendor libraries
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
              minSize: 30000,
              maxSize: 180000,
            },
            // Common application code
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