"use server"

import { ID } from "node-appwrite";
import { createSessionClient, createAdminClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import { redirect } from "next/navigation";

interface SignIn {
    email: string,
    password: string;
}

export const signIn = async ({ email, password }: SignIn) => {
    try {
        const { account } = await createSessionClient();

        const user = await account.createEmailPasswordSession(email, password);
        return parseStringify(user)

    } catch (error) {
        return null;
    }
}

export const signUp = async (userData: SignUpParams) => {
    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            userData.email,
            userData.password,
            `${userData.firstName} ${userData.lastName}`
        );
        const session = await account.createEmailPasswordSession(userData.email, userData.password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount)

    } catch (error) {
        console.log(error)
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get()

        return parseStringify(user)
    } catch (error) {
        return null;
    }
}

export async function signOut() {
    try {
        const { account } = await createSessionClient();

        cookies().delete('appwrite-session');

        await account.deleteSession('current');
    } catch (error) {
        return null;
    }
}
