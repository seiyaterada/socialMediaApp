import redisClient from "./connectToRedis";
import { IPost } from "../models/posts";

export const getCache = async (key: string) => {
    const cached = await redisClient.get(key);
    cached && console.log(cached);
    return JSON.parse(cached);
}

export const setCache = async (key: string, value: IPost) => {
    console.log(JSON.stringify(value));
    await redisClient.set(key, JSON.stringify(value));
}