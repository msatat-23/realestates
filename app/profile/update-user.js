"use server"

import { updateuser } from "@/data/user/user";



export const updateUserByUserId = async (id, data) => {
    console.log("IAM IN SERVER TRYING TO UPDATE USER BY USER ID!!");
    const res = await updateuser(id, data);
    return res;
};