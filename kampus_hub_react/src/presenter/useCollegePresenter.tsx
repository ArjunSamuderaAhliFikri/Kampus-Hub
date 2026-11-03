import { useState } from "react";
import { type College, CollegeData } from "../data/colleges";
import { useSearchAnythingContext } from "../context/useSearchAnythingContext";

export function useCollegePresenter() {
  const [colleges] = useState<College[]>(CollegeData);
  const { searchValue, setSearchValue } = useSearchAnythingContext();

  const query = searchValue.toLowerCase().trim();

  const filteredColleges = colleges.filter((c) => {
    if (!query) return true;
    return (
      c.name.toLowerCase().includes(query) ||
      c.alamat.toLowerCase().includes(query) ||
      c.semester.toString().includes(query) ||
      c.ipk.toString().includes(query) ||
      c.ips.toString().includes(query)
    );
  });

  return {
    college: filteredColleges,
    totalColleges: colleges.length,
    searchValue,
    setSearchValue,
  };
}
