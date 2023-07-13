"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
const roundsOfHashing = 10;
async function seedUsersAndEnvs() {
    const admin1 = await prisma.user.create({
        data: {
            name: 'Ivanilson',
            registration: '2568824',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'ADMIN',
        },
    });
    const admin2 = await prisma.user.create({
        data: {
            name: 'Bob',
            registration: '2843906',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'ADMIN',
        },
    });
    const admin3 = await prisma.user.create({
        data: {
            name: 'Joao Moreno',
            registration: '2576883',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'ADMIN',
        },
    });
    const env1 = await prisma.environment.create({
        data: {
            name: 'Environment 1',
            description: 'Description for Environment 1',
            admins: {
                connect: [{ id: admin1.id }, { id: admin2.id }],
            },
        },
    });
    const freq1 = await prisma.user.create({
        data: {
            name: 'Hilquias',
            registration: '20201014040081',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'FREQUENTER',
        },
    });
    const freq2 = await prisma.user.create({
        data: {
            name: 'Uriel',
            registration: '20231151210066',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'FREQUENTER',
        },
    });
    const freq3 = await prisma.user.create({
        data: {
            name: 'Fábio',
            registration: '20231012090022',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'FREQUENTER',
        },
    });
}
async function seedCarontes() {
    const envs = await prisma.environment.findMany();
    const caronte1 = await prisma.caronte.create({
        data: {
            ip: '192.168.1.3',
            esp: '02:F1:95:7C:C2:EC',
            Environment: {
                connect: { id: envs[0].id },
            }
        },
    });
}
seedUsersAndEnvs()
    .catch((error) => {
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map