/** @format */

// global state
const collegeData = colleges;

const dataCollegeContainer = document.querySelector(".announcement-list");
const searchElement = document.querySelector("#search-colleges");

// console.log("Data : ", collegeData);
// console.log("Data Container : ", dataCollegeContainer);

function createRowDataCollege(username, study_program, ipk, age) {
  const createElementCollege = document.createElement("div");
  createElementCollege.setAttribute("class", "announcement-item");

  const createHeadingName = document.createElement("h1");
  const createDescription = document.createElement("p");

  //   adding content
  createHeadingName.textContent = username;
  createDescription.textContent = `${study_program} - Umur : ${age} - IPK : ${ipk}`;

  createElementCollege.appendChild(createHeadingName);
  createElementCollege.appendChild(createDescription);

  dataCollegeContainer.appendChild(createElementCollege);
}

function handleDebounceSearch(query) {
  if (query) {
    const result = collegeData.filter((college) => {
      return college.name.toLowerCase().startsWith(query);
    });

    return structuredClone(result);
  }
}

function showCollegeInHTML(colleges) {
  dataCollegeContainer.innerHTML = "";

  colleges.forEach((college) => {
    // console.log("College foreach : ", college);
    createRowDataCollege(
      college.name,
      college.study_program,
      college.ipk,
      college.age,
    );
  });
}

function showDetailCollege(name, description) {
  const collegeName = document.querySelector(".detail-name-college");
  const getDescription = document.querySelector(".description-college");

  if (!name || !description) {
    collegeName.textContent = "Tidak ada Data Mahasiswa !";
    getDescription.textContent = "-";
  }

  collegeName.textContent = name;
  getDescription.textContent = description;
}

document.addEventListener("DOMContentLoaded", () => {
  if (!collegeData.length) return;

  showCollegeInHTML(collegeData);

  showDetailCollege(
    collegeData[0].name,
    `${collegeData[0].study_program} - ${collegeData[0].age} - ${collegeData[0].ipk}`,
  );

  const getListColleges = document.querySelectorAll(".announcement-item");

  getListColleges.forEach((college) => {
    // console.log(college);
    college.addEventListener("click", () => {
      const getName = college.querySelector("h1").textContent;
      const getDescription = college.querySelector("p").textContent;

      //   console.log("Get Description : ", getDescription);

      showDetailCollege(getName, getDescription);
    });
  });
});

searchElement.addEventListener("input", () => {
  const query = searchElement.value.toLowerCase();

  const result = query ? handleDebounceSearch(query) : collegeData;

  showCollegeInHTML(result);
  showDetailCollege(result[0]);
});
