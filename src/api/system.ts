import { Context } from "hono";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { getAppName } from "@/utils/helper";

export const checkSystemInitialized = () => {
    const user = db.select({ id: schema.users.id }).from(schema.users).limit(1).get();
    return !!user;
};

export const getSystemStatus = async (c: Context) => {
    return c.json({
        code: 200,
        msg: "success",
        data: {
            app_name: getAppName(),
            initialized: checkSystemInitialized(),
            allow_register: (Bun.env.ZEST_ALLOW_REGISTER || "true") !== "false",
        },
    });
};
