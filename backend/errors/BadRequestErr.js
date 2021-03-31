class BadRequestErr extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = 400;
  }
}

module.exports = BadRequestErr;
