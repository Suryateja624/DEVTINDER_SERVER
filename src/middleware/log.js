const logger = (req, res, next) => {
  console.log(`API called: ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = logger;
