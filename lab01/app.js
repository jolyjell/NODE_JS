const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { addLanguage, removeLanguage, listLanguages, readLanguage } = require('./user');

yargs(hideBin(process.argv))
    .command({
        command: 'add',
        describe: 'Add a new language',
        builder: {
            title: {
                describe: 'Language title',
                demandOption: true,
                type: 'string'
            },
            level: {
                describe: 'Language proficiency level',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            addLanguage(argv.title, argv.level);
        }
    })
    .command({
        command: 'remove',
        describe: 'Remove a language',
        builder: {
            title: {
                describe: 'Language title',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            removeLanguage(argv.title);
        }
    })
    .command({
        command: 'list',
        describe: 'List all languages',
        handler() {
            listLanguages();
        }
    })
    .command({
        command: 'read',
        describe: 'Read a language',
        builder: {
            title: {
                describe: 'Language title',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            readLanguage(argv.title);
        }
    })
    .demandCommand(1, 'You need at least one command before moving on')
    .help()
    .argv;
