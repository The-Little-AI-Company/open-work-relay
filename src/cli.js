const {
  createRelayWorkspace,
  defaultNamedRelayRoot,
  defaultRelayRoot,
  ensureRelayWorkspace,
  resolveRelayRoot,
  writeActiveRelay,
} = require("./relay-store");
const { createDashboardServer } = require("./dashboard-server");

function run(argv = process.argv.slice(2), io = process) {
  const [command, ...args] = argv;

  if (!command || command === "help" || command === "--help" || command === "-h") {
    io.stdout.write(helpText());
    return null;
  }

  if (command === "dashboard") {
    return runDashboard(args, io);
  }

  if (command === "init") {
    return runInit(args, io);
  }

  io.stderr.write(`Unknown command: ${command}\n\n${helpText()}`);
  io.exitCode = 1;
  return null;
}

function runInit(args, io = process) {
  const name = readPositionals(args)[0];

  if (!name) {
    io.stderr.write(`Usage: agent-relay init <name> [--root <path>]\n`);
    io.exitCode = 1;
    return null;
  }

  const root = readOption(args, "--root") || defaultNamedRelayRoot(name);
  const workspace = createRelayWorkspace({ name, root });
  writeActiveRelay(workspace.root);

  io.stdout.write(`Created relay workspace: ${workspace.name}\n`);
  io.stdout.write(`Relay folder: ${workspace.root}\n`);
  io.stdout.write(`Next: relay dashboard\n`);
  return workspace;
}

function readPositionals(args) {
  const positionals = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg.startsWith("--")) {
      if (!arg.includes("=")) {
        index += 1;
      }
      continue;
    }
    positionals.push(arg);
  }

  return positionals;
}

function runDashboard(args, io = process) {
  const root = resolveRelayRoot({ explicit: readOption(args, "--root") });
  const requestedPort = Number(readOption(args, "--port") || 8787);
  const host = readOption(args, "--host") || "127.0.0.1";

  ensureRelayWorkspace(root);

  const server = createDashboardServer({ root });
  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      io.stderr.write(`Dashboard port ${requestedPort} is already in use. Try --port ${requestedPort + 1}.\n`);
    } else {
      io.stderr.write(`Could not start dashboard: ${error.message}\n`);
    }
    io.exitCode = 1;
  });

  server.listen(requestedPort, host, () => {
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : requestedPort;
    io.stdout.write(`Agent Relay dashboard: http://${host}:${port}/\n`);
    io.stdout.write(`Relay workspace: ${root}\n`);
  });

  return server;
}

function readOption(args, name) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) {
    return equalsArg.slice(name.length + 1);
  }

  const index = args.indexOf(name);
  if (index !== -1) {
    return args[index + 1];
  }

  return "";
}

function helpText() {
  return `Agent Relay

Usage:
  relay init <name> [--root <path>]
  relay dashboard [--root <path>] [--port <port>] [--host <host>]

Examples:
  relay init "Client Ops Relay"
  relay dashboard

--root is optional. When omitted, the relay you are inside is used, then the
last relay you created, then the default workspace below.

Environment:
  AGENT_RELAY_HOME      Default relay workspace path.

Default relay workspace:
  ${defaultRelayRoot()}
`;
}

module.exports = {
  run,
  runDashboard,
  runInit,
};
