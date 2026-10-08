/** @format */

import {
  Bell,
  LayoutDashboard,
  Mail,
  Newspaper,
  School,
  UserGroup,
  UsersRound,
} from "lucide-react";

export default function App() {
  return (
    <>
      <div className="flex w-full min-h-screen bg-slate-200/90">
        <aside className="bg-slate-100 w-1/6 px-8 py-6 rounded-tr-xl rounded-br-xl">
          <div className="flex items-center gap-x-4">
            <School color="#059669" />
            <h1 className="font-bold text-emerald-500 text-xl">Kampus Hub</h1>
          </div>

          <section className="mt-8 mb-4">
            <ul className="flex flex-col gap-y-6">
              <li className="flex gap-x-2 px-3 py-1.5 border-b-2 border-emerald-500">
                <LayoutDashboard strokeWidth={2} color="#059669" />
                <span className="text-md font-medium text-emerald-600">
                  Dashboard
                </span>
              </li>
              <li className="flex gap-x-2 px-3 py-1.5 border-b-0 border-emerald-500">
                <Newspaper strokeWidth={1} color="#333" />
                <span className="text-md font-normal text-slate-700">
                  Berita
                </span>
              </li>
              <li className="flex gap-x-2 px-3 py-1.5 border-b-0 border-emerald-500">
                <UsersRound strokeWidth={1} color="#333" />
                <span className="text-md font-normal text-slate-700">
                  Mahasiswa
                </span>
              </li>
            </ul>
          </section>
        </aside>
        <div className="px-8 py-6 w-full">
          <nav className="flex items-center gap-x-4 w-full">
            <input
              type="text"
              name="search-anything"
              id="search-anything"
              placeholder="Search Anything"
              className="bg-slate-100 px-4 py-2.5 w-3/4 placeholder:text-xs rounded-full outline-none border border-slate-400/50 text-xs text-slate-600"
            />

            <div className="flex items-center gap-x-3">
              <div className="flex justify-center items-center size-10 rounded-full border border-slate-300 bg-slate-100">
                <Mail size={16} strokeWidth={2} color="#333" />
              </div>

              <div>
                <div className="flex justify-center items-center size-10 rounded-full border border-slate-300 bg-slate-100">
                  <Bell size={16} strokeWidth={2} color="#333" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-x-3">
              <div className="w-0.5 h-8 rounded-full bg-slate-600"></div>

              <div className="flex items-center gap-x-2">
                <div className="size-11 rounded-full bg-slate-400"></div>
                <h1 className="text-sm font-normal">Arjun Samudera</h1>
              </div>
            </div>
          </nav>
          <main className="py-4">
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
                  <div className="">
                    <div
                      id="card-dashboard"
                      className="w-44 p-3 rounded-lg bg-slate-100"
                    >
                      <div className="flex justify-center items-center gap-x-6">
                        <div className="flex items-center justify-center size-10 rounded-full bg-emerald-500/10">
                          <UsersRound
                            strokeWidth={2}
                            size={16}
                            color="#059669"
                          />
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
          </main>
        </div>
      </div>
    </>
  );
}
