"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
const roundsOfHashing = 10;
async function seed() {
    const caronte1 = await prisma.caronte.create({
        data: {
            ip: '192.168.1.1',
            esp: 'esp-mac-1',
            Environment: {
                connect: { id: 1 },
            },
            password: await bcrypt.hash('password', roundsOfHashing),
        },
    });
    const caronte2 = await prisma.caronte.create({
        data: {
            ip: '192.168.1.2',
            esp: 'esp-mac-2',
            Environment: {
                connect: { id: 2 },
            },
            password: await bcrypt.hash('password', roundsOfHashing),
        },
    });
    const caronte3 = await prisma.caronte.create({
        data: {
            ip: '192.168.1.3',
            esp: 'esp-mac-3',
            Environment: {
                connect: { id: 2 },
            },
            password: await bcrypt.hash('password', roundsOfHashing),
        },
    });
}
seed()
    .catch((error) => {
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map