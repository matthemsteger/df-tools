#!/usr/bin/env node

import yargs from 'yargs';
import _debug from 'debug';

const debug = _debug('df:cli:commands:index');

const {argv} = yargs.commandDir('commands').demandCommand().help().argv;

debug('argv is %o', argv);
