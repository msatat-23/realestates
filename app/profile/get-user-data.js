"use server"
import { getUserPropertiesByUserId } from "@/data/property/property-details";
export const getUserProperties = async (userId) => {
    console.log("IAM IN SERVER TRYING TO FETCH USER PROPERTIES BY USER ID !!!");
    const properties = await getUserPropertiesByUserId(userId);
    return properties;
};