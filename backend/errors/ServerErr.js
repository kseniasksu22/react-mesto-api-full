class ServerErr extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = 500;
  }
}

module.exports = ServerErr;
