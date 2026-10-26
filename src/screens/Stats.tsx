import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';
import type { CategoryCount } from '../types/book';

export default function StatsPage() {
  const { items, borrowedIds } = useAppSelector((state) => state.books);

  const stats = useMemo<CategoryCount>(() => {
    const count: CategoryCount = {
      CNTT: 0,
      'Kinh tế': 0,
      'Ngoại ngữ': 0,
    };
    items.forEach((b) => {
      count[b.category] += 1;
    });
    return count;
  }, [items]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Thống kê thư viện</h2>
      <div className="border border-gray-400 p-4 rounded mb-4">
        <h3 className="font-bold mb-2">Số đầu sách theo thể loại:</h3>
        <p>CNTT: {stats.CNTT} đầu sách</p>
        <p>Kinh tế: {stats['Kinh tế']} đầu sách</p>
        <p>Ngoại ngữ: {stats['Ngoại ngữ']} đầu sách</p>
      </div>
      <div className="border border-gray-400 p-4 rounded">
        <p className="font-bold">Số sách đang mượn: {borrowedIds.length}</p>
      </div>
    </div>
  );
}
