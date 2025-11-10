import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const schema = z.object({GEMINI_API_KEY: z.string().min(1, 'GEMINI_API_KEY is required')});

export const env = schema.parse(process.env);