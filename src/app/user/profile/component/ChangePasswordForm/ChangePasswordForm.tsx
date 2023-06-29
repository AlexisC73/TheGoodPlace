"use client";

import CheckIcon from "@/assets/CheckIcon";
import ChangeInformationForm from "../ChangeInformationForm/ChangeInformationForm";
import FormElement from "@/components/Form/FormElement";
import { FormEventHandler } from "react";
import { useNotifications } from "@/application/@shared/NotificationContext";
import { useUpdatePassword } from "../../../../../../application/user/hook/useUpdatePassword";
import { useSession } from "next-auth/react";

function ChangePasswordForm() {
  const { pushNotification } = useNotifications();
  const { state, updateUserPassword } = useUpdatePassword();
  const { data: session } = useSession();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const oldPassword = formData.get("old-password")?.toString();
    const newPassword = formData.get("new-password")?.toString();
    const newPasswordConfirmation = formData.get("confirmPassword")?.toString();
    if (
      !oldPassword ||
      !newPassword ||
      !newPasswordConfirmation ||
      !session?.user.id
    ) {
      pushNotification({
        title: "Erreur",
        content: "Veuillez remplir tous les champs",
        type: "error",
        duration: 2,
      });
      return;
    }

    updateUserPassword({
      id: session.user.id,
      newPassword,
      newPasswordConfirmation,
      oldPassword,
    });
  };

  if (state === "SUCCESS") {
    pushNotification({
      title: "Mot de passe modifié",
      content: "Votre mot de passe a bien été modifié",
      type: "success",
      duration: 1,
    });
  }

  return (
    <ChangeInformationForm
      sectionTitle="Modification du mot de passe"
      submitLabel="Modifier le mot de passe"
      icon={<CheckIcon />}
      onSubmit={handleSubmit}
      canSubmit={state === "LOADING"}
    >
      <FormElement
        label="Mot de passe (actuel)"
        name="old-password"
        type="password"
      />
      <FormElement
        label="Mot de passe (nouveau)"
        name="new-password"
        type="password"
      />
      <FormElement
        label="Vérification du nouveau mot de passe"
        name="confirmPassword"
        type="password"
      />
    </ChangeInformationForm>
  );
}

export default ChangePasswordForm;
