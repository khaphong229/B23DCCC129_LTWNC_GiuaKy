import React from 'react';
import type { Book } from '../types/book';

interface itemProps {
  book: Book;
  isBorrowed?: boolean;
  onBorrow: (id: string) => void;
  onReturn?: (id: string) => void;
}

const BookItem: React.FC<itemProps> = ({ book, isBorrowed = false, onBorrow, onReturn }) => {
  return (
    <div className="border border-gray-400 p-3 mb-2 rounded flex justify-between items-center">
      <div>
        <h3 className="font-bold text-lg">{book.title}</h3>
        <p className="text-sm">Tác giả: {book.author}</p>
        <p className="text-sm">
          Thể loại: {book.category} | Năm xuất bản: {book.year}
        </p>
        <p className="text-sm font-semibold">Còn lại: {book.available} bản</p>
      </div>
      <div className="flex gap-2">
        <button
          disabled={book.available === 0}
          onClick={() => onBorrow(book.id)}
          className={
            book.available === 0
              ? 'bg-gray-400 text-white px-3 py-1 rounded cursor-not-allowed'
              : 'bg-blue-500 text-white px-3 py-1 rounded'
          }
        >
          Mượn
        </button>
        {isBorrowed && onReturn && (
          <button
            onClick={() => onReturn(book.id)}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Trả
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(BookItem);
