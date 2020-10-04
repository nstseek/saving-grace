import chalk from 'chalk';

export function log(...args: string[]) {
  console.log(
    chalk.bold(chalk.gray(`[${new Date().toISOString()}]:`)),
    ...args
  );
}
