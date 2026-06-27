const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const { run } = require("../src/cli");

test("init requires a relay name and creates the chosen relay folder", () => {
  const root = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "owr-cli-")), "my-relay");
  const output = makeIo();

  run(["init", "My Client Relay", "--root", root], output);

  assert.equal(output.exitCode, undefined);
  assert.match(output.stdout.text, /Created relay workspace: My Client Relay/);
  assert.match(output.stdout.text, /Dashboard:/);
  assert.ok(fs.existsSync(path.join(root, "relay.json")));
  assert.ok(fs.existsSync(path.join(root, "tasks")));
});

test("init rejects an unnamed relay", () => {
  const output = makeIo();

  run(["init"], output);

  assert.equal(output.exitCode, 1);
  assert.match(output.stderr.text, /Usage: agent-relay init <name>/);
});

test("init accepts the relay name after options", () => {
  const root = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "owr-cli-options-")), "my-relay");
  const output = makeIo();

  run(["init", "--root", root, "Options First Relay"], output);

  assert.equal(output.exitCode, undefined);
  assert.match(output.stdout.text, /Created relay workspace: Options First Relay/);
  assert.equal(JSON.parse(fs.readFileSync(path.join(root, "relay.json"), "utf8")).name, "Options First Relay");
});

function makeIo() {
  const io = {
    stdout: makeStream(),
    stderr: makeStream(),
    exitCode: undefined,
  };
  return io;
}

function makeStream() {
  return {
    text: "",
    write(chunk) {
      this.text += chunk;
    },
  };
}
