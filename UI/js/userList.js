export default class UserList {
    constructor(users, activeUsers) {
        this.users = users.slice();
        this.activeUsers = activeUsers.slice();
    }
};