import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';

const env = process.env['NODE_ENV'] || 'dev';
const CONFIG_FILE = `${env}.config.yaml`;

export default () =>
  yaml.load(readFileSync(join(process.cwd(), CONFIG_FILE), 'utf8')) as Record<
    string,
    any
  >;
