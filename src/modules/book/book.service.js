import { client } from "../../utils/client";
const index = "books";
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export async function getList() {
  const books = await client.search(
    {
      index,
      body: {
        query: {
          match_all: {},
        },
      },
      size: 100,
    },
    { ignore: [400] }
  );

  const result = [];
  books.hits.hits.map((book) => {
    result.push(book._source);
  });

  return result;
}

export async function getById(req) {
  const book = await client.get(
    {
      index,
      id: req.params.id,
    },
    { ignore: [404] }
  );

  if (!book.found)
    throw new CustomError(`The book id: ${req.params.id} is not found`, 404);

  return book._source;
}

export async function updateById(req) {
  const bookDto = {
    title: req.body.title,
    author: req.body.author,
    publishedDate: req.body.publishedDate,
    description: req.body.description,
    price: req.body.price,
  };

  const book = await client.get(
    {
      index,
      id: req.params.id,
    },
    { ignore: [404] }
  );

  if (!book.found)
    throw new CustomError(`The book id: ${req.params.id} is not found`, 404);

  const newBook = await client.update({
    index,
    id: req.params.id,
    doc: { ...book._source, ...bookDto },
  });

  return { result: newBook.result, message: "success" };
}

export async function create(req) {
  const bookDto = {
    id: req.body.id,
    title: req.body.title,
    author: req.body.author,
    publishedDate: req.body.publishedDate,
    description: req.body.description,
    price: req.body.price,
  };

  const book = await client.get(
    {
      index,
      id: req.body.id,
    },
    { ignore: [404] }
  );

  if (book.found) throw new CustomError("The id of book is existed", 409);

  const newBook = await client.index({
    index,
    id: req.body.id,
    document: bookDto,
  });

  return { result: newBook.result, message: "success" };
}
