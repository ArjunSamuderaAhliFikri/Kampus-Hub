import { useState } from "react";
import { type College, CollegeData } from "../data/colleges";
import { useSearchAnythingContext } from "../context/useSearchAnythingContext";
import { CollegeService } from "../services/college.service";
import type { CollegeType } from "../types/CollegeType";

export function useCollegePresenter() {
  const [colleges] = useState<College[]>(CollegeData);

  // Add College
  const [inputUsername, setInputUsername] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputGender, setInputGender] = useState<string>("");
  const [inputAddress, setInputAddress] = useState<string>("");
  const [inputFaculty, setInputFaculty] = useState<string>("");
  const [inputNim, setInputNim] = useState<string>("");

  const { searchValue, setSearchValue } = useSearchAnythingContext();

  const collegeService = CollegeService();

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

  const handleAddCollege = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const data: CollegeType = {
        username: inputUsername,
        password: inputPassword,
        gender: inputGender,
        address: inputAddress,
        faculty: inputFaculty,
        nim: inputNim,
      };

      const result = await collegeService.createCollege(data);

      if (result) {
        console.log("Result : ", result);
        alert("Berhasil menambahkan data mahasiswa baru!");
      }
    } catch (error) {
      console.log("Error from handleAddCollege : ", error);
    }
  };

  // Add college

  return {
    college: filteredColleges,
    totalColleges: colleges.length,
    searchValue,
    setSearchValue,

    propertyCollege: {
      inputUsername,
      setInputUsername,
      inputPassword,
      setInputPassword,
      inputGender,
      setInputGender,
      inputAddress,
      setInputAddress,
      inputFaculty,
      setInputFaculty,
      inputNim,
      setInputNim,
    },

    actionCollege: {
      handleAddCollege,
    },
  };
}
