module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            sharedDir : 'content/shared/public',
            distDir : '<%= meta.sharedDir %>/dist'
        },
        
        bumpup: {
          files: ['package.json', '<%= meta.distDir %>/build.json']
        }
    });
    
    grunt.loadNpmTasks('grunt-bumpup');
    
    grunt.registerTask('build', 'Build web application for distribution.', [        
        'bumpup'
    ]);    

    grunt.registerTask('default', ['build']);
    
};
