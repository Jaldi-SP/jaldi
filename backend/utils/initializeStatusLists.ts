import { Customer } from '../models/customer'; // Adjust the path to the Customer type

export enum StatusEnum {
    WAITLIST = 'Waitlist',
    SERVING = 'Serving',
    COMPLETED = 'Completed',
    INACTIVE = 'Inactive'
}

export type User = {
    status: StatusEnum;
    customers: Customer[];
};

export type StatusLists = {
    [key in StatusEnum]?: Customer[];
};

export const initializeStatusLists = (users: User[]): StatusLists => {
    const statusLists: StatusLists = {};

    // Initialize statusLists with empty arrays for each status
    Object.values(StatusEnum).forEach((status) => {
        statusLists[status as StatusEnum] = [];
    });

    // Populate statusLists with customers based on their status
    users.forEach(({ status, customers }) => {
        if (statusLists[status]) {
            statusLists[status] = customers;
        }
    });

    return statusLists;
};
