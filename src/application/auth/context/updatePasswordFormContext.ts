// Context for the update password form

"use client";

import { createContext, useState } from "react";

export enum FetchStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  FAILURE,
}

const UpdatePasswordFormContext = createContext({
  state: FetchStatus.INITIAL,
  previousPassword: "",
  previousPasswordError: "",
  newPassword: "",
  newPasswordError: "",
  newPasswordConfirmation: "",
  newPasswordConfirmationError: "",
  submitFailure: null,
});

export const UpdatePasswordFormProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState<FetchStatus>(FetchStatus.INITIAL);
  const [previousPassword, setPreviousPassword] = useState<string>("");
  const [previousPasswordError, setPreviousPasswordError] =
    useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>("");
  const [newPasswordConfirmationError, setNewPasswordConfirmationError] =
    useState<string>("");

  const [submitFailure, setSubmitFailure] = useState<Error | null>(null);

  return (
    <UpdatePasswordFormContext.Provider
      value={{
        state,
        previousPassword,
        previousPasswordError,
        newPassword,
        newPasswordError,
        newPasswordConfirmation,
        newPasswordConfirmationError,
        submitFailure,
      }}
    >
      {children}
    </UpdatePasswordFormContext.Provider>
  );
};

export default UpdatePasswordFormContext;
