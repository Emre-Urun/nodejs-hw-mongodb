export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  // Hata mesajını al, yoksa standart mesaj yaz.
  const message = err.message || 'Something went wrong';

  res.status(status).json({
    status: status,
    message: message,
    data: err.data || err.message,
  });
};
