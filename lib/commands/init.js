var grunt = require('grunt'),
    $path = require('path');

// hack to avoid loading a Gruntfile
// You can skip this and just use a Gruntfile instead
grunt.task.init = function() {};

module.exports = {
    init: function(name, path) {
        
        var pathBase = $path.join(__dirname, '/../../'),
            gruntFile = $path.join(pathBase, 'Gruntfile.js');
        
        /* necesary */
        grunt.file.setBase(pathBase);
        require(gruntFile)(grunt);
        
        grunt.config.set('pkg.dest', path);
        grunt.config.set('pkg.dirname', name);
        
        grunt.config.set('gitPull', {
            test: {
                repos: [
                    {
                        path: ['tmp'],
                        repo: 'git@vcs:melisa/<%= pkg.init.repositorie %>.git'
                    }
                ]
            }
        });
        
        grunt.config.set('clean', {
            clear: [
                '<%= pkg.pathTmp %>/*',
                '!.gitignore'
            ],
            test: [
                '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>/.git'
            ]
        });
        
        grunt.config.set('copy', {
            test: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>',
                        dot: true,
                        src: [
                            '**'
                        ],
                        dest: '<%= pkg.dest %>'
                    }
                ]
            }
        });
        
        grunt.config.set('shell', {
            renameDirectory: {
                command: [
                    'mv',
                    '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>/App/Skel',
                    '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>/App/<%= pkg.dirname %>',
                    '&&',
                    'mv',
                    '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>/skel.xml',
                    '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>/<%= pkg.dirname.toLowerCase() %>.xml',
                    '&&',
                    'mv',
                    '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>/skel',
                    '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>/<%= pkg.dirname.toLowerCase() %>',
                    '&&',
                    'mv',
                    '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>/bootstrap/skel.php',
                    '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>/bootstrap/<%= pkg.dirname.toLowerCase() %>.php',
                    '&&',
                    'mv',
                    '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>/public/skel.php',
                    '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>/public/<%= pkg.dirname.toLowerCase() %>.php',
                    '&&',
                    'mv',
                    '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>/public/skel',
                    '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>/public/<%= pkg.dirname.toLowerCase() %>'
                ].join(' ')
            } 
        });
        
        grunt.config.set('replace', {
            uppercase: {
                src: [
                    '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>'
                ],
                overwrite: true,
                replacements: [
                    {
                        from: 'Skel',
                        to: '<%= pkg.dirname %>'
                    }
                ]
            },
            lowercase: {
                src: [
                    '<%= pkg.pathTmp %>/<%= pkg.init.repositorie %>'
                ],
                overwrite: true,
                replacements: [
                    {
                        from: 'skel',
                        to: '<%= pkg.dirname.toLowerCase() %>'
                    }
                ]
            }
        });
        
        grunt.tasks([
            'clean:clear',
            'gitPull:test',
            'clean:test',
            'shell:renameDirectory',
            'replace:uppercase',
            'replace:lowercase',
            'copy:test'
        ], {}, function(err) {
            
            console.log(err || 'Success');
            
            /* necesary by grunt shell dont not exit console */
            process.exit(0);
            
        });

    }
};