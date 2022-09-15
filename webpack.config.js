// (C) 2007-2019 GoodData Corporation
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");
const StatsPlugin = require("stats-webpack-plugin");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const backendShortcuts = {
    sec: "https://secure.gooddata.com",
    secure: "https://secure.gooddata.com",
    stg: "https://staging.intgdc.com",
    stg2: "https://staging2.intgdc.com",
    stg3: "https://staging3.intgdc.com",
    demo: "https://client-demo-be.na.intgdc.com",
    developer: "https://developer.na.gooddata.com",
    fddev: "https://frauddashboard-dev.na.gooddata.com"
};

const defaultBackend = backendShortcuts.fddev;

function SimplestProgressPlugin() {
    let lastPercent = -10;
    return new webpack.ProgressPlugin((percent) => {
        const percentInt = Math.ceil(percent * 100);
        if (percentInt >= lastPercent + 5) {
            lastPercent = percentInt;
            process.stderr.write(`${percentInt}% `);
        }
    });
}

module.exports = async (env, argv) => {
    const basePath = (env && env.basePath) || "";
    const backendParam = env ? env.backend : "";
    const backendUrl = backendShortcuts[backendParam] || backendParam || defaultBackend;
    process.stderr.write(`Backend URI: ${backendUrl}\n`);

    const isProduction = argv.mode === "production";

    // see also production proxy at /examples/server/src/endpoints/proxy.js
    const proxy = {
        "/gdc": {
            changeOrigin: true,
            cookieDomainRewrite: "localhost",
            secure: false,
            target: backendUrl,
            headers: {
                host: backendUrl,
                origin: null,
            },
            onProxyReq(proxyReq) {
                proxyReq.setHeader("accept-encoding", "identity");
            },
        },
    };

    const plugins = [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "MasterCard",
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules|dist/,
            failOnError: false,
        }),
        new webpack.DefinePlugin({
            ACTUAL_BACKEND_URL: JSON.stringify(backendUrl),
            BACKEND_URL: isProduction ? JSON.stringify(backendUrl) : null,
            BASEPATH: JSON.stringify(basePath),
        }),
        new SimplestProgressPlugin(),
    ];

    if (isProduction) {
        plugins.push(new CompressionPlugin(), new StatsPlugin("stats.json"));
    }

    return {
        entry: ["./src/index.tsx"],
        plugins,
        output: {
            filename: "[name].[hash].js",
            path: path.join(__dirname, "dist"),
            publicPath: `${basePath}/`,
        },
        devtool: isProduction ? false : "cheap-module-eval-source-map",
        node: {
            __filename: true,
        },
        resolve: {
            extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    loaders: ["style-loader", "css-loader"],
                },
                {
                    test: /.scss$/,
                    loaders: ["style-loader", "css-loader", "sass-loader"],
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules|update-dependencies/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: "babel-loader",
                        },
                        {
                            loader: "ts-loader",
                        },
                    ],
                    include: [path.join(__dirname, "src")],
                },
                {
                    test: /\.(jpe?g|gif|png|svg|ico|eot|woff2?|ttf|wav|mp3)$/,
                    use: "file-loader",
                },
            ],
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            historyApiFallback: true,
            compress: true,
            port: 8999,
            stats: {
                all: false,
                errors: true,
                warnings: true,
            },
            proxy,
        },
        stats: "errors-warnings",
    };
};
