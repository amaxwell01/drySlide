module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dryslide.js',
                dest: 'build/dryslide.min.js'
            }
        },
        watch: {
            minify: {
                files: 'dryslide.js',
                tasks: ['uglify'],
                options: {
                    interrupt: true,
                },
            }
        }
    });

    // Required Node Modules
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('dev', ['watch:minify']);
};
