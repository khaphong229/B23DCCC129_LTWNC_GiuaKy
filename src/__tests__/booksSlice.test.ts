import booksReducer, { borrowBook, returnBook, setWarning, loadBooks, type BooksState } from '../features/books/booksSlice';

const sampleState: BooksState = {
  items: [
    { id: 'b1', title: 'Sách 1', author: 'TG 1', category: 'CNTT', year: 2023, available: 2 },
    { id: 'b2', title: 'Sách 2', author: 'TG 2', category: 'Kinh tế', year: 2022, available: 0 },
  ],
  borrowedIds: [],
  status: 'succeeded',
  error: null,
  warning: null,
};

describe('booksSlice reducer', () => {
  test('1. trả về initial state ban đầu', () => {
    const state = booksReducer(undefined, { type: 'unknown' });
    expect(state.items).toEqual([]);
    expect(state.borrowedIds).toEqual([]);
    expect(state.status).toBe('idle');
  });

  test('2. borrowBook giảm available đi 1 và thêm id vào borrowedIds', () => {
    const nextState = booksReducer(sampleState, borrowBook('b1'));
    expect(nextState.items[0].available).toBe(1);
    expect(nextState.borrowedIds).toContain('b1');
  });

  test('3. returnBook tăng available lên 1 và xoá id khỏi borrowedIds', () => {
    const borrowedState: BooksState = {
      ...sampleState,
      items: [{ ...sampleState.items[0], available: 1 }, sampleState.items[1]],
      borrowedIds: ['b1'],
    };
    const nextState = booksReducer(borrowedState, returnBook('b1'));
    expect(nextState.items[0].available).toBe(2);
    expect(nextState.borrowedIds).not.toContain('b1');
  });

  test('4. xử lý setWarning và trạng thái loadBooks.pending', () => {
    const warnState = booksReducer(sampleState, setWarning('Quá 3 cuốn'));
    expect(warnState.warning).toBe('Quá 3 cuốn');

    const pendingState = booksReducer(sampleState, { type: loadBooks.pending.type });
    expect(pendingState.status).toBe('loading');
  });
});
