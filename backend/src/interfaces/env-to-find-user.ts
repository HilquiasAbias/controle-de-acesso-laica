import { UserWithAccessTime } from "./user-with-accesstime"

export interface IEnvToFindUser {
  admins: UserWithAccessTime[]
  frequenters: UserWithAccessTime[]
}