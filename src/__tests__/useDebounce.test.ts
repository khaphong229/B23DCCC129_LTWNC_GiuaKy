import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../hooks/useDebounce';

describe('useDebounce hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('cập nhật giá trị sau khoảng trễ 300ms', () => {
    const { result, rerender } = renderHook(
      ({ val, delay }) => useDebounce(val, delay),
      { initialProps: { val: 'react', delay: 300 } }
    );

    expect(result.current).toBe('react');

    rerender({ val: 'redux', delay: 300 });
    expect(result.current).toBe('react');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('redux');
  });
});

