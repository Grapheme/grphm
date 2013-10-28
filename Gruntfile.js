var path = require("path");

module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    express: {
      dist: {
        options: {
          port : 9000,
          hostname: "*",
          bases : [ path.resolve("dist") ],
          livereload : true
        }
      }
    },

    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> <%= grunt.template.today('dd-mm-yyyy') %> */\n"
      },

      vendor: {
        files: {
          "dist/scripts/vendor.min.js" : [ "app/scripts/vendor/*.js" ]
        }
      },

      dist: {
        files: {
          "dist/scripts/<%= pkg.name %>.min.js": ["app/scripts/*.js"]
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          "dist/styles/<%= pkg.name %>.min.css": [ "app/styles/*.css" ]
        }
      }
    },

    'sftp-deploy' : {
        build: {
          auth: {
            host: 'grphm.com',
            port: 22,
            authKey: 'key'
          },
          src: 'dist',
          dest: 'grphm'
      }
    },

    ftpush: {
      build: {
        auth: {
          host: 'grphm.com',
          port: 21,
          authKey : "key"
        },
        src: 'dist',
        dest: '~/grphm'
      }
    },

    watch: {
      dist: {
        files: [ "app/scripts/*.js" ],
        tasks: [ "uglify:dist" ],
        options: {
          livereload : true
        },
      },

      css: {
        files: [ "app/styles/*.css" ],
        tasks: [ "cssmin" ],
        options: {
          livereload : true
        },
      },
    }

  });

  grunt.registerTask("build", [ "uglify:vendor", "uglify:dist", "cssmin" ]);
  grunt.registerTask("server", [ "build", "express", "watch" ]);
  grunt.registerTask("deploy", [ "build", "sftp-deploy" ]);
};