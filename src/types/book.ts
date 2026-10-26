export type Category = 
    | "CNTT"
    | "Kinh tế"
    | "Ngoại ngữ";

export interface Book {
    id: string;
    title: string;
    author: string;
    category: Category;
    year: number;
    available: string | number;
}

export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export function isApiOk<T>(res: ApiResponse<T>): res is { ok: true; data: T } {
  return res.ok === true;
}

export type BookSummary = Pick<Book, 'id' | 'title' | 'author'>;

export type CategoryCount = Record<Category, number>;