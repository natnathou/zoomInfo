import morgan from 'morgan';
import chalk from 'chalk';

const morganChalk = morgan(function (tokens, req, res) {
  let method = '[' + tokens.method(req, res) + ']';
  return [
    chalk.green.bold(method),
    chalk.red.bold(tokens.status(req, res)),
    chalk.white(tokens.url(req, res)),
    chalk.yellow(tokens['response-time'](req, res) + ' ms'),
  ].join(' ');
});

export default morganChalk;
