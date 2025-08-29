const { spawn } = require("child_process");

const commands = [
  "npm run services:up",
  "npm run services:wait:database",
  "npm run migrations:up",
];

const devCommand = "next dev";
const stopCommand = "npm run services:stop";

let devProcess = null;

async function runCommands() {
  try {
    for (const cmd of commands) {
      const child = spawn(cmd, { shell: true, stdio: "inherit" });
      // eslint-disable-next-line no-undef
      await new Promise((resolve, reject) => {
        child.on("exit", (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`Command "${cmd}" with exit code = ${code}`));
          }
        });
      });
    }

    devProcess = spawn(devCommand, { shell: true, stdio: "inherit" });
  } catch (error) {
    console.error("Um erro ocorreu durante a inicialização:", error.message);
    if (devProcess) {
      devProcess.kill();
    }
    process.exit(1);
  }
}

function cleanup() {
  console.log(`\n\n⌛ Stopping services...`);

  // Kill `next dev`
  if (devProcess) {
    devProcess.kill();
  }

  // Para os serviços
  const stopProcess = spawn(stopCommand, { shell: true, stdio: "inherit" });
  stopProcess.on("exit", (code) => {
    process.exit(code);
  });
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

runCommands();
