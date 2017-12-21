/*
 * grunt-icon-font-loader
 * https://github.com/stephan/gruntplugin
 *
 * Copyright (c) 2017 Stephan Hoogland
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('icon_font_loader', 'The best Grunt plugin ever.', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			scss: true,
			less: true,
			template: 'templates/tmpl.scss'
		});

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			// Concat specified files.

			let fonts = [];

			f.src.forEach(function(dataFile) {
				let data = grunt.file.read(dataFile);

				let dataKeys = Object.keys(JSON.parse(data));

				fonts.push({
					'name': dataKeys[0],
					'weights': JSON.parse(data).weights
				});

			});

			let styleFile = grunt.template.process(
				grunt.file.read(options.template), {
					data: {
						fonts: fonts
					}
				}
			);

			grunt.file.write(f.dest, styleFile);

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};
