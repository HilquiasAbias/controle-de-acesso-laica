import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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

    // Cria 3 ambientes
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

    // Cria 3 frequentadores
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

    // Cria 2 gatilhos para cada ambiente
    // const caronte1 = await prisma.caronte.create({
    //     data: {
    //         ip: '192.168.1.1',
    //         esp: 'esp-mac-1',
    //         Environment: {
    //             connect: { id: 1 },
    //         },
    //         password: await bcrypt.hash('password', roundsOfHashing),
    //     },
    // });
    
    // const caronte2 = await prisma.caronte.create({
    //     data: {
    //         ip: '192.168.1.2',
    //         esp: 'esp-mac-2',
    //         Environment: {
    //             connect: { id: 2 },
    //         },
    //         password: await bcrypt.hash('password', roundsOfHashing),
    //     },
    // });
    
    // const caronte3 = await prisma.caronte.create({
    //     data: {
    //         ip: '192.168.1.3',
    //         esp: 'esp-mac-3',
    //         Environment: {
    //             connect: { id: 2 },
    //         },
    //         password: await bcrypt.hash('password', roundsOfHashing),
    //     },
    // });
}

seed()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
