import {PrismaClient} from '@prisma/client';
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();
// Function to generate a hashed @password
const generatePasswordHash = async (password: string) => {
    // generates a random salt. A salt is a random value used in the hashing process to ensure
    // that even if two users have the same @password, their hashed passwords will be different.
    // The 10 in the function call represents the cost factor, which determines how much
    // computational work is needed to compute the hash.
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
};

const initialUsers = [
    {name: 'Admin', phone: '99999999'},
    {name: 'User', phone: '88888888'},
    {name: 'Driver', phone: '96969696'},
];

const seed = async () => {
    // clean up before the seeding (optional)
    await prisma.user.deleteMany();

    // you could also use createMany
    // but it is not supported for databases
    // e.g. SQLite https://github.com/prisma/prisma/issues/10710
    for (const user of initialUsers) {
        const password = await generatePasswordHash('admin1234')
        await prisma.user.create({
            data: {...user, password},
        });
    }
};

seed()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });