import { Hono } from "hono";
import type { APIContext, APIRoute } from "astro";
import { supabase } from "../../supabase";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

const app = new Hono().basePath("/api/");

app.post("/register", zValidator("json", userSchema), async (c) => {
  try {
    const data = c.req.valid("json");
    const { error } = await supabase.auth.signUp({ ...data });
    if (error) throw new Error(error.message);
    c.status(201);
    return c.json({ success: true });
  } catch (err: any) {
    c.status(400);
    return c.json({ success: false, message: err.message });
  }
});

app.post("/login", zValidator("json", userSchema), async (c) => {
  try {
    const data = c.req.valid("json");
    const { error } = await supabase.auth.signInWithPassword({ ...data });
    if (error) throw new Error(error.message);
    c.status(201);
    return c.json({ success: true });
  } catch (err: any) {
    console.log(err.message);
    c.status(400);
    return c.json({ success: false, message: err.message });
  }
});

const authUser = async (c: any, next: any) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.id) throw new Error("");
    return next();
  } catch (err) {
    c.status(400);
    return c.json({ success: false });
  }
};

app.get("/auth", authUser, async (c) => {
  c.status(200);
  return c.json({ success: true });
});

app.get("/logout", authUser, async (c) => {
  await supabase.auth.signOut();
  c.status(200);
  return c.json({ success: true });
});

export const ALL: APIRoute = async (ctx: APIContext) =>
  await app.fetch(ctx.request);
