import { create } from "zustand";
import type { Category } from "../types/book";

export type FilterCategory = "Tất cả" | Category;

interface FilterState {
    keyword: string;
    setKeyword: (keyword: string) => void;
    category: FilterCategory;
    setCategory: (category: FilterCategory) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    keyword: "",
    setKeyword: (keyword) => set({ keyword }),
    category: "Tất cả",
    setCategory: (category) => set({ category }),
}));