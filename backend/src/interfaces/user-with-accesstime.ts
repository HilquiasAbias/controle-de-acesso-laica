import { AccessTime, Rfid, User } from "@prisma/client";

export type UserWithAccessTime = User & { accessTimes: AccessTime[], rfid: Rfid }

export type UserWithAccessTimeWithoutRFID = User & { accessTimes: AccessTime[] }