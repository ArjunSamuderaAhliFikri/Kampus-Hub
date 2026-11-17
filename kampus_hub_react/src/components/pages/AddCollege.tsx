import { type Dispatch, type SetStateAction } from "react";
import { useCollegePresenter } from "../../presenter/useCollegePresenter";

export default function AddCollege() {
  const { propertyCollege, actionCollege } = useCollegePresenter();

  return (
    <>
      <section id="form-add-college">
        <form onSubmit={actionCollege.handleAddCollege}>
          <InputForm
            value={propertyCollege.inputUsername}
            onChange={propertyCollege.setInputUsername}
            label="Username"
            type="text"
            placeholder="Masukkan Username"
          />
          <InputForm
            value={propertyCollege.inputPassword}
            onChange={propertyCollege.setInputPassword}
            label="Password"
            type="password"
            placeholder="******"
          />
          <InputForm
            value={propertyCollege.inputGender}
            onChange={propertyCollege.setInputGender}
            label="Gender"
            type="text"
            placeholder="Laki-laki / Perempuan"
          />
          <InputForm
            value={propertyCollege.inputAddress}
            onChange={propertyCollege.setInputAddress}
            label="Alamat"
            type="text"
            placeholder="Masukkan Alamat"
          />
          <InputForm
            value={propertyCollege.inputFaculty}
            onChange={propertyCollege.setInputFaculty}
            label="Fakultas & Prodi"
            type="text"
            placeholder="Masukkan Fakultas & Prodi"
          />

          <button
            onSubmit={actionCollege.handleAddCollege}
            type="submit"
            className="bg-emerald-500 px-4 py-1.5 rounded-lg text-sm text-slate-100 cursor-pointer hover:bg-emerald-600"
          >
            Tambahkan Mahasiswa
          </button>
        </form>
      </section>
    </>
  );
}

type InputFormParams = {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

function InputForm(params: InputFormParams) {
  return (
    <>
      <div className="flex flex-col gap-y-3 mb-4">
        <label
          htmlFor={params.label}
          className="font-semibold text-sm text-slate-700"
        >
          {params.label}
        </label>
        <input
          value={params.value}
          onChange={(e) => params.onChange(e.target.value)}
          id={params.label}
          type={params.type}
          placeholder={params.placeholder}
          required={true}
          className="outline-none px-3 py-1.5 border-2 border-slate-300 rounded-lg placeholder:text-sm"
        />
      </div>
    </>
  );
}
