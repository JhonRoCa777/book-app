import { BASE_API, GlobalErrors } from "../../boot/axios";
import type { BookLoan } from "../../models/BookLoan";

export function BookService() {

  const CONTROLLER = '/books';

  return {
    all: async () => {
      const RESP = await GlobalErrors<BookLoan[]>(() => BASE_API.get(`${CONTROLLER}`));
      return RESP;
    },

    allByUser: async () => {
      const RESP = await GlobalErrors<BookLoan[]>(() => BASE_API.post(`${CONTROLLER}`));
      return RESP;
    },
  }
}
