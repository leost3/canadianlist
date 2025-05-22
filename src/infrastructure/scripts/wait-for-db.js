// eslint-disable-next-line @typescript-eslint/no-require-imports
const { exec } = require("node:child_process");
function checkPostgres() {
  exec("docker exec database-dev pg_isready -h localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (!stdout.includes("accepting connections")) {
       
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("\n🟢 Postgres está pronto e aceitando conexões!\n");
  }
}
console.log("🟡 waiting for DB");
checkPostgres();
