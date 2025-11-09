const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${colors.bright}${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${colors.yellow}${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${colors.red}${msg}${colors.reset}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.magenta}${msg}${colors.reset}`),
  section: (code, msg) => console.log(`${colors.cyan}[${code}]${colors.reset} ${msg}`),
  progress: (current, total, msg) => console.log(`${colors.green}[${current}/${total}]${colors.reset} ${colors.bright}${msg}${colors.reset}`),
  data: (msg, data) => console.log(`${colors.dim}${msg}${colors.reset}`, data)
};

module.exports = log;
