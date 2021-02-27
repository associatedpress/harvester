const runAll = require('npm-run-all')
const portfinder = require('portfinder')
const args = require('yargs')
  .default('frontport', '8080')
  .default('backport', '3000')
  .argv

portfinder.basePort = args.backport
portfinder.getPortPromise().then(proxyPort => {
  const backend = `devbackend --port ${proxyPort}`
  const frontend = `devfrontend --port ${args.frontport} --proxy ${proxyPort}`

  const options = {
    stdin: process.stdin,
    stdout: process.stdout,
    stderr: process.stderr,
    parallel: true,
  }

  runAll([backend, frontend], options)
    .catch(error => {
      console.log('=> Error:')
      console.error(error)
    })
})
