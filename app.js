var flatiron = require('flatiron'),
    path = require('path'),
    app = flatiron.app;

var tmpldir = path.resolve('./templates/');

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.cli, {
  source: path.join(__dirname, 'lib', 'commands'),
  usage: 'Empty Flatiron Application, please fill out commands',
  version: true,
  argv : {}
});

var commands             = require('./lib/commands')
commands.config          = {};
commands.config.tmpldir  = './templates/';
// Mac MNPP
//commands.config.nginxdir = '/Applications/MNPP/conf/nginx';
//commands.config.wwwdir   = '/Users/bngreer/Sites/';
commands.config.nginxdir = '/etc/nginx';
commands.config.wwwdir   = '/var/www';


app.cmd('create', commands.create);

app.cmd('list', commands.list);

app.cmd('delete', function(){
	console.log('delete a vhost inmstance');
});

app.cmd('disable', commands.disable);

app.cmd('enable', commands.enable);

console.log('This is a toll design to manage you nginx vhosts');
console.log('WARNING: Several assumption are made about your configuration:');
console.log('your www files are in: '+commands.config.wwwdir );
console.log('your nginx config files are in: '+commands.config.nginxdir);
console.log('WARNING: The supplied templates are not yet ready for use');
console.log('');
console.log('Use at your own risk. Feel free to modify the source');
console.log('');


app.start();
