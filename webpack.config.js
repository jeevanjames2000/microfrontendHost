const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath:
      argv.mode === "development"
        ? "http://localhost:8080/"
        : "https://microfrontend-host.vercel.app",
  },
  devServer: {
    port: 8080,
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        head: "head@https://micro-frontend-head.vercel.app/remoteEntry.js",
        // // solid: "crossplatform@http://localhost:5002/remoteEntry.js",
        body: "body@https://micro-frontend-body.vercel.app/remoteEntry.js",
      },
      exposes: {
        "./theme": "./src/theme.jsx",
        "./database": "./src/Database.js",
        "./store": "./src/store/store.js",
        "./hostSlice": "./src/store/slice/hostSlice.js",
        "./cartSlice": "./src/store/slice/cartSlice.js",
        "./configSlice": "./src/store/slice/configSlice.js",
      },

      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv(),
  ],
});
