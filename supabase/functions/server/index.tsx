import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper function to hash passwords
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Signup endpoint
app.post("/make-server-7e89cccd/signup", async (c) => {
  try {
    const { username, password } = await c.req.json();

    if (!username || !password) {
      return c.json({ error: "username e password são obrigatórios" }, 400);
    }

    // Check if user already exists
    const existingUser = await kv.get(`user:${username}`);
    if (existingUser) {
      return c.json({ error: "usuário já existe" }, 409);
    }

    // Hash password and store user
    const hashedPassword = await hashPassword(password);
    await kv.set(`user:${username}`, {
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    // Generate simple session token
    const sessionToken = crypto.randomUUID();
    await kv.set(`session:${sessionToken}`, { username }, 86400); // 24h expiry

    return c.json({
      success: true,
      token: sessionToken,
      username
    });
  } catch (error) {
    console.log(`Signup error: ${error}`);
    return c.json({ error: "erro ao criar conta" }, 500);
  }
});

// Login endpoint
app.post("/make-server-7e89cccd/login", async (c) => {
  try {
    const { username, password } = await c.req.json();

    if (!username || !password) {
      return c.json({ error: "username e password são obrigatórios" }, 400);
    }

    // Get user from database
    const user = await kv.get(`user:${username}`);
    if (!user) {
      return c.json({ error: "usuário ou senha incorretos" }, 401);
    }

    // Verify password
    const hashedPassword = await hashPassword(password);
    if (user.password !== hashedPassword) {
      return c.json({ error: "usuário ou senha incorretos" }, 401);
    }

    // Generate session token
    const sessionToken = crypto.randomUUID();
    await kv.set(`session:${sessionToken}`, { username }, 86400); // 24h expiry

    return c.json({
      success: true,
      token: sessionToken,
      username
    });
  } catch (error) {
    console.log(`Login error: ${error}`);
    return c.json({ error: "erro ao fazer login" }, 500);
  }
});

// Verify session endpoint
app.get("/make-server-7e89cccd/verify", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return c.json({ error: "token não fornecido" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session) {
      return c.json({ error: "sessão inválida ou expirada" }, 401);
    }

    return c.json({
      valid: true,
      username: session.username
    });
  } catch (error) {
    console.log(`Verify error: ${error}`);
    return c.json({ error: "erro ao verificar sessão" }, 500);
  }
});

// Health check endpoint
app.get("/make-server-7e89cccd/health", (c) => {
  return c.json({ status: "ok" });
});

Deno.serve(app.fetch);