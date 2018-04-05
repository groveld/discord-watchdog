module.exports = async (client, event) => {
  if (event.code === 1000) {
    client.logger.info("Disconnected from Discord cleanly");
  } else {
    client.logger.warn("Disconnected from Discord with code:", event.code);
  }
};
