export class User {
  // Rename to Profile ?
  private constructor(
    private readonly _id: string,
    private readonly _email: string,
    private readonly _name: string,
    // username: string,
    // firstName: string,
    // lastName: string,
    private readonly _avatarUrl: string
  ) {}

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get data() {
    return {
      id: this._id,
      email: this._email,
      name: this._name,
      avatarUrl: this._avatarUrl,
    };
  }

  get avatarUrl(): string {
    return this._avatarUrl;
  }

  static fromData(data: User["data"]) {
    return new User(data.id, data.email, data.name, data.avatarUrl);
  }
}
