var path = require("path");

module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    express: {
      dist: {
        options: {
          hostname: "*",
          bases : [ path.resolve("dist") ],
          livereload : true
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },

      vendor: {
        files: {
          "dist/vendor.min.js" : [ "src/js/vendor/*.js" ]
        }
      },

      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['src/js/*.js']
        }
      }
    },

    watch: {
      dist: {
        files: [ "src/js/*.js" ],
        tasks: [ "uglify:dist" ],
        options: {
          livereload : true
        },
      },
    }

  });

  grunt.registerTask('build', [ 'uglify:vendor', "uglify:dist" ]);
  grunt.registerTask('server', [ 'express', 'watch' ]);
};