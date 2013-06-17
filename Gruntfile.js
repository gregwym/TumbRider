module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    dirs: {
      appDir: 'app',
      publicDir: 'public',
      cssDir: 'public/stylesheets',
      imagesDir: 'public/images',
      javascriptsDir: 'public/scripts',
      fontsDir: 'public/fonts',
      foundationDir: 'bower_modules/foundation'
    },
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      options: {
        cssDir: '<%= dirs.cssDir %>',
        imagesDir: '<%= dirs.imagesDir %>',
        javascriptsDir: '<%= dirs.javascriptsDir %>',
        fontsDir: '<%= dirs.fontsDir %>'
      },
      foundation: {
        options: {
          sassDir: '<%= dirs.foundationDir %>/scss',
          outputStyle: 'compressed'
        }
      },
      app: {
        options: {
          sassDir: '<%= dirs.appDir %>/scss',
          outputStyle: 'expanded'
        }
      }
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', '<%= dirs.appDir %>/**.js'],
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
          '<%= dirs.javascriptsDir %>/foundation.js':
            ['<%= dirs.foundationDir %>/js/foundation/foundation.js',
             '<%= dirs.foundationDir %>/js/foundation/foundation.*.js']
        }
      },
      app: {
        files: {
          '<%= dirs.javascriptsDir %>/tumbrider.js': ['<%= dirs.appDir %>/js/*.js']
        }
      }
    },
    copy: {
      foundation: {
        files: [
          {expand: true, cwd: '<%= dirs.foundationDir %>/js/vendor/', src: '*.js', dest: '<%= dirs.javascriptsDir %>'}
        ]
      }
    },
    watch: {
      appjs: {
        files: ['<%= dirs.appDir %>/js/*.js'],
        tasks: ['uglify:app']
      },
      app: {
        files: ['<%= dirs.appDir %>/scss/*'],
        tasks: ['compass:app']
      }
    },
    clean: ['<%= dirs.publicDir %>']
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['compass', 'jshint', 'uglify', 'copy']);
};
