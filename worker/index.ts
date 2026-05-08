import { DurableObject } from "cloudflare:workers";

const CORS_HEADERS: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export class CounterDO extends DurableObject<Env> {
  async increment(): Promise<number> {
    const val = (await this.ctx.storage.get<number>("count")) ?? 0;
    const next = val + 1;
    await this.ctx.storage.put("count", next);
    return next;
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/api/hello" && request.method === "GET") {
      return Response.json({ message: "Hello from the server!", timestamp: Date.now() }, { headers: CORS_HEADERS });
    }

    if (path === "/api/count" && request.method === "GET") {
      const stub = env.COUNTER_DO.getByName("global");
      const count = await stub.increment();
      return Response.json({ count }, { headers: CORS_HEADERS });
    }

    if (path === "/api/greet" && request.method === "POST") {
      try {
        const body = (await request.json()) as { name?: string };
        if (!body.name) {
          return Response.json({ error: "name is required" }, { status: 400, headers: CORS_HEADERS });
        }
        return Response.json({ greeting: `Hello, ${body.name}!`, timestamp: Date.now() }, { headers: CORS_HEADERS });
      } catch {
        return Response.json({ error: "Invalid JSON body" }, { status: 400, headers: CORS_HEADERS });
      }
    }

    return new Response("Not Found", { status: 404, headers: CORS_HEADERS });
  },
} satisfies ExportedHandler<Env>;
