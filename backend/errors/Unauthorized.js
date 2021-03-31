class Unauthorized extends Error {
  constructor(message) {
    super();
    this.statusCode = 401;
    this.message = message;
  }
}

module.exports = Unauthorized;
