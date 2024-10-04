const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const express = require("express");

module.exports = (webpackConfigEnv, argv) => {
	const defaultConfig = singleSpaDefaults({
		orgName: "afp",
		projectName: "solicitud-beneficio-fallecido",
		webpackConfigEnv,
		argv,
		disableHtmlGeneration: true,
	});

	let entryPoint = [];
	entryPoint.push("src/afp-solicitud-beneficio-fallecido.tsx");
	entryPoint.push("src/infrastructure/redux/store.ts");

	return merge(
		{
			devServer: {
				proxy: {
					"/index.html": {
						target: "/portal/index.html",
						bypass: function (req, res, proxyOptions) {
							return "/portal/index.html";
						},
					},
				},
			},
			plugins: [
				new CopyWebpackPlugin({
					patterns: [
						{ from: "*", to: "portal/", force: true, context: "config/" },
						{
							from: "*",
							to: "portal/",
							context: "node_modules/@sonda/portal/dist/",
						},
						{
							from: "*",
							to: "navigation/",
							context: "node_modules/@sonda/navigation/dist/",
						},
					],
				}),
			],
		},
		defaultConfig,
		// {
		//   resolve: {
		//     symlinks: false,
		//   },
		// },
		{
			entry: {
				"afp-solicitud-beneficio-fallecido": path.resolve(process.cwd(), entryPoint[0]),
				"store-solicitud-beneficio-fallecido": path.resolve(process.cwd(), entryPoint[1]),
			},
			output: { filename: "[name].js" },
			module: {
				rules: [
					{
						test: /\.(eot|ttf|woff|woff2)$/,
						use: ["file-loader"],
					},
					{
						test: /\.svg$/,
						use: ["@svgr/webpack", "url-loader"],
					},
					{
						test: /\.(png|jpg|jpeg|gif)$/i,
						type: "asset/resource",
					},
				],
			},
		},
	);
};
