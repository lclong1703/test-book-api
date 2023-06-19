import { getList, getById, updateById, create } from "./book.service";
export async function getListBook() {
  const books = await getList();
  return books;
}

export async function getBook(req) {
  const books = await getById(req);
  return books;
}

export async function updateBook(req) {
  const books = await updateById(req);
  return books;
}

export async function createBook(req) {
  const book = await create(req);
  return book;
}
