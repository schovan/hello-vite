import { DurableObject } from "cloudflare:workers";

interface Env {
  COUNTER: DurableObjectNamespace<Counter>;
}

export class Counter extends DurableObject<Env> {
  async increment(): Promise<number> {
    const value = (await this.ctx.storage.get<number>("value") ?? 0) + 1;
    await this.ctx.storage.put("value", value);
    return value;
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/counter") {
      const stub = env.COUNTER.getByName("shared");
      const value = await stub.increment();
      return Response.json({ value });
    }

    return new Response("Not Found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
