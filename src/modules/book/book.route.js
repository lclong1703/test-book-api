import {
  getBook,
  createBook,
  getListBook,
  updateBook,
} from "./book.controller";

async function bookRoutes(server) {
  server.get(
    "/",
    {
      schema: {
        tags: ["book"],
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                title: { type: "string" },
                author: { type: "string" },
                publishedDate: { type: "string" },
                description: { type: "string" },
                price: { type: "number" },
              },
              required: [
                "id",
                "title",
                "author",
                "publishedDate",
                "description",
                "price",
              ],
            },
          },
        },
      },
    },
    getListBook
  );

  server.get(
    "/:id",
    {
      schema: {
        tags: ["book"],
        params: {
          id: {
            type: "string",
            description: "book id",
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "string" },
              title: { type: "string" },
              author: { type: "string" },
              publishedDate: { type: "string", format: "date" },
              description: { type: "string" },
              price: { type: "number" },
            },
          },
        },
      },
    },
    getBook
  );

  server.post(
    "/",
    {
      schema: {
        tags: ["book"],
        body: {
          type: "object",
          required: [
            "id",
            "author",
            "title",
            "price",
            "publishedDate",
            "description",
          ],
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            author: { type: "string" },
            publishedDate: { type: "string", format: "date" },
            description: { type: "string" },
            price: { type: "number", format: "float" },
          },
        },
        response: {
          201: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                title: { type: "string" },
                author: { type: "string" },
                publishedDate: { type: "string", format: "date" },
                description: { type: "string" },
                price: { type: "number" },
              },
              required: [
                "id",
                "title",
                "author",
                "publishedDate",
                "description",
                "price",
              ],
            },
          },
        },
      },
    },
    createBook
  );

  server.put(
    "/:id",
    {
      schema: {
        tags: ["book"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "book id",
            },
          },
        },
        body: {
          type: "object",
          required: [
            "author",
            "title",
            "price",
            "publishedDate",
            "description",
          ],
          properties: {
            title: { type: "string" },
            author: { type: "string" },
            publishedDate: { type: "string", format: "date" },
            description: { type: "string" },
            price: { type: "number", format: "float" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              result: { type: "string", example: "update" },
              message: { type: "string", example: "success" },
            },
          },
        },
      },
    },
    updateBook
  );
}

export default bookRoutes;
