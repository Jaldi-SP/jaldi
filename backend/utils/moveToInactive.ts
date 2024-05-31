import massive from 'massive'
import cron from 'node-cron'

async function moveCompletedToInactive(db: massive.Database) {
    try {
        await db.business.updateCustomerToInactive()
        console.log('Moved all completed customers to inactive.')
    } catch (err) {
        console.error('Error moving completed customers to inactive:', err)
    }
}

async function startCronJob(db: massive.Database) {
  // Schedule the cron job to run at 12 AM every day
  cron.schedule('0 0 * * *', () => {
      console.log('Running job to move completed customers to inactive.');
      moveCompletedToInactive(db);
  });
}

module.exports = startCronJob;
