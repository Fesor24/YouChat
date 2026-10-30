// import { PrismaClient } from "@prisma/client/extension";
import "dotenv/config"
import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";
import type { Contract } from "../../prisma/contract";
import contractJson from "../../prisma/contract.json" with { type: "json" };
import { Temporal } from "@js-temporal/polyfill";

// if (!globalThis.Temporal) {
//     Object.assign(globalThis, { Temporal });
// }

if (!("Temporal" in globalThis)) {
    Object.assign(globalThis, { Temporal });
}

const contract = contractFromJson<Contract>(contractJson);

const connectionString = process.env["DATABASE_URL"]

if(!connectionString){
    throw new Error("Database url is missing from env variables")
}

export const db = postgres({
    contract,
    url: connectionString
})

export const connectAsync = async() =>{
    try{
        await await db.connect();
    }catch(err){
        console.error(`An error occurred while connecting to DB. Error: ${err}`);
    }
}

export const disconnectAsync = async () =>{
    await db.close();
}

// const prisma = new PrismaClient({
//     log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
// });

// const connectDB = async() =>{
//     try{
//         await prisma.$connect();
//         console.log("DB connected via prisma")
//     }catch(err){
//         console.error(`Database connection error. Message: ${err.message}`)
//         process.exit(1)
//     }
// }

// const disconnectDB = async () =>{
//     await prisma.$disconnect();
// }

// export {prisma, connectDB, disconnectDB}

