exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

exports.sendError = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      status: 'error',
      error: err.message,
    });
};
