const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:8080/",
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
      name: "starter",
      filename: "remoteEntry.js",
      remotes: {
        // head: "head@http://localhost:5001/remoteEntry.js",
        // solid: "crossplatform@http://localhost:5002/remoteEntry.js",
        // body: "body@http://localhost:5003/remoteEntry.js",
      },
      exposes: {
        // "./theme": "./src/theme.jsx",
        // "./database": "./src/Database.js",
        // "./store": "./src/store/store.js",
        // "./hostSlice": "./src/store/slice/hostSlice.js",
        // "./cartSlice": "./src/store/slice/cartSlice.js",
        // "./configSlice": "./src/store/slice/configSlice.js",
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
  ],
};
