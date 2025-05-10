import retry from 'async-retry';

export const orquestrator = async () => {
  await waitForServer()

  function waitForServer() {
    return retry(fetchFromServer, {
      retries: 100,
      maxTimeout: 1000
    })

    async function fetchFromServer() {
      const response = await fetch(`http://localhost:8080/api/status`);
      if (response.status !== 200) {
        throw new Error()
      }
    }
  }
}
