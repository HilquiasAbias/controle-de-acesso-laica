"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
const roundsOfHashing = 10;
async function seed() {
    const admin1 = await prisma.user.create({
        data: {
            name: 'Admin 1',
            registration: 'admin1',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'ADMIN',
            tag: { create: { content: 'tag1' } },
            mac: { create: { content: 'mac1' } }
        },
    });
    const admin2 = await prisma.user.create({
        data: {
            name: 'Admin 2',
            registration: 'admin2',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'ADMIN',
            tag: { create: { content: 'tag2' } },
            mac: { create: { content: 'mac2' } }
        },
    });
    const admin3 = await prisma.user.create({
        data: {
            name: 'Admin 3',
            registration: 'admin3',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'ADMIN',
            tag: { create: { content: 'tag3' } },
            mac: { create: { content: 'mac3' } }
        },
    });
    const env1 = await prisma.environment.create({
        data: {
            name: 'Environment 1',
            description: 'Description for Environment 1',
            admins: {
                connect: { id: admin1.id },
            },
        },
    });
    const env2 = await prisma.environment.create({
        data: {
            name: 'Environment 2',
            description: 'Description for Environment 2',
            admins: {
                connect: [{ id: admin2.id }, { id: admin3.id }],
            },
        },
    });
    const freq1 = await prisma.user.create({
        data: {
            name: 'Frequentador 1',
            registration: 'freq1',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'FREQUENTER',
            frequenterEnvironment: {
                connect: { id: env1.id },
            },
            tag: { create: { content: 'tag4' } },
            mac: { create: { content: 'mac4' } }
        },
    });
    const freq2 = await prisma.user.create({
        data: {
            name: 'Frequentador 2',
            registration: 'freq2',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'FREQUENTER',
            frequenterEnvironment: {
                connect: { id: env1.id },
            },
            tag: { create: { content: 'tag5' } },
            mac: { create: { content: 'mac5' } }
        },
    });
    const freq3 = await prisma.user.create({
        data: {
            name: 'Frequentador 3',
            registration: 'freq3',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'FREQUENTER',
            frequenterEnvironment: {
                connect: { id: env2.id },
            },
            tag: { create: { content: 'tag6' } },
            mac: { create: { content: 'mac6' } }
        },
    });
    const freq4 = await prisma.user.create({
        data: {
            name: 'Frequentador 4',
            registration: 'freq4',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'FREQUENTER',
            frequenterEnvironment: {
                connect: { id: env2.id },
            },
            tag: { create: { content: 'tag7' } },
            mac: { create: { content: 'mac7' } }
        },
    });
    const freq5 = await prisma.user.create({
        data: {
            name: 'Frequentador 5',
            registration: 'freq5',
            password: await bcrypt.hash('password', roundsOfHashing),
            role: 'FREQUENTER',
            frequenterEnvironment: {
                connect: { id: env2.id },
            },
            tag: { create: { content: 'tag8' } },
            mac: { create: { content: 'mac8' } }
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