var chalk = require('chalk');

module.exports = function(program) {
    
    program
        .command('init [name] [path]')
        .description('Generate a new project')
        .action(function(name, path) {

            if( !path || path === '.') {
                path = process.cwd();
            }

            if( !name) {
                name = 'Test';
            }
            
            require('./commands/init').init(name, path);

        })
        .on('--help', function() {
                console.log('  Examples:');
                console.log();
                console.log(chalk.gray('    # create a new project with an official template'));
                console.log('    $ melisa init ProyectName Path');
                console.log();
        });
    
};
