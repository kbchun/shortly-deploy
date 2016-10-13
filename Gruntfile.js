module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      lib: {
        src: ['public/lib/jquery.js', 'public/lib/underscore.js', 'public/lib/backbone.js', 'public/lib/handlebars.js'],
        dest: 'public/dist/libraries.js',
      },
      client: {
        src: ['public/client/**/*.js'],
        dest: 'public/dist/client.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/dist/libraries_min.js': ['public/dist/libraries.js'],
          'public/dist/client_min.js': ['public/dist/client.js']
        }
      }
    },

    clean: {
      contents: ['public/dist/*']
    },

    eslint: {
      target: ['lib/*.js', 'app/**/*.js']
    },

    cssmin: {
      target: {
        files: {
          'public/dist/style_min.css': ['public/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      },
      mongo: {
        command: 'mongod --dbpath=./db'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.task.run([ 'nodemon']);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'eslint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'clean',
    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('upload', function(n) { 
    if (grunt.option('prod')) {
      grunt.task.run(['shell:prodServer']);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'test',
    'build',
    'upload'
  ]); 

  // grunt.registerTask('setup', function(n) {
  //   grunt.task.run(['shell:mongo']);
  //   if (grunt.option['prod']) {
  //     grunt.task.run(['server']);
  //   } else {
  //     grunt.task.run(['server-dev']);
  //   }
  // });


};
