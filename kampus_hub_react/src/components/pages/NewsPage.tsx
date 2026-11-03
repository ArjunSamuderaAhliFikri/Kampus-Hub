/** @format */

import { useEffect, useState } from "react";
import { useNewsPresenter } from "../../presenter/useNewsPresenter";
import { useSearchAnythingContext } from "../../context/useSearchAnythingContext";

import "../../styles/special_grid.css";
import type { NewsDataType } from "../../types/NewsType";

export default function NewsPage() {
  const [primaryNews, setPrimaryNews] = useState<NewsDataType[]>([]);
  const [otherNewsData, setOtherNewsData] = useState<NewsDataType[]>([]);

  const { searchValue, setSearchValue } = useSearchAnythingContext();
  const { handleRetrieveNewsData } = useNewsPresenter();

  useEffect(() => {
    const fetchNews = async () => {
      const currentData = await handleRetrieveNewsData();

      const currentPrimaryNews = currentData?.slice(0, 6) || [];
      const currentOtherNewsData =
        currentData?.slice(6, currentData.length) || [];

      setPrimaryNews(currentPrimaryNews);
      setOtherNewsData(currentOtherNewsData);
    };

    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = searchValue.toLowerCase().trim();

  const filteredPrimaryNews = primaryNews.filter((item) => {
    if (!query) return true;
    return (
      item.title.toLowerCase().includes(query) ||
      item.body.toLowerCase().includes(query)
    );
  });

  const filteredOtherNews = otherNewsData.filter((item) => {
    if (!query) return true;
    return (
      item.title.toLowerCase().includes(query) ||
      item.body.toLowerCase().includes(query)
    );
  });

  return (
    <section className="h-fit rounded-lg py-4 overflow-y-auto overflow-x-hidden">
      {searchValue.trim() && (
        <section className="mb-4 bg-emerald-50 text-emerald-900 border border-emerald-200 px-4 py-2.5 rounded-lg flex items-center justify-between text-sm shadow-xs">
          <span>
            Hasil pencarian berita untuk: <strong>"{searchValue}"</strong> (
            {filteredPrimaryNews.length + filteredOtherNews.length} berita
            ditemukan)
          </span>
          <button
            type="button"
            onClick={() => setSearchValue("")}
            className="text-xs bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 cursor-pointer transition-colors"
          >
            Reset
          </button>
        </section>
      )}

      <h1 className="font-semibold text-slate-900 text-lg mb-4">
        Pantau Berita Lagi Hangat
      </h1>

      <section id="carousel-container" className="w-full overflow-x-hidden">
        {searchValue.trim() && filteredPrimaryNews.length === 0 ? (
          <div className="p-6 text-center text-slate-500 bg-slate-100 rounded-lg">
            Tidak ada berita utama yang cocok dengan pencarian "{searchValue}".
          </div>
        ) : (
          <section id="grid-primary-news" className="grid-primary-news">
            <div className="w-72 lg:w-full relative lg:col-span-2 bg-slate-200/90 rounded-lg overflow-hidden cursor-pointer">
              <img
                className="block w-full h-full object-cover absolute inset-0"
                src="/img/images.jpg"
                alt="news"
              />

              <section
                id="title-news"
                className="absolute z-10 bottom-0 left-0 px-6 pb-6 bg-gradient-to-t from-slate-900 to-transparent w-full"
              >
                <h1 className="font-semibold text-lg text-slate-100/90">
                  {filteredPrimaryNews.length > 0 &&
                    filteredPrimaryNews[0]?.title.substring(0, 32)}
                </h1>
                <p className="text-sm text-slate-300">
                  {filteredPrimaryNews.length > 0 &&
                    filteredPrimaryNews[0]?.body.substring(0, 32)}
                  ...
                </p>
              </section>
            </div>
            <div className="w-72 lg:w-full relative bg-slate-200/90 rounded-lg overflow-hidden cursor-pointer">
              <img
                className="block w-full h-full object-cover absolute inset-0"
                src="/img/images.jpg"
                alt="news"
              />

              <section
                id="title-news"
                className="absolute z-10 bottom-0 left-0 px-6 pb-6 bg-gradient-to-t from-slate-900/60 to-transparent w-full"
              >
                <h1 className="font-semibold text-lg text-slate-100/90">
                  {filteredPrimaryNews.length > 1 &&
                    filteredPrimaryNews[1]?.title.substring(0, 32)}
                </h1>
                <p className="text-sm text-slate-300">
                  {filteredPrimaryNews.length > 1 &&
                    filteredPrimaryNews[1]?.body.substring(0, 32)}
                  ...
                </p>
              </section>
            </div>
            <div className="w-72 lg:w-full relative bg-slate-200/90 rounded-lg overflow-hidden cursor-pointer">
              <img
                className="block w-full h-full object-cover absolute inset-0"
                src="/img/images.jpg"
                alt="news"
              />

              <section
                id="title-news"
                className="absolute z-10 bottom-0 left-0 px-6 pb-6 bg-gradient-to-t from-slate-900/60 to-transparent w-full"
              >
                <h1 className="font-semibold text-lg text-slate-100/90">
                  {filteredPrimaryNews.length > 2 &&
                    filteredPrimaryNews[2]?.title.substring(0, 32)}
                </h1>
                <p className="text-sm text-slate-300">
                  {filteredPrimaryNews.length > 2 &&
                    filteredPrimaryNews[2]?.body.substring(0, 32)}
                  ...
                </p>
              </section>
            </div>
            <div className="w-72 lg:w-full relative bg-slate-200/90 rounded-lg overflow-hidden cursor-pointer">
              <img
                className="block w-full h-full object-cover absolute inset-0"
                src="/img/images.jpg"
                alt="news"
              />
              <section
                id="title-news"
                className="absolute z-10 bottom-0 left-0 px-6 pb-6 bg-gradient-to-t from-slate-900/60 to-transparent w-full"
              >
                <h1 className="font-semibold text-lg text-slate-100/90">
                  {filteredPrimaryNews.length > 3 &&
                    filteredPrimaryNews[3]?.title.substring(0, 32)}
                </h1>
                <p className="text-sm text-slate-300">
                  {filteredPrimaryNews.length > 3 &&
                    filteredPrimaryNews[3]?.body.substring(0, 32)}
                  ...
                </p>
              </section>
            </div>
            <div className="w-72 lg:w-full relative bg-slate-200/90 rounded-lg overflow-hidden cursor-pointer">
              <img
                className="block w-full h-full object-cover absolute inset-0"
                src="/img/images.jpg"
                alt="news"
              />

              <section
                id="title-news"
                className="absolute z-10 bottom-0 left-0 px-6 pb-6 bg-gradient-to-t from-slate-900/60 to-transparent w-full"
              >
                <h1 className="font-semibold text-lg text-slate-100/90">
                  {filteredPrimaryNews.length > 4 &&
                    filteredPrimaryNews[4]?.title.substring(0, 32)}
                </h1>
                <p className="text-sm text-slate-300">
                  {filteredPrimaryNews.length > 4 &&
                    filteredPrimaryNews[4]?.body.substring(0, 32)}
                  ...
                </p>
              </section>
            </div>
            <div className="w-72 lg:w-full relative bg-slate-200/90 rounded-lg overflow-hidden cursor-pointer lg:col-span-2">
              <img
                className="block w-full h-full object-cover absolute inset-0"
                src="/img/images.jpg"
                alt="news"
              />

              <section
                id="title-news"
                className="absolute z-10 bottom-0 left-0 px-6 pb-6 bg-gradient-to-t from-slate-900/60 to-transparent w-full"
              >
                <h1 className="font-semibold text-lg text-slate-100/90">
                  {filteredPrimaryNews.length > 5 &&
                    filteredPrimaryNews[5]?.title.substring(0, 32)}
                </h1>
                <p className="text-sm text-slate-300">
                  {filteredPrimaryNews.length > 5 &&
                    filteredPrimaryNews[5]?.body.substring(0, 32)}
                  ...
                </p>
              </section>
            </div>
          </section>
        )}
      </section>

      <section className="mt-6 md:w-full">
        <h1 className="font-semibold text-slate-900 text-lg mb-4">
          Berita Lainnya
        </h1>

        <ul className="flex flex-col items-center justify-center gap-y-3 bg-slate-200">
          {filteredOtherNews.length > 0 ? (
            filteredOtherNews.map((data: NewsDataType) => (
              <OtherNews key={data.id} otherNewsData={data} />
            ))
          ) : (
            <li className="p-4 text-center text-slate-500 w-full bg-slate-100 rounded-lg">
              {searchValue.trim()
                ? `Tidak ada berita lainnya yang cocok dengan pencarian "${searchValue}".`
                : "Tidak ada berita lainnya."}
            </li>
          )}
        </ul>
      </section>
    </section>
  );
}

type OtherNewsProps = {
  otherNewsData: NewsDataType;
};

function OtherNews({ otherNewsData }: OtherNewsProps) {
  return (
    <li className="relative w-full h-20 bg-slate-300 rounded-lg overflow-hidden">
      <span
        id="highlight"
        className="size-full absolute top-0 left-0 bg-gradient-to-r from-slate-900/90 to-transparent"
      />
      <div
        id="information-news"
        className="absolute top-1/2 -translate-y-1/2 right-0 z-10 px-8 w-full flex justify-between items-center"
      >
        <div className="flex flex-col gap-y-1">
          <h1 className="text-slate-100 font-medium text-md">
            {otherNewsData.title.substring(0, 20)}
          </h1>
          <p className="text-slate-300 text-xs">
            {otherNewsData.body.substring(0, 25)}
          </p>
        </div>

        <button
          type="button"
          className="text-slate-300 bg-slate-900/80 px-4 py-2 text-xs rounded-lg cursor-pointer text-md font-medium hover:bg-slate-800/50"
        >
          Baca Sekarang
        </button>
      </div>

      <img
        src="/img/images.jpg"
        alt={otherNewsData.title}
        className="size-full block object-cover"
      />
    </li>
  );
}
