const cron = require('node-cron');

cron.schedule('0 0 * * *', () => {
  // Your task to be executed at midnight
  console.log('Running the task at midnight!');
  // Add your backend task logic here
});
