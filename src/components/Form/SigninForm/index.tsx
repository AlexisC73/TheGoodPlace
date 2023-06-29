"use client";
import { FormEventHandler } from "react";
import FormElement from "../FormElement";
import { signIn } from "next-auth/react";
import { useNotifications } from "@/application/@shared/NotificationContext";

export default function SigninForm({
  closeSigninModal,
}: {
  closeSigninModal: () => void;
}) {
  const { pushNotification } = useNotifications();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    })
      .then((res) => {
        if (!res?.error) {
          closeSigninModal();
          pushNotification({
            title: "Connexion réussie",
            content: "Vous êtes maintenant connecté",
            duration: 1,
          });
        } else {
          pushNotification({
            title: "Erreur",
            content: res?.error || "Une erreur est survenue",
            type: "error",
            duration: 1,
          });
        }
      })
      .catch((err) => {
        pushNotification({
          title: "Erreur",
          content: "Il y a un problème de liaison avec le server",
          type: "error",
          duration: 1,
        });
        return;
      });
  };
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-[20px]">
        <FormElement label="Addresse email" name="email" type="email" />
        <FormElement label="Mot de passe" name="password" type="password" />
      </div>

      <span className="underline text-[#606060] text-[14px] mt-2">
        Mot de passe oublié ?
      </span>
      <button
        className="bg-primary h-[40px] self-center px-20 rounded mt-6 text-white"
        type="submit"
      >
        Me connecter
      </button>
    </form>
  );
}
