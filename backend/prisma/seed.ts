// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function seed() {
//   // Cria 3 usuários com role ADMIN
//   const admin1 = await prisma.user.create({
//     data: {
//       name: 'Admin 1',
//       registration: 'admin1',
//       password: 'password',
//       role: 'ADMIN',
//     },
//   });

//   const admin2 = await prisma.user.create({
//     data: {
//       name: 'Admin 2',
//       registration: 'admin2',
//       password: 'password',
//       role: 'ADMIN',
//     },
//   });

//   const admin3 = await prisma.user.create({
//     data: {
//       name: 'Admin 3',
//       registration: 'admin3',
//       password: 'password',
//       role: 'ADMIN',
//     },
//   });

//   // Cria 3 ambientes
//   const env1 = await prisma.environment.create({
//     data: {
//       name: 'Environment 1',
//       description: 'Description for Environment 1',
//       admins: {
//         connect: { id: admin1.id },
//       },
//     },
//   });

//   const env2 = await prisma.environment.create({
//     data: {
//       name: 'Environment 2',
//       description: 'Description for Environment 2',
//       admins: {
//         connect: { id: admin2.id },
//       },
//     },
//   });

//   const env3 = await prisma.environment.create({
//     data: {
//       name: 'Environment 3',
//       description: 'Description for Environment 3',
//       admins: {
//         connect: { id: admin3.id },
//       },
//     },
//   });

//   // Cria 3 frequentadores
//   const freq1 = await prisma.user.create({
//     data: {
//       name: 'Frequentador 1',
//       registration: 'freq1',
//       password: 'password',
//       role: 'FREQUENTER',
//       EnvFreq: {
//         connect: { id: env1.id },
//       },
//     },
//   });

//   const freq2 = await prisma.user.create({
//     data: {
//       name: 'Frequentador 2',
//       registration: 'freq2',
//       password: 'password',
//       role: 'FREQUENTER',
//       EnvFreq: {
//         connect: { id: env2.id },
//       },
//     },
//   });

//   const freq3 = await prisma.user.create({
//     data: {
//       name: 'Frequentador 3',
//       registration: 'freq3',
//       password: 'password',
//       role: 'FREQUENTER',
//       EnvFreq: {
//         connect: { id: env3.id },
//       },
//     },
//   });

//   // Cria 2 gatilhos para cada ambiente
//   const trigger1 = await prisma.trigger.create({
//     data: {
//       ip: '192.168.1.1',
//       Environment: {
//         connect: { id: env1.id },
//       },
//     },
//   });
  
//   const trigger2 = await prisma.trigger.create({
//     data: {
//       ip: '192.168.1.2',
//       Environment: {
//         connect: { id: env1.id },
//       },
//     },
//   });
  
//   const trigger3 = await prisma.trigger.create({
//     data: {
//       ip: '192.168.2.1',
//       Environment: {
//         connect: { id: env2.id },
//       },
//     },
//   });
  
//   const trigger4 = await prisma.trigger.create({
//     data: {
//       ip: '192.168.2.2',
//       Environment: {
//         connect: { id: env2.id },
//       },
//     },
//   });
  
//   const trigger5 = await prisma.trigger.create({
//     data: {
//       ip: '192.168.3.1',
//       Environment: {
//         connect: { id: env3.id },
//       },
//     },
//   });
  
//   const trigger6 = await prisma.trigger.create({
//     data: {
//       ip: '192.168.3.2',
//       Environment: {
//         connect: { id: env3.id },
//       },
//     },
//   });
// }

// seed()
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });