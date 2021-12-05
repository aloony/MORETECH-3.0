const Cluster = require('cluster');
const OS = require('os');

const cpusCount = OS.cpus().length
const pid = process.pid;

if (Cluster.isMaster) {

  for (let i = 0; i < cpusCount - 1; i++) {
    let worker = Cluster.fork()

    worker.on('exit', () => {
      console.log(`Worker died. Pid: ${worker.process.pid}`)
      worker = Cluster.fork()
    })

  }

  console.log(`CPUs: ${cpusCount}`)
  console.log(`Master started. Pid: ${pid}`)

} else if (Cluster.isWorker) {
  require("./app.js")
}