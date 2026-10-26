import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookItem from '../components/BookItem';
import type { Book } from '../types/book';

const mockBook: Book = {
  id: 'b1',
  title: 'Lập trình Web Nâng cao',
  author: 'Ngô Văn Nhận',
  category: 'CNTT',
  year: 2024,
  available: 2,
};

describe('BookItem component', () => {
  test('1. hiển thị đúng thông tin cuốn sách', () => {
    render(<BookItem book={mockBook} onBorrow={jest.fn()} />);
    expect(screen.getByText('Lập trình Web Nâng cao')).toBeInTheDocument();
    expect(screen.getByText(/Ngô Văn Nhận/)).toBeInTheDocument();
    expect(screen.getByText(/CNTT/)).toBeInTheDocument();
    expect(screen.getByText(/2024/)).toBeInTheDocument();
    expect(screen.getByText(/Còn lại: 2 bản/)).toBeInTheDocument();
  });

  test('2. click nút Mượn gọi đúng hàm với đúng id', async () => {
    const user = userEvent.setup();
    const handleBorrow = jest.fn();
    render(<BookItem book={mockBook} onBorrow={handleBorrow} />);

    await user.click(screen.getByRole('button', { name: 'Mượn' }));
    expect(handleBorrow).toHaveBeenCalledTimes(1);
    expect(handleBorrow).toHaveBeenCalledWith('b1');
  });

  test('3. nút Mượn bị vô hiệu hoá khi hết bản', () => {
    const emptyBook: Book = { ...mockBook, available: 0 };
    render(<BookItem book={emptyBook} onBorrow={jest.fn()} />);

    const btn = screen.getByRole('button', { name: 'Mượn' });
    expect(btn).toBeDisabled();
  });
});

