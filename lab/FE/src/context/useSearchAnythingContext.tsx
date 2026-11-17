/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

type SearchAnythingContextType = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const searchAnythingContext = createContext<SearchAnythingContextType | null>(
  null,
);

export function LayoutSearchAnythingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <searchAnythingContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </searchAnythingContext.Provider>
  );
}

export function useSearchAnythingContext(): SearchAnythingContextType {
  const context = useContext(searchAnythingContext);

  if (!context) {
    throw new Error(
      "useSearchAnythingContext must be used within a LayoutSearchAnythingProvider",
    );
  }

  return context;
}
