module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: {
            pathTmp: 'tmp',
            init: {
                repositorie: 'melisa-app-skel'
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-gitpull');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-text-replace');
    
};
