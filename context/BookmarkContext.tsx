"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export interface Bookmark {
  id: string; // "surahNo:ayahNo"
  surahNo: number;
  ayahNo: number;
  surahName: string;
  surahNameArabic: string;
  arabicText: string;
  englishText: string;
  timestamp: number;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, "id" | "timestamp">) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (surahNo: number, ayahNo: number) => boolean;
  toggleBookmark: (bookmark: Omit<Bookmark, "id" | "timestamp">) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

const STORAGE_KEY = "quran-app-bookmarks";

function loadBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  // Lazy initializer — avoids cascading setState in useEffect
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(loadBookmarks);

  // Persist whenever bookmarks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = useCallback(
    (bookmark: Omit<Bookmark, "id" | "timestamp">) => {
      const id = `${bookmark.surahNo}:${bookmark.ayahNo}`;
      setBookmarks((prev) => {
        if (prev.some((b) => b.id === id)) return prev;
        return [...prev, { ...bookmark, id, timestamp: Date.now() }];
      });
    },
    []
  );

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const isBookmarked = useCallback(
    (surahNo: number, ayahNo: number) => {
      return bookmarks.some(
        (b) => b.surahNo === surahNo && b.ayahNo === ayahNo
      );
    },
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    (bookmark: Omit<Bookmark, "id" | "timestamp">) => {
      const id = `${bookmark.surahNo}:${bookmark.ayahNo}`;
      setBookmarks((prev) => {
        if (prev.some((b) => b.id === id)) {
          return prev.filter((b) => b.id !== id);
        }
        return [...prev, { ...bookmark, id, timestamp: Date.now() }];
      });
    },
    []
  );

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        toggleBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext);
  if (!ctx)
    throw new Error("useBookmarks must be used within BookmarkProvider");
  return ctx;
}
