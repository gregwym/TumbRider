module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      options: {
        cssDir: 'public/stylesheets',
        imagesDir: 'public/images',
        javascriptsDir: 'public/scripts',
        fontsDir: 'public/fonts'
      },
      foundation: {
        options: {
          sassDir: 'bower_modules/foundation/scss',
          outputStyle: 'compressed'
        }
      },
      app: {
        options: {
          sassDir: 'app/scss',
          outputStyle: 'expanded'
        }
      }
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'app/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: false,
        compress: false,
        beautify: true
      },
      foundation: {
        files: {
          'public/scripts/foundation.min.js': ['bower_modules/foundation/js/foundation/*.js']
        }
      },
      app: {
        files: {
          'public/scripts/tumbrider.min.js': ['app/js/*.js']
        }
      }
    },
    watch: {
      files: ['app/js/*.js'],
      tasks: ['jshint', 'uglify:app']
    },
    clean: ['public/']
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['compass', 'jshint', 'uglify']);
};
