import { Auth } from "../domain/auth/entities/auth";

export interface AuthUser
  extends Partial<{ [T in keyof Auth["data"]]: string | null }> {}
