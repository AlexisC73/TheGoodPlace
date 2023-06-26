import { UserConnection } from "../domain/@shared/entities/connection";

export interface User
  extends Partial<{ [T in keyof UserConnection["data"]]: string | null }> {}
