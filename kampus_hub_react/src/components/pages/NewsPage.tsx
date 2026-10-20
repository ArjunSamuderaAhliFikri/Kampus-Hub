/** @format */

import { useEffect, useState } from "react";
import { useNewsPresenter } from "../../presenter/useNewsPresenter";

import "../../styles/special_grid.css";
import type { NewsDataType } from "../../types/NewsType";

export default function NewsPage() {
  const [newsData, setNewsData] = useState<NewsDataType[] | []>([]);
  const [primaryNews, setPrimaryNews] = useState<NewsDataType[] | []>([]);
  const [otherNewsData, setOtherNewsData] = useState<NewsDataType[] | []>([]);

  const { handleRetrieveNewsData } = useNewsPresenter();

  useEffect(() => {
    const fetchNews = async () => {
      const currentData = await handleRetrieveNewsData();

      console.log("Current Data : ", currentData);

      const currentPrimaryNews = currentData?.slice(0, 7);
      const currentOtherNewsData = currentData?.slice(7, currentData.length);

      setPrimaryNews(currentPrimaryNews);
      setOtherNewsData(currentOtherNewsData);
    };

    fetchNews();
  }, []);

  useEffect(() => {
    console.log("Primary News :", primaryNews);
    console.log("Others News :", otherNewsData);
  }, [primaryNews, otherNewsData]);

  return (
    // <h1>test</h1>
    <section className="rounded-lg bg-slate-100 p-6 overflow-y-auto">
      <h1 className="font-semibold text-slate-900 text-lg mb-4">
        Pantau Berita Lagi Hangat
      </h1>
      <section id="grid-primary-news" className="grid-primary-news">
        <div className="relative col-span-2 bg-slate-200/90 rounded-lg overflow-hidden cursor-pointer">
          <img
            className="block w-full h-full object-cover absolute inset-0"
            src="/img/images.jpg"
          />

          <section
            id="title-news"
            className="absolute z-10 bottom-0 left-0 px-6 pb-6 bg-gradient-to-t from-slate-900 to-transparent w-full"
          >
            <h1 className="font-semibold text-lg text-slate-100/90">
              {primaryNews.length > 0 && primaryNews[0]?.title.substring(0, 32)}
            </h1>
            <p className="text-sm text-slate-300">
              {primaryNews.length > 0 && primaryNews[0]?.body.substring(0, 32)}
              ...
            </p>
          </section>
        </div>
        <div className="relative bg-slate-200/90 rounded-lg overflow-hidden cursor-pointer">
          <img
            className="block w-full h-full object-cover absolute inset-0"
            src="/img/images.jpg"
          />

          <section
            id="title-news"
            className="absolute z-10 bottom-0 left-0 px-6 pb-6 bg-gradient-to-t from-slate-900/60 to-transparent w-full"
          >
            <h1 className="font-semibold text-lg text-slate-100/90">
              {primaryNews.length > 0 && primaryNews[1]?.title.substring(0, 32)}
            </h1>
            <p className="text-sm text-slate-300">
              {primaryNews.length > 0 && primaryNews[1]?.body.substring(0, 32)}
              ...
            </p>
          </section>
        </div>
        <div className="relative bg-slate-200/90 rounded-lg overflow-hidden cursor-pointer">
          <img
            className="block w-full h-full object-cover absolute inset-0"
            src="/img/images.jpg"
          />

          <section
            id="title-news"
            className="absolute z-10 bottom-0 left-0 px-6 pb-6 bg-gradient-to-t from-slate-900/60 to-transparent w-full"
          >
            <h1 className="font-semibold text-lg text-slate-100/90">
              {primaryNews.length > 0 && primaryNews[2]?.title.substring(0, 32)}
            </h1>
            <p className="text-sm text-slate-300">
              {primaryNews.length > 0 && primaryNews[2]?.body.substring(0, 32)}
              ...
            </p>
          </section>
        </div>
        <div className="relative bg-slate-200/90 rounded-lg overflow-hidden cursor-pointer">
          <img
            className="block w-full h-full object-cover absolute inset-0"
            src="/img/images.jpg"
          />
          <section
            id="title-news"
            className="absolute z-10 bottom-0 left-0 px-6 pb-6 bg-gradient-to-t from-slate-900/60 to-transparent w-full"
          >
            <h1 className="font-semibold text-lg text-slate-100/90">
              {primaryNews.length > 0 && primaryNews[3]?.title.substring(0, 32)}
            </h1>
            <p className="text-sm text-slate-300">
              {primaryNews.length > 0 && primaryNews[3]?.body.substring(0, 32)}
              ...
            </p>
          </section>
        </div>
        <div className="relative bg-slate-200/90 rounded-lg overflow-hidden cursor-pointer">
          <img
            className="block w-full h-full object-cover absolute inset-0"
            src="/img/images.jpg"
          />

          <section
            id="title-news"
            className="absolute z-10 bottom-0 left-0 px-6 pb-6 bg-gradient-to-t from-slate-900/60 to-transparent w-full"
          >
            <h1 className="font-semibold text-lg text-slate-100/90">
              {primaryNews.length > 0 && primaryNews[4]?.title.substring(0, 32)}
            </h1>
            <p className="text-sm text-slate-300">
              {primaryNews.length > 0 && primaryNews[4]?.body.substring(0, 32)}
              ...
            </p>
          </section>
        </div>
        <div className="relative bg-slate-200/90 rounded-lg overflow-hidden cursor-pointer col-span-2">
          <img
            className="block w-full h-full object-cover absolute inset-0"
            src="/img/images.jpg"
          />

          <section
            id="title-news"
            className="absolute z-10 bottom-0 left-0 px-6 pb-6 bg-gradient-to-t from-slate-900/60 to-transparent w-full"
          >
            <h1 className="font-semibold text-lg text-slate-100/90">
              {primaryNews.length > 0 && primaryNews[5]?.title.substring(0, 32)}
            </h1>
            <p className="text-sm text-slate-300">
              {primaryNews.length > 0 && primaryNews[5]?.body.substring(0, 32)}
              ...
            </p>
          </section>
        </div>
      </section>

      <section className="mt-6">
        <h1 className="font-semibold text-slate-900 text-lg mb-4">
          Berita Lainnya
        </h1>

        <ul className="w-full flex flex-col items-center gap-y-3 bg-slate-200">
          {otherNewsData.length > 0 &&
            otherNewsData.map((data: NewsDataType) => (
              <OtherNews key={data.id} otherNewsData={data} />
            ))}
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
    <>
      <li className="relative w-full h-20 bg-slate-300 rounded-lg overflow-hidden">
        <span
          id="highlight"
          className="size-full absolute top-0 left-0 bg-gradient-to-r from-slate-900/90 to-transparent"
        ></span>
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

        <img src="/img/images.jpg" className="size-full block object-cover" />
      </li>
    </>
  );
}
