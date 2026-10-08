/** @format */

import {
  Bell,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Newspaper,
  School,
  User,
  UsersRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isShowSidebarProfile, setIsShowSidebarProfile] =
    useState<boolean>(false);

  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);

  const handleToggleSidebar = () => {
    setIsShowSidebar((isShown) => !isShown);
  };

  const handleToggleSidebarProfile = () => {
    setIsShowSidebarProfile((isShown) => !isShown);
  };
  return (
    <>
      <div className="relative flex w-full min-h-screen bg-slate-200 overflow-x-hidden">
        {isShowSidebar && (
          <button
            type="button"
            aria-label="Tutup menu navigasi"
            className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
            onClick={() => setIsShowSidebar(false)}
          />
        )}
        <aside
          className={`fixed inset-y-0 left-0 z-50 h-screen ${isShowSidebar ? "translate-x-0" : "-translate-x-full"} bg-emerald-600 transition-transform duration-300 w-3/4 max-w-xs px-8 py-6 rounded-tr-xl rounded-br-xl lg:w-1/6 lg:max-w-none lg:translate-x-0`}
        >
          <div className="flex items-center justify-between gap-x-4">
            <div className="flex items-center gap-x-4">
              <School color="#f5f5f5" strokeWidth={1.5} />
              <h1 className="font-semibold text-slate-100 text-xl">
                Kampus Hub
              </h1>
            </div>
            <button
              type="button"
              onClick={handleToggleSidebar}
              aria-label="Tutup menu navigasi"
              className="cursor-pointer text-slate-100 lg:hidden"
            >
              <X />
            </button>
          </div>

          <section className="mt-8 mb-4">
            <ul className="flex flex-col gap-y-6">
              <li>
                <NavLink
                  to="/"
                  end
                  onClick={() => setIsShowSidebar(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-x-2 border-l-4 px-3 py-1.5 text-slate-100 transition-colors hover:bg-emerald-700/40 ${
                      isActive
                        ? "border-emerald-300 bg-emerald-700/40 font-medium"
                        : "border-transparent font-normal"
                    }`
                  }
                >
                  <LayoutDashboard strokeWidth={2} />
                  <span className="text-md">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/berita"
                  onClick={() => setIsShowSidebar(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-x-2 border-l-4 px-3 py-1.5 text-slate-100 transition-colors hover:bg-emerald-700/40 ${
                      isActive
                        ? "border-emerald-300 bg-emerald-700/40 font-medium"
                        : "border-transparent font-normal"
                    }`
                  }
                >
                  <Newspaper strokeWidth={1} />
                  <span className="text-md">Berita</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mahasiswa"
                  onClick={() => setIsShowSidebar(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-x-2 border-l-4 px-3 py-1.5 text-slate-100 transition-colors hover:bg-emerald-700/40 ${
                      isActive
                        ? "border-emerald-300 bg-emerald-700/40 font-medium"
                        : "border-transparent font-normal"
                    }`
                  }
                >
                  <UsersRound strokeWidth={1} />
                  <span className="text-md">Mahasiswa</span>
                </NavLink>
              </li>
            </ul>
          </section>
        </aside>
        <div className="min-w-0 flex-1 lg:ml-[16.666667%] lg:px-8 lg:py-6 px-4 py-6">
          <nav className="relative flex items-center gap-x-4 w-full">
            <button
              type="button"
              onClick={handleToggleSidebar}
              aria-label="Buka menu navigasi"
              aria-expanded={isShowSidebar}
              className="cursor-pointer text-slate-700 lg:hidden"
            >
              <Menu />
            </button>
            <input
              type="text"
              name="search-anything"
              id="search-anything"
              placeholder="Search Anything"
              className="bg-slate-100 px-4 py-2.5 w-full placeholder:text-xs rounded-full outline-none border border-slate-400/50 text-xs text-slate-600"
            />

            <div
              className={`block lg:hidden absolute right-0 top-16 z-50 w-1/2 px-4 pt-2 pb-8 rounded-lg bg-slate-100 shadow-lg transition-all duration-300 ${isShowSidebarProfile ? "translate-x-0" : "translate-x-full "}`}
            >
              <ul className="flex flex-col gap-y-5">
                <li className="flex items-center gap-x-4 cursor-pointer transition-all duration-150 hover:bg-slate-200/20 rounded-lg border-b-2 border-slate-200">
                  <div className="flex flex-col justify-center items-center gap-y-4 w-full h-24">
                    <div className="size-12 rounded-full overflow-hidden">
                      <img
                        className="block size-full object-cover"
                        src="/img/default-profile.jpg"
                        alt=""
                      />
                    </div>
                    <span className="text-[11px]">
                      Arjun Samudera Ahli Fikri
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-x-4 cursor-pointer transition-all duration-150 hover:bg-slate-200 rounded-lg">
                  <Mail size={18} />
                  <span className="text-sm">Pesan</span>
                </li>
                <li className="flex items-center gap-x-4 cursor-pointer transition-all duration-150 hover:bg-slate-200 rounded-lg">
                  <Bell size={18} />
                  <span className="text-sm">Notifikasi</span>
                </li>
                <li className="flex items-center gap-x-4 cursor-pointer transition-all duration-150 hover:bg-slate-200 rounded-lg">
                  <LogOut size={18} />
                  <span className="text-sm">Logout</span>
                </li>
              </ul>
            </div>

            <div
              onClick={handleToggleSidebarProfile}
              id="mobile-phone-menubar"
              className="hamburger-menu-wrapper lg:hidden"
            >
              <User />
            </div>

            <div className="w-1/3 hidden lg:flex items-center gap-x-2">
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
                  <div className="size-11 rounded-full overflow-hidden">
                    <img
                      className="block size-full object-cover"
                      src="/img/default-profile.jpg"
                      alt=""
                    />
                  </div>
                  <h1 className="text-sm font-normal">Arjun Samudera</h1>
                </div>
              </div>
            </div>
          </nav>
          <main className="py-4 overflow-hidden">{children}</main>
        </div>
      </div>
    </>
  );
}
