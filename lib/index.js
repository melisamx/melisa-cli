var program = require('commander');
 
program.version(require('../package').version);
    
require('./init')(program);
    
program.parse(process.argv);
    
if( !program.args.length) {
    program.help();
}
