import Fastify from "fastify";
import { fastifyElasticsearch } from "@fastify/elasticsearch";
import fastifySwaggerUi from "@fastify/swagger-ui";
import bookRoutes from "./modules/book/book.route";
import { client } from "./utils/client";
import fastifySwagger from "@fastify/swagger";
const fastify = Fastify({
  logger: true,
});
const swaggerOptions = {
  swagger: {
    info: {
      title: "Api Book",
      description: "Test API documentation",
      version: "1.0.0",
    },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
};

const swaggerUiOptions = {
  routePrefix: "/docs",
  exposeRoute: true,
};

// Run the server!
const start = async () => {
  fastify.register(fastifyElasticsearch, {
    client,
    healthcheck: false,
  });
  fastify.register(fastifySwagger, swaggerOptions);
  fastify.register(fastifySwaggerUi, swaggerUiOptions);

  const index = "books";
  const check = await client.indices.get({ index }, { ignore: [404] });
  if (check.status == 404) {
    await client.indices.create({
      index,
      mappings: {
        dynamic: "strict",
        properties: {
          id: { type: "text" },
          title: { type: "text" },
          author: { type: "text" },
          publishedDate: { type: "date", format: "yyyy-MM-dd" },
          description: { type: "text" },
          price: { type: "float" },
        },
      },
    });
  }
  fastify.register(bookRoutes, { prefix: "api/books" });
  fastify.listen({ port: process.env.port }, async (err) => {
    if (err) throw err;
  });
};
start();
