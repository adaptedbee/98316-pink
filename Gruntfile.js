'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean:{
      build: ["build"]
    },
    copy:{
      build: {
        files: [{
          expand: true,
          cwd: "",
          src: [
            "img/**",
            "js/**",
            "index.html"
          ],
          dest: "build"
        }]
      }
    },
    sass: {
      style: {
        files: {
          "build/css/style.css": ["sass/style.scss"]
        }
      }
    },
    cmq: {
      style: {
        files: {
          "build/css/style.css": ["build/css/style.css"]
        }
      }
    },
    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "build/css/style.css"
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: "gzip"
      },
      style: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },
    imagemin: {
      images: {
        options: {
        optimizationLevel: 3
      },
      files: [{
        expand: true,
        src: ["build/img/**/*.{png,jpg,gif,svg}"]
      }]
      }
    },
    htmlmin:{
      options: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      caseSensitive: true,
      keepClosingSlash: false
      },
      html: {
        files: {
          "build/index.min.html": "build/index.html"
        }
      }
    },
    replace: {
      build: {
        options: {
          patterns: [{
            match: /[\"\']img\/([^\"\']+)[\"\']/g,
            replacement: '"/static/img/$1"'
          },{
            match: /[\"\']css\/([^\"\']+)[\"\']/g,
            replacement: '"/static/css/$1"'
          },{
            match: /[\"\']js\/([^\"\']+)[\"\']/g,
            replacement: '"/static/js/$1"'
          }]
        },
        files: [{
          expand: true,
          src: [
            "build/css/style*.css",
            "build/index*.html"
          ]
        }]
      }
    },
    watch: {
      style: {
        files: ["sass/**/*.scss"],
        tasks: ["sass", "cmq", "postcss"]
      }
    },
    csscomb: {
      style: {
        expand: true,
        src: ["sass/**/*.scss"]
      }
    }
  });
  grunt.registerTask("build", [
    "clean",
    "copy",
    "sass",
    "cmq",
    "postcss",
    "cssmin",
    "imagemin",
    "htmlmin",
    "replace"
  ]);
};
