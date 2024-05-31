"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
async function moveCompletedToInactive(db) {
    try {
        await db.business.updateCustomerToInactive();
        console.log('Moved all completed customers to inactive.');
    }
    catch (err) {
        console.error('Error moving completed customers to inactive:', err);
    }
}
async function startCronJob(db) {
    // Schedule the cron job to run at 12 AM every day
    node_cron_1.default.schedule('0 0 * * *', () => {
        console.log('Running job to move completed customers to inactive.');
        moveCompletedToInactive(db);
    });
}
module.exports = startCronJob;
