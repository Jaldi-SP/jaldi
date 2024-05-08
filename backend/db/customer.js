const StatusEnum = {
  WAITLIST: 'Waitlist',
  SERVING: 'Serving',
  COMPLETED: 'Completed',
  INACTIVE: 'Inactive'  // New status for no visit today
};

class Customer {
  constructor(name, phone, status) {
    this.name = name;
    this.phone = phone;
    this.status = StatusEnum[status] || StatusEnum.INACTIVE;
  }
}

module.exports = {Customer, StatusEnum};