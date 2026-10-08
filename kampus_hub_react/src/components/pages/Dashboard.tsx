/** @format */

import { UserGroup, UsersRound } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <section className="grid grid-cols-[1fr_350px]">
        <section className="flex flex-col gap-y-6">
          <section className="w-full h-52 bg-gradient-to-br from-emerald-700 to-emerald-500 rounded-lg px-6 py-4 text-slate-300">
            <span>Kampus Hub</span>
            <h1 className="text-3xl mt-3 font-medium text-slate-100">
              Selamat Datang di Kampus Hub!
            </h1>
            <h2 className="text-md mt-1 text-slate-300">
              Pantau semua informasi kampus disini
            </h2>

            <button
              type="button"
              className="flex items-center justify-center gap-x-4 px-4 py-2 rounded-lg bg-slate-100 text-emerald-600 cursor-pointer transition-all hover:bg-slate-300 text-sm font-medium mt-8"
            >
              <UserGroup size={18} />
              Bergabung Sekarang
            </button>
          </section>

          <section>
            <div className="flex items-baseline gap-x-3">
              <div
                id="card-dashboard"
                className="w-44 p-3 rounded-lg bg-slate-100"
              >
                <div className="flex justify-center items-center gap-x-6">
                  <div className="flex items-center justify-center size-10 rounded-full bg-emerald-500/10">
                    <UsersRound strokeWidth={2} size={16} color="#059669" />
                  </div>
                  <div className="flex flex-col gap-y-0.5">
                    <span className="text-slate-600 font-normal text-xs">
                      Mahasiswa
                    </span>
                    <h1 className="text-slate-800 text-md font-medium">
                      13 Orang
                    </h1>
                  </div>
                </div>
              </div>
              <div
                id="card-dashboard"
                className="w-44 p-3 rounded-lg bg-slate-100"
              >
                <div className="flex justify-center items-center gap-x-6">
                  <div className="flex items-center justify-center size-10 rounded-full bg-emerald-500/10">
                    <UsersRound strokeWidth={2} size={16} color="#059669" />
                  </div>
                  <div className="flex flex-col gap-y-0.5">
                    <span className="text-slate-600 font-normal text-xs">
                      Berita
                    </span>
                    <h1 className="text-slate-800 text-md font-medium">
                      4 Berita
                    </h1>
                  </div>
                </div>
              </div>
              <div
                id="card-dashboard"
                className="w-44 p-3 rounded-lg bg-slate-100"
              >
                <div className="flex justify-center items-center gap-x-6">
                  <div className="flex items-center justify-center size-10 rounded-full bg-emerald-500/10">
                    <UsersRound strokeWidth={2} size={16} color="#059669" />
                  </div>
                  <div className="flex flex-col gap-y-0.5">
                    <span className="text-slate-600 font-normal text-xs">
                      Mahasiswa
                    </span>
                    <h1 className="text-slate-800 text-md font-medium">
                      13 Orang
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        <section>
          <h1>test</h1>
        </section>
      </section>
    </>
  );
}
