import { defineConfig } from "drizzle-kit";

import dotenv from "dotenv";

dotenv.config({ path: ".dev.vars" });

// Use require.resolve to get the actual path from the workspace package
const schemaPath = require.resolve("@shared/db-schema/schema.ts");

export default defineConfig({
    schema: schemaPath,
    out: "./migrations",
    dialect: "sqlite",
    driver: "d1-http",
    dbCredentials: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
        databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID_STAGING!,
        token: process.env.CLOUDFLARE_D1_TOKEN!,
    },
});