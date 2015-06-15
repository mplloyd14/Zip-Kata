module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            sharedDir : 'content/shared/public',
            sharedJS: '<%= meta.sharedDir %>/js',
            sharedCSS : '<%= meta.sharedDir %>/css',
            sharedDistDir : '<%= meta.sharedDir %>/dist',

            webDir : 'content/web/public',
            webAppCSS : '<%= meta.webDir %>/css',
            webAppJS : '<%= meta.webDir %>/js',
            webTempDir: '<%= meta.webDir %>/tmp',
            webDistDir : '<%= meta.webDir %>/dist'
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            web: [
                "Gruntfile.js",
                "<%= meta.sharedJS %>/**/*.js",
                "<%= meta.webAppJS %>/**/*.js"
            ]
        },

        concat: {
            options : { stripBanner : true },
            webVendor: {
                src: [
                    '<%= meta.sharedDir %>/bootstrap/css/bootstrap.min.css',
                    '<%= meta.sharedDir %>/bootstrap/css/bootstrap-responsive.min.css',
                    '<%= meta.sharedDir %>/font-awesome/css/font-awesome.min.css',
                    '<%= meta.sharedDir %>/font-not-awesome/css/font-not-awesome.css',
                    '<%= meta.sharedDir %>/kalendae/kalendae.css'
                ],
                dest: '<%= meta.webDistDir %>/css/vendor.min.css'
            },
            webJS: {
                src: [
                    '<%= meta.sharedJS %>/**/*.js',
                    '!<%= meta.sharedJS %>/lib/*.js',
                    '<%= meta.webAppJS %>/**/*.js'
                ],
                dest: '<%= meta.webTempDir %>/<USE THE SAME NAME AS THE MAIN ENTRY POINT FILE>.js'
            }
        },
	    cssmin: {
	      webCSS: {
	        src: '<%= meta.webDistDir %>/css/style.css',
	        dest: '<%= meta.webDistDir %>/css/style.min.css'
	      },
	    },
        
        uglify: {
            webJS: {
                files: {
                    '<%= meta.webDistDir %>/<USE THE SAME NAME AS THE MAIN ENTRY POINT FILE>.min.js': ['<%= meta.webTempDir %>/<USE THE SAME NAME AS THE MAIN ENTRY POINT FILE>.js']
                }
            }
        },
        clean: {
            web: ['<%= meta.webTempDir %>','<%= meta.webDistDir %>']
        },
        copy: {
            web: {
                files: [
                    {   // copy fonts to temp
                        src: ['<%= meta.sharedDir %>/font-awesome/fonts/*'],
                        dest: '<%= meta.webTempDir %>/fonts/',
                        expand : true, flatten: true, filter: 'isFile'
                    },

                    {   // copy fonts to dist
                        src: ['<%= meta.sharedDir %>/font-awesome/fonts/*'],
                        dest: '<%= meta.webDistDir %>/fonts/',
                        expand : true, flatten: true, filter: 'isFile'
                    }
                ]
            }
        },
        watch: {
            less: {
                files: ['content/**/public/**/*.less'],
                tasks: ['less:production']
            },
            test: {
                files: ['test/unit/**/*.js', 'content/**/public/*.js'],
                tasks: ['karma:dev:run'],
                options: {
                    spawn: false
                }
            },
            build: {
                files: ['content/web/**/*.js', 'content/web/**/*.less'],
                tasks: ['build-production'],
                options: {
                    spawn: true,
                    livereload: true
                }
            }
        },
        karma: {
            dev: {
                configFile: 'test/config/karma-dev.conf.js',
                background: true
            }
        },
        less: {
            development: {
              options: {
                paths: "<%= meta.webDir %>/less"
              },
              files: {
                "<%= meta.webAppCSS %>/ie9.css": "./content/web/public/less/ie9.less",
                "<%= meta.webAppCSS %>/style.css": "./content/web/public/less/style.less"
              }
            },
            production: {
              options: {
                paths: "<%= meta.webDir %>/less",
                cleancss: true,
                compress: true
              },
                files: {
                    "<%= meta.webDistDir %>/css/ie9.css": "./content/web/public/less/ie9.less",
                    "<%= meta.webDistDir %>/css/style.css": "./content/web/public/less/style.less"
                }
            }
        },
        bumpup: {
            files: ['package.json', '<%= meta.sharedDistDir %>/build.json']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bumpup');

    grunt.registerTask("validate-web", 'Validate web application JS code using JSHint.', ["jshint:web"]);
    grunt.registerTask("validate",'Validate web application JS code using JSHint.',["jshint"]);

    grunt.registerTask('build-production', 'Build web application for distribution.', [
        'clean:web',
        'concat:webJS',
        'uglify:webJS',
        'concat:webVendor',
        'less:production',
	    'cssmin:webCSS',
        'copy:web'
    ]);

    grunt.registerTask('build-development', 'Build web application for distribution.', [
        'clean:web',
        'concat:webJS',
        'uglify:webJS',
        'concat:webVendor',
        'less:development',
        'copy:web'
    ]);
    
    grunt.registerTask('build-less', 'Build web css.', ['less:development']);
    grunt.registerTask('build-dev', 'Build web applications.', ['build-development']);
    grunt.registerTask('build', 'Build web applications.', ['build-production']);

    grunt.registerTask('serve', 'Do it all', ['karma', 'watch']);
};
