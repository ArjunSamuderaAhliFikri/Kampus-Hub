/** @format */
import { CollegeData, type College } from "../../data/colleges";
import "../../styles/college.css";

export default function CollegePage() {
  return (
    <>
      <section className=""></section>

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
            {CollegeData.length > 0 &&
              CollegeData.map((college) => (
                <TableRowComponent college={college} />
              ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

function TableRowComponent({ college }: { college: College }) {
  return (
    <>
      <tr>
        <td>{college.id}</td>
        <td>{college.name}</td>
        <td>{college.alamat}</td>
        <td>{college.semester}</td>
        <td>{college.ipk}</td>
        <td>{college.ips}</td>
      </tr>
    </>
  );
}
