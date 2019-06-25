process.on('unhandledRejection', (err) => {
  error(err);
  process.exit(1);
});
