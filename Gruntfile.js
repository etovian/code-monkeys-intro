"use strict";

var fs = require("fs");

module.exports = function(grunt) {

	var directories = [
		"css",
		"images",
		"js",
		"js/controllers",
		"js/directives",
		"js/services",
		"logs",
		"views",
		"views/directives",
		"views/templates"
	];

	grunt.initConfig({
		createWebProjectFolders: {
			options: {
				directories: directories
			}
		}
	});

	grunt.registerTask("default", ["createWebProjectFolders"]);

	grunt.registerTask("createWebProjectFolders", "Creates folder structure for web project", function(debug) {
		
		var isDebug = this.args.length !== 0 && debug !== undefined;
		var options = this.options({
			directories: []
		});

		if(isDebug) {
			grunt.log.writeflags(options, "Options");
		}

		for(var i = 0; i < options.directories.length; i++) {
			var directory = options.directories[i];
			grunt.file.mkdir(directory);
			if(isDebug) {
				grunt.log.writeln("wrote directory ", directory);
			}
		}
	});

};