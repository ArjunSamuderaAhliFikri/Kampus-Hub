import { useState, type Dispatch, type SetStateAction } from "react";
import { useAuthPresenter } from "../../../presenter/useAuthPresenter";
import { Eye, EyeClosed } from "lucide-react";
import { Link } from "react-router-dom";

export default function Register() {
  const {
    authValue,
    authSetterValue,
    enabledWarning,
    error,
    successMessage,
    handleRegister,
  } = useAuthPresenter();

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-emerald-600 to-emerald-900 flex justify-center items-center">
        <main className="flex lg:w-3/4 w-11/12 h-fit lg:h-[85dvh] bg-slate-100 rounded-xl p-1">
          <section
            className="lg:block hidden w-fit rounded-xl overflow-hidden"
            id="hero-image"
          >
            <div className="size-full">
              <img
                className="block size-full object-cover"
                src="/img/news-12.jpg"
              />
            </div>
          </section>
          <section className="bg-slate-100 lg:px-8 px-4 lg:py-12 py-6">
            <section className="lg:w-full w-11/12 mx-auto" id="header">
              <h1 className="text-3xl font-semibold lg:text-left text-center text-slate-800">
                Register
              </h1>
              <p className="lg:text-sm text-xs lg:text-left text-center text-slate-600 mt-3">
                Daftarkan akun Campus Hub Anda. Pastikan data yang dimasukkan
                sesuai dengan data mahasiswa yang telah terdaftar di sistem.
              </p>
            </section>

            <section id="form" className="mt-4">
              <form onSubmit={handleRegister}>
                <InputFormRegister
                  label="username"
                  type="text"
                  placeholder="Masukkan Username"
                  value={authValue.username}
                  onChange={authSetterValue.setUsername}
                />
                <InputFormRegister
                  label="password"
                  type="password"
                  placeholder="*******"
                  value={authValue.password}
                  onChange={authSetterValue.setPassword}
                />
                <InputFormRegister
                  label="NIM"
                  type="text"
                  placeholder="Masukkan NIM"
                  value={authValue.nim}
                  onChange={authSetterValue.setNim}
                />

                <button
                  type="submit"
                  className="bg-emerald-500 w-full py-2 rounded-md text-slate-100 mt-4 font-semibold cursor-pointer transition-all duration-150 hover:bg-emerald-600"
                >
                  Register
                </button>

                <p className="text-sm text-slate-600 mt-4 text-center">
                  Sudah punya akun?{" "}
                  <Link
                    to="/auth/login"
                    className="text-emerald-600 hover:text-emerald-800 font-semibold"
                  >
                    Login di sini
                  </Link>
                </p>

                {successMessage && (
                  <p className="w-full text-green-600 pt-4 text-right text-sm">
                    {successMessage}
                  </p>
                )}

                <p
                  id="warning"
                  className={`${enabledWarning ? "block" : "hidden"} w-full text-red-500 pt-4 text-right text-sm`}
                >
                  {error}
                </p>
              </form>
            </section>
          </section>
        </main>
      </div>
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

function InputFormRegister(params: InputFormParams) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col gap-y-3 mb-4">
        <label
          htmlFor={params.label}
          className=" text-md capitalize text-slate-700"
        >
          {params.label}
        </label>

        <div className="relative w-full">
          <input
            value={params.value}
            onChange={(e) => params.onChange(e.target.value)}
            id={params.label}
            type={
              params.type === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : params.type
            }
            placeholder={params.placeholder}
            className="w-full outline-none px-3 py-2 rounded-sm bg-gray-300/50 placeholder:text-sm"
          />

          {params.type === "password" &&
            (showPassword ? (
              <Eye
                onClick={() => setShowPassword(false)}
                className="absolute top-0 right-3 translate-y-1/2 z-10 cursor-pointer hover:opacity-75"
                strokeWidth={2}
                color="#333"
                size={20}
              />
            ) : (
              <EyeClosed
                onClick={() => setShowPassword(true)}
                className="absolute top-0 right-3 translate-y-1/2 z-10 cursor-pointer hover:opacity-75"
                strokeWidth={2}
                color="#333"
                size={20}
              />
            ))}
        </div>
      </div>
    </>
  );
}
