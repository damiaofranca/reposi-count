const path = require("path");
module.exports = {
	webpack: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@api": path.resolve(__dirname, "src/api"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@hooks": path.resolve(__dirname, "src/hooks"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@globals": path.resolve(__dirname, "src/globals"),
			"@screens": path.resolve(__dirname, "src/screens"),
			"@providers": path.resolve(__dirname, "src/providers"),
			"@components": path.resolve(__dirname, "src/components"),
			"@interfacers": path.resolve(__dirname, "src/interfacers"),
		},
	},
};
