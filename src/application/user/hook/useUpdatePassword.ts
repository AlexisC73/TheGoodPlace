import { useState } from "react";
import { Dependencies } from "../../../config/dependencies";
import { UpdateUserPassword } from "../../../domain/user/usecases/updateUserPassword";

export enum State {
  IDLE = "IDLE",
  LOADING = "LOADING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export const useUpdatePassword = () => {
  const [state, setState] = useState<State>(State.IDLE);
  const { userRepository } = Dependencies();

  const updateUserPasswordUseCase = new UpdateUserPassword(userRepository);

  function updateUserPassword({
    id,
    newPassword,
    oldPassword,
    newPasswordConfirmation,
  }: {
    id: string;
    oldPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
  }) {
    setState(State.LOADING);
    updateUserPasswordUseCase
      .handle({
        id,
        newPassword,
        oldPassword,
        newPasswordConfirmation,
      })
      .then(() => {
        setState(State.SUCCESS);
      })
      .catch(() => {
        setState(State.ERROR);
      });
  }
  return { state, updateUserPassword };
};
