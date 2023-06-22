import { UserConnection } from '../domain/entities/connection'

export interface User
  extends Partial<{ [T in keyof UserConnection]: string | null }> {}
