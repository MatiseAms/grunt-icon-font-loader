/*
 * grunt-icon-font-loader
 * https://github.com/stephan/gruntplugin
 *
 * Copyright (c) 2017 Stephan Hoogland
 * Licensed under the MIT license.
 */

let path = require('path');

'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('icon_font_loader', 'The best Grunt plugin ever.', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		// var options = this.options({
		// 	scss: true,
		// 	less: true
		// });

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			// Concat specified files.

			let fonts = [];

			f.src.forEach(function(dataFile) {
				let data = grunt.file.read(dataFile);

				let dataKeys = Object.keys(JSON.parse(data));

				fonts.push({
					'name': dataKeys[0],
					'weights': JSON.parse(data)[dataKeys[0]].weights
				});

			});

			let styleFile = grunt.template.process(
				grunt.file.read(path.join(__dirname, 'templates/tmpl.scss')), {
					data: {
						fonts: fonts
					}
				}
			);
			grunt.file.write(f.dest + '_all.scss', styleFile);

			let includeFile = grunt.template.process(
				grunt.file.read(path.join(__dirname, 'templates/include.scss')), {
					data: {
						fonts: fonts
					}
				}
			);
			grunt.file.write(f.dest + '_include.scss', includeFile);

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};
