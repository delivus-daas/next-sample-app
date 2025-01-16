// Function to check if a user's phone is verified
import {prisma} from "ospring/app/lib/prisma";

// Function to find a user by phone in the database
export const findUserByPhone = async (phone: string) => {
    return prisma.user.findFirst({
        where: {
            phone,
        },
    });
};

// Function to find a user by phone in the database
export const saveUser = async (phone: string, password: string) => {
    return prisma.user.create({
        data: {
            name: phone,
            phone,
            password
        },
    });
};