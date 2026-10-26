import type { ApiResponse, Book } from '../types/book';

const initBooks: Book[] = [
  { id: 'b1', title: 'Lập trình Web Nâng cao', author: 'Ngô Văn Nhận', category: 'CNTT', year: 2024, available: 3 },
  { id: 'b2', title: 'Phát triển ứng dụng đa nền tảng', author: 'Trần Quang Đại', category: 'CNTT', year: 2022, available: 0 },
  { id: 'b3', title: 'Kinh tế chính trị', author: 'Lê Thị Thu', category: 'Kinh tế', year: 2021, available: 2 },
  { id: 'b4', title: 'Lịch sử đảng', author: 'Phạm Văn Thanh', category: 'Kinh tế', year: 2023, available: 4 },
  { id: 'b5', title: 'Tiếng Anh C3', author: 'Phạm Thị Hương', category: 'Ngoại ngữ', year: 2023, available: 1 },
  { id: 'b6', title: 'TOEIC 750+', author: 'Hoàng Minh Chủ', category: 'Ngoại ngữ', year: 2020, available: 2 },
];

export function fetchBooksApi(shouldFail = false): Promise<ApiResponse<Book[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, error: 'Lỗi kết nối API, ko tải được danh sách' });
      } else {
        resolve({ ok: true, data: initBooks.map((item) => ({ ...item })) });
      }
    }, 500);
  });
}
