/** @format */

const randomIPK = () => {
  return Number((Math.random() * (4.0 - 2.5) + 2.5).toFixed(2));
};

const randomAge = () => {
  return Math.floor(Math.random() * (25 - 18 + 1)) + 18;
};

const colleges = [
  {
    name: "Abdillah Setya Pambudi",
    study_program: "Teknik Informatika",
    ipk: randomIPK(),
    age: randomAge(),
  },
  {
    name: "Ahmad Fiqhi Aprilianto",
    study_program: "Teknik Informatika",
    ipk: randomIPK(),
    age: randomAge(),
  },
  {
    name: "Andika Wahyu Setiawan",
    study_program: "Teknik Informatika",
    ipk: randomIPK(),
    age: randomAge(),
  },
  {
    name: "Arif Rahmat Darmawan",
    study_program: "Teknik Informatika",
    ipk: randomIPK(),
    age: randomAge(),
  },
  {
    name: "Arjun Samudera Ahli FIkri",
    study_program: "Teknik Informatika",
    ipk: randomIPK(),
    age: randomAge(),
  },
  {
    name: "Muhammad Davin Ali Fikri",
    study_program: "Teknik Informatika",
    ipk: randomIPK(),
    age: randomAge(),
  },
  {
    name: "Muhammad Anggoro Wijaya",
    study_program: "Teknik Informatika",
    ipk: randomIPK(),
    age: randomAge(),
  },
  {
    name: "Muhammad Rojer Fadli",
    study_program: "Teknik Informatika",
    ipk: randomIPK(),
    age: randomAge(),
  },
  {
    name: "Muhammad Brilliant Ghousi",
    study_program: "Teknik Informatika",
    ipk: randomIPK(),
    age: randomAge(),
  },
  {
    name: "Zarabiya",
    study_program: "Teknik Informatika",
    ipk: randomIPK(),
    age: randomAge(),
  },
];
