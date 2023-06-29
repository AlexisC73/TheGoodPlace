import { UserRepository } from "../../@shared/repositories/user";

export class UpdateUserPassword {
  // TODO : move to auth repo
  constructor(private readonly userRepository: UserRepository) {}

  async handle(params: UpdatePasswordParams) {
    // TODO

    if (!params.payload.passwordMatch) {
      throw new Error("no-match");
    }

    try {
      // Repository call
      return;
    } catch (err) {
      throw new Error("unknown-error");
    }
  }
}

export type UpdatePasswordParams = {
  payload: UpdateUserPasswordPayload;
};
