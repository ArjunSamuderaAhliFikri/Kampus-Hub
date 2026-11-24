/** @format */

import { useNavigate } from "react-router-dom";
import { type College as CollegeType } from "../../data/colleges";
import { useCollegePresenter } from "../../presenter/useCollegePresenter";
import { useAuthContext } from "../../context/useAuthContext";
import "../../styles/college.css";

export default function CollegePage() {
  const { college, searchValue, setSearchValue } = useCollegePresenter();
  const { isAdmin } = useAuthContext();

  const navigate = useNavigate();

  return (
    <section className="p-2 sm:p-4">
      <button
        onClick={() => navigate("/mahasiswa/tambah-mahasiswa")}
        type="button"
        disabled={!isAdmin}
        className={`${
          isAdmin
            ? "bg-emerald-500 cursor-pointer hover:bg-emerald-600"
            : "bg-gray-400 cursor-not-allowed opacity-60"
        } text-slate-100 px-4 py-1.5 rounded-lg mb-3 text-sm transition-colors`}
      >
        Tambah Mahasiswa
      </button>

      {!isAdmin && (
        <p className="text-xs text-gray-500 mb-3 italic">
          * Hanya admin yang dapat menambahkan data mahasiswa.
        </p>
      )}

      {searchValue.trim() && (
        <div className="mb-4 flex items-center justify-between bg-emerald-50 text-emerald-900 border border-emerald-200 px-4 py-2.5 rounded-lg text-sm shadow-xs">
          <span>
            Hasil pencarian untuk: <strong>"{searchValue}"</strong> (
            {college.length} mahasiswa ditemukan)
          </span>
          <button
            type="button"
            onClick={() => setSearchValue("")}
            className="text-xs bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 cursor-pointer transition-colors"
          >
            Reset
          </button>
        </div>
      )}

      <section className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Semester</th>
              <th>IPK</th>
              <th>IPS</th>
            </tr>
          </thead>
          <tbody>
            {college.length > 0 ? (
              college.map((c) => <TableRowComponent key={c.id} college={c} />)
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-500">
                  Tidak ada mahasiswa yang cocok dengan pencarian "{searchValue}
                  ".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </section>
  );
}

function TableRowComponent({ college }: { college: CollegeType }) {
  return (
    <tr>
      <td>{college.id}</td>
      <td>{college.name}</td>
      <td>{college.alamat}</td>
      <td>{college.semester}</td>
      <td>{college.ipk}</td>
      <td>{college.ips}</td>
    </tr>
  );
}
