module.exports = async (client, event) => {
  if (event.code === 1000) {
    client.logger.info("Disconnected from Discord.");
  } else {
    client.logger.warn(`Disconnected from Discord with status code ${event.code}.`);
  }
};
