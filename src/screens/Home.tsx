import { useEffect, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { borrowBook, loadBooks, returnBook } from '../features/books/booksSlice';
import { useFilterStore, type FilterCategory } from '../store/useFilterStore';
import { useDebounce } from '../hooks/useDebounce';
import BookItem from '../components/BookItem';

const categories: FilterCategory[] = ['Tất cả', 'CNTT', 'Kinh tế', 'Ngoại ngữ'];

export default function Home() {
  const dispatch = useAppDispatch();
  const { items, borrowedIds, status, error, warning } = useAppSelector((state) => state.books);
  const { keyword, category, setKeyword, setCategory } = useFilterStore();

  const debounceKey = useDebounce(keyword, 300);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadBooks(false));
    }
  }, [status, dispatch]);

  const handleBorrow = useCallback(
    (id: string) => {
      dispatch(borrowBook(id));
    },
    [dispatch]
  );

  const handleReturn = useCallback(
    (id: string) => {
      dispatch(returnBook(id));
    },
    [dispatch]
  );

  const filteredBooks = useMemo(() => {
    const kw = debounceKey.trim().toLowerCase();
    return items.filter((b) => {
      const matchCat = category === 'Tất cả' || b.category === category;
      const matchKw =
        kw === '' ||
        b.title.toLowerCase().includes(kw) ||
        b.author.toLowerCase().includes(kw);
      return matchCat && matchKw;
    });
  }, [items, debounceKey, category]);

  const borrowedBooks = useMemo(() => {
    return borrowedIds
      .map((id) => items.find((b) => b.id === id))
      .filter((b): b is NonNullable<typeof b> => Boolean(b));
  }, [borrowedIds, items]);

  if (status === 'loading') {
    return <div className="p-4 text-lg font-bold">Đang tải...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="p-4">
        <p className="text-red-500 font-bold mb-2">{error}</p>
        <button
          onClick={() => dispatch(loadBooks(false))}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Tải lại
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <input
          type="text"
          placeholder="Tìm theo tên sách hoặc tác giả..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-400 px-3 py-1 rounded flex-1 text-black bg-white"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as FilterCategory)}
          className="border border-gray-400 px-3 py-1 rounded text-black bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          onClick={() => dispatch(loadBooks(true))}
          className="border border-red-400 text-red-500 px-2 py-1 rounded text-sm"
        >
          Giả lập lỗi API
        </button>
      </div>

      {warning && (
        <div className="bg-red-100 border border-red-500 text-red-700 p-2 mb-4 rounded">
          {warning}
        </div>
      )}

      <div className="mb-6 border border-gray-400 p-3 rounded">
        <h2 className="font-bold text-lg mb-2">
          Sách đang mượn ({borrowedIds.length}/3)
        </h2>
        {borrowedBooks.length === 0 ? (
          <p className="text-sm">Chưa mượn cuốn nào.</p>
        ) : (
          <ul className="space-y-2">
            {borrowedBooks.map((item, idx) => (
              <li
                key={`${item.id}-${idx}`}
                className="flex justify-between items-center border-b border-gray-300 pb-1"
              >
                <span>
                  {item.title} - {item.author}
                </span>
                <button
                  onClick={() => handleReturn(item.id)}
                  className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                >
                  Trả
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h2 className="font-bold text-lg mb-2">Danh sách sách ({filteredBooks.length})</h2>
      <div>
        {filteredBooks.map((item) => (
          <BookItem
            key={item.id}
            book={item}
            isBorrowed={borrowedIds.includes(item.id)}
            onBorrow={handleBorrow}
            onReturn={handleReturn}
          />
        ))}
      </div>
    </div>
  );
}
