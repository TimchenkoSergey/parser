import path   from 'path';
import config from 'nconf';

config.argv()
    .env()
    .file({ file : path.join(__dirname, 'config.json') });

export default config;