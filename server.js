const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');


//Server Startup
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App is runnning in ${process.env.NODE_ENV} environment on port ${port}`);
});


process.on('SIGTERM', () => {
  console.log('SIGTERM signal recieved, shutting down gracefully');
  server.close(() => {
    console.log('Processs terminated !!!');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal recieved, shutting down gracefully');
  server.close(() => {
    console.log('Processs terminated !!!');
  });
});
