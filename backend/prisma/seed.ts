import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function seedUsersAndEnvs() {
  const admin1 = await prisma.user.create({
    data: {
      name: 'Ivanilson',
      registration: '2568824',
      password: await bcrypt.hash('password', roundsOfHashing),
      role: 'ADMIN',
      mac: '9C:F2:48:87:C2:5A',
      // rfid: { create: { tag: 'F6G7H8I9J0' } },
    },
  });

  const admin2 = await prisma.user.create({
    data: {
      name: 'Bob',
      registration: '2843906',
      password: await bcrypt.hash('password', roundsOfHashing),
      role: 'ADMIN',
      mac: '32:6E:2E:57:D1:3C',
      // rfid: { create: { tag: 'A1B2C3D4E5' } }
    },
  });

  const admin3 = await prisma.user.create({
    data: {
      name: 'Joao Moreno',
      registration: '2576883',
      password: await bcrypt.hash('password', roundsOfHashing),
      role: 'ADMIN',
      mac: '0E:DC:21:40:EF:B4',
      // rfid: { create: { tag: 'XYZW789012' } }
    },
  });

  // Cria 3 ambientes
  // const env1 = await prisma.environment.create({
  //   data: {
  //     name: 'Environment 1',
  //     description: 'Description for Environment 1',
  //     admins: {
  //       connect: [{ id: admin1.id }, { id: admin2.id }],
  //     },
  //   },
  // });

  // const env2 = await prisma.environment.create({
  //   data: {
  //     name: 'Environment 2',
  //     description: 'Description for Environment 2',
  //     admins: {
  //       connect: [{ id: admin3.id }],
  //     },
  //   },
  // });

  // Cria 3 frequentadores
  const freq1 = await prisma.user.create({
    data: {
      name: 'Hilquias',
      registration: '20201014040081',
      password: await bcrypt.hash('password', roundsOfHashing),
      role: 'FREQUENTER',
      // frequenterEnvironment: {
      //   connect: { id: env1.id },
      // },
      mac: '18:41:6D:48:0D:DA',
      // rfid: { create: { tag: 'RFIDESP32XX' } }
    },
  });

  const freq2 = await prisma.user.create({
    data: {
      name: 'Uriel',
      registration: '20231151210066',
      password: await bcrypt.hash('password', roundsOfHashing),
      role: 'FREQUENTER',
      // frequenterEnvironment: {
      //   connect: { id: env1.id },
      // },
      mac: '05:76:22:59:7F:D4',
      // rfid: { create: { tag: 'KLMN123456' } }
    },
  });

  const freq3 = await prisma.user.create({
    data: {
      name: 'Fábio',
      registration: '20231012090022',
      password: await bcrypt.hash('password', roundsOfHashing),
      role: 'FREQUENTER',
      // frequenterEnvironment: {
      //   connect: { id: env2.id },
      // },
      mac: 'F7:5D:51:88:8A:54',
      // rfid: { create: { tag: 'T3344I02D23' } }
    },
  });
}

// async function seedCarontes() {
//   const envs = await prisma.environment.findMany()

//   const caronte1 = await prisma.caronte.create({
//     data: {
//       ip: '192.168.1.3',
//       esp: '02:F1:95:7C:C2:EC',
//       Environment: {
//         connect: { id: envs[0].id },
//       },
//       password: await bcrypt.hash('password', roundsOfHashing),
//     },
//   });
  
//   const caronte2 = await prisma.caronte.create({
//     data: {
//       ip: '192.168.1.2',
//       esp: 'A7:43:0E:BC:06:6D',
//       Environment: {
//         connect: { id: envs[1].id },
//       },
//       password: await bcrypt.hash('password', roundsOfHashing),
//     },
//   });
// }

seedUsersAndEnvs()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// seedCarontes()
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });