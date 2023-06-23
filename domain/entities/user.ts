export class User {
  constructor(public email: string, public name: string) {}
}

export enum Role {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  CLIENT = 'CLIENT',
  SELLER = 'SELLER',
}
