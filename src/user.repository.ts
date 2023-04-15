export class UserRepository {
    private users = [];

    async save(user) {
        this.users.push(user);
        console.log(this.users);
    }
}