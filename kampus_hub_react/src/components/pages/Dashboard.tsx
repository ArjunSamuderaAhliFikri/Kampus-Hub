/** @format */

import {
  LineSquiggle,
  Newspaper,
  UserGroup,
  Users2,
  UsersRound,
  Workflow,
} from "lucide-react";
import { useSearchAnythingContext } from "../../context/useSearchAnythingContext";

export default function Dashboard() {
  const { searchValue, setSearchValue } = useSearchAnythingContext();

  return (
    <section className="p-2 sm:p-4">
      {searchValue.trim() && (
        <section className="mb-4 bg-emerald-50 text-emerald-900 border border-emerald-200 px-4 py-3 rounded-lg flex items-center justify-between text-sm shadow-xs">
          <div>
            <span className="font-medium text-emerald-700">Pencarian aktif:</span>{" "}
            <span className="font-semibold text-emerald-950">"{searchValue}"</span>
          </div>
          <button
            type="button"
            onClick={() => setSearchValue("")}
            className="text-xs bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 cursor-pointer transition-colors"
          >
            Reset
          </button>
        </section>
      )}

      <section className="lg:grid grid-cols-[1fr_350px] flex flex-col-reverse gap-x-4">
        <section className="flex flex-col gap-y-6">
          <section className="w-full h-52 bg-gradient-to-br from-emerald-700 to-emerald-500 rounded-lg px-6 py-4 text-slate-300">
            <span>Kampus Hub</span>
            <h1 className="lg:text-3xl text-lg mt-3 font-medium text-slate-100">
              Selamat Datang di Kampus Hub!
            </h1>
            <h2 className="lg:text-md text-sm mt-1 text-slate-300">
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
            <div className="lg:flex justify-between items-center grid grid-cols-2 grid-rows-2 gap-4 gap-x-3">
              <div
                id="card-dashboard"
                className="w-full p-3 rounded-lg bg-slate-100"
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
                className="w-full p-3 rounded-lg bg-slate-100"
              >
                <div className="flex justify-center items-center gap-x-6">
                  <div className="flex items-center justify-center size-10 rounded-full bg-emerald-500/10">
                    <Newspaper strokeWidth={2} size={16} color="#059669" />
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
                className="w-full p-3 rounded-lg bg-slate-100"
              >
                <div className="flex justify-center items-center gap-x-6">
                  <div className="flex items-center justify-center size-10 rounded-full bg-emerald-500/10">
                    <Workflow strokeWidth={2} size={16} color="#059669" />
                  </div>
                  <div className="flex flex-col gap-y-0.5">
                    <span className="text-slate-600 font-normal text-xs">
                      Lowongan Kerja
                    </span>
                    <h1 className="text-slate-800 text-md font-medium">
                      9 Loker
                    </h1>
                  </div>
                </div>
              </div>
              <div
                id="card-dashboard"
                className="w-full p-3 rounded-lg bg-slate-100"
              >
                <div className="flex justify-center items-center gap-x-6">
                  <div className="flex items-center justify-center size-10 rounded-full bg-emerald-500/10">
                    <Users2 strokeWidth={2} size={16} color="#059669" />
                  </div>
                  <div className="flex flex-col gap-y-0.5">
                    <span className="text-slate-600 font-normal text-xs">
                      Dosen
                    </span>
                    <h1 className="text-slate-800 text-md font-medium">
                      13 Orang
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid lg:grid-cols-3 grid-cols-1 gap-x-4">
            <NewsCard />
            <NewsCard />
            <NewsCard />
          </section>
        </section>
        <section className="bg-slate-300/50 rounded-xl shadow-lg px-6 py-4 mb-8 lg:mb-0">
          <h1 className="hidden lg:block text-slate-900 font-semibold text-md">
            Statistic
          </h1>

          <section className="lg:mt-12 mt-0 flex lg:flex-col flex-row justify-center items-center">
            <div className="lg:size-32 size-16 rounded-full overflow-hidden shadow shadow-emerald-500">
              <img
                className="block size-full object-cover"
                src="/img/default-profile.jpg"
                alt=""
              />
            </div>

            <div className="mt-4 lg:text-center text-left ml-6 lg:ml-0">
              <h1 className="font-semibold text-slate-900 lg:text-lg text-md">
                Good Morning, Arjun Samudera!
              </h1>
              <p className="mt-1 font-normal text-slate-500 text-[10px] lg:text-xs">
                Lorem ipsum dolor sit, amet consectetur adipisicing.
              </p>
            </div>

            <div></div>
          </section>
        </section>
      </section>
    </section>
  );
}

function NewsCard() {
  return (
    <>
      <div className="min-w-60 rounded-lg overflow-hidden bg-slate-500/5">
        <section className="w-full h-24 rounded-lg overflow-hidden">
          <img
            className="size-full block object-cover"
            src="/img/news-sample.png"
            alt=""
          />
        </section>

        <section className="flex flex-col gap-y-2 px-4 py-6">
          <div className="flex items-center gap-x-3 text-emerald-600 w-fit text-xs px-3 py-1 rounded-lg bg-emerald-500/10">
            <LineSquiggle size={12} />
            Recomended For You
          </div>

          <h1 className="font-semibold text-slate-800 text-md">
            Sekarang Kamu Bisa Bikin Aplikasi Dengan Cepat..
          </h1>
          <p className="text-xs text-slate-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit..
          </p>
        </section>
      </div>
    </>
  );
}
