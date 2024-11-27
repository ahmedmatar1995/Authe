import { defineAction } from "astro:actions";
import { z } from "astro:content";

export const server = {
  register: defineAction({
    accept: "json",
    input: z.object({
      email: z.string().email().trim(),
      password: z.string().min(8).trim(),
    }),
    handler: async (payload) => {
      const req = await fetch("http://localhost:4321/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const res = await req.json();
      if (!res.success) return { success: false };
      return { success: true };
    },
  }),
  login: defineAction({
    accept: "json",
    input: z.object({
      email: z.string().email().trim(),
      password: z.string().min(8).trim(),
    }),
    handler: async (payload) => {
      const req = await fetch("http://localhost:4321/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const res = await req.json();
      if (!res.success) return { success: false };
      return { success: true };
    },
  }),
  logout: defineAction({
    handler: async () => {
      const req = await fetch("http://localhost:4321/api/logout");
      const res = await req.json();
      if (!res.success) return { success: false };
      return { success: true };
    },
  }),
  auth: defineAction({
    handler: async () => {
      const req = await fetch("http://localhost:4321/api/auth");
      const res = await req.json();
      if (!res.success) return { success: false };
      return { success: true };
    },
  }),
};
