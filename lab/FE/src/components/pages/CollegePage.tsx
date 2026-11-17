/** @format */

import { type College as CollegeType } from "../../data/colleges";
import { useCollegePresenter } from "../../presenter/useCollegePresenter";
import "../../styles/college.css";

export default function CollegePage() {
  const { college, searchValue, setSearchValue } = useCollegePresenter();

  return (
    <section className="p-2 sm:p-4">
      {searchValue.trim() && (
        <div className="mb-4 flex items-center justify-between bg-emerald-50 text-emerald-900 border border-emerald-200 px-4 py-2.5 rounded-lg text-sm shadow-xs">
          <span>
            Hasil pencarian untuk: <strong>"{searchValue}"</strong> ({college.length} mahasiswa ditemukan)
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
              college.map((c) => (
                <TableRowComponent key={c.id} college={c} />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-500">
                  Tidak ada mahasiswa yang cocok dengan pencarian "{searchValue}".
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
