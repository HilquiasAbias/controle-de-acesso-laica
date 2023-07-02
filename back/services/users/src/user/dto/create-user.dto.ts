//import { Roles } from "@prisma/client"

export class CreateUserDto {
  name: string
  registration: string
  email: string
  password: string
  roles: string[] // Roles
  tag?: string
  mac?: string
  envId?: string
}
