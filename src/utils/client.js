import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";
dotenv.config();
export const client = new Client({ node: process.env.host });
