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
            mac: '9C:F2:48:87:C2:5A',
        },
    });
    const admin2 = await prisma.user.create({
        data: {
            name: 'Bob',
            registration: '2843906',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'ADMIN',
            mac: '32:6E:2E:57:D1:3C',
        },
    });
    const admin3 = await prisma.user.create({
        data: {
            name: 'Joao Moreno',
            registration: '2576883',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'ADMIN',
            mac: '0E:DC:21:40:EF:B4',
        },
    });
    const freq1 = await prisma.user.create({
        data: {
            name: 'Hilquias',
            registration: '20201014040081',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'FREQUENTER',
            mac: '18:41:6D:48:0D:DA',
        },
    });
    const freq2 = await prisma.user.create({
        data: {
            name: 'Uriel',
            registration: '20231151210066',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'FREQUENTER',
            mac: '05:76:22:59:7F:D4',
        },
    });
    const freq3 = await prisma.user.create({
        data: {
            name: 'Fábio',
            registration: '20231012090022',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'FREQUENTER',
            mac: 'F7:5D:51:88:8A:54',
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