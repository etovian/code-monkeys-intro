"use strict";

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		jshint: {
			options: {
				force: false, //force pass on errors
				"-W069": false, //ignore specified errors
				"-W004": false,
				ignores: [""], //ignore files (csv strings with relative file path)
				reporterOutput: "logs/jshint.txt"
			},
			files: ["js/*/*.js"]
		},
		htmlhint: {
			templates: {
				options: {
					"attr-lower-case": true,
					"attr-value-not-empty": true,
					"tag-pair": true,
					"attr-lowercase": true,
					"tagname-lowercase": true,
					"attr-no-duplication": true,
					"tag-self-close": true,
					"spec-char-escape": true,
					"id-unique": true,
					"src-not-empty": true
				},
				src: [
					"index.html",
					"views/*/*.html"
				]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-htmlhint")

	grunt.registerTask("default", ["jshint", "htmlhint"]);
};