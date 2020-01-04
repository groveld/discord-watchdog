module.exports = async (client, event) => {
  if (event.code === 1000) {
    client.log.info("Disconnected from Discord.");
  } else {
    client.log.warn(`Disconnected from Discord with status code ${event.code}.`);
  }
};
