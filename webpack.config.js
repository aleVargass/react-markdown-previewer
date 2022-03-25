const path = require("path");

module.exports = {
    entry: "./src/App.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "public")
    },

    mode: "development",
    module: {
        rules: [{
            loader: "babel-loader",
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },
        {
            test: /\.svg$/,
            loader: "file-loader"
        }]
    },

    devServer: {
        static: {
            directory: path.join(__dirname, "public")
        }
    }
}