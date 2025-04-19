import { z } from 'zod';

const createEnv = () => {
  const envSchema = z.object({
    VITE_APP_API_URL: z.string().url(),
  });

  const env = envSchema.safeParse(import.meta.env);
  if (!env.success) {
    throw new Error(`Invalid environment variables:\n${env.error.format()}`);
  }

  return env.data;
};

export const env = createEnv();
