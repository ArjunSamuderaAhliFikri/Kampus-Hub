import { retrieveNewsData } from "../services/news.services";

export function useNewsPresenter() {
  const handleRetrieveNewsData = async () => {
    try {
      const newsData = await retrieveNewsData();

      console.log("News Data : ", newsData);
      return newsData;
    } catch (error) {
      console.error(error);
    }
  };

  return { handleRetrieveNewsData };
}
