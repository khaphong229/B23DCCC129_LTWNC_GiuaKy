import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import Home from './screens/Home';

const Stats = lazy(() => import('./screens/Stats'));

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <div className="border-b border-gray-400 p-4 flex justify-between items-center max-w-4xl mx-auto">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl font-bold">Mini Library</h1>
          <Link to="/" className="underline">
            Trang chủ
          </Link>
          <Link to="/stats" className="underline">
            Thống kê
          </Link>
        </div>
        <button
          onClick={toggleTheme}
          className="border border-gray-400 px-3 py-1 rounded"
        >
          Giao diện: {theme === 'light' ? 'Sáng' : 'Tối'}
        </button>
      </div>

      <Suspense fallback={<div className="p-4">Đang tải trang thống kê...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

