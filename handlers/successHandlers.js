exports.sendData = (req, res) => {
  res
    .status(req.status || 200)
    .json({
      status: 'success',
      data: req.data || {},
    });
};
