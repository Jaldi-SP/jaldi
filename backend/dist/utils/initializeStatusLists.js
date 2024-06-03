"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeStatusLists = exports.StatusEnum = void 0;
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["WAITLIST"] = "Waitlist";
    StatusEnum["SERVING"] = "Serving";
    StatusEnum["COMPLETED"] = "Completed";
    StatusEnum["INACTIVE"] = "Inactive";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
const initializeStatusLists = (users) => {
    const statusLists = {};
    // Initialize statusLists with empty arrays for each status
    Object.values(StatusEnum).forEach((status) => {
        statusLists[status] = [];
    });
    // Populate statusLists with customers based on their status
    users.forEach(({ status, customers }) => {
        if (statusLists[status]) {
            statusLists[status] = customers;
        }
    });
    return statusLists;
};
exports.initializeStatusLists = initializeStatusLists;
