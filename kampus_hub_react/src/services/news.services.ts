const BASE_URL = import.meta.env.VITE_BASE_URL;

async function retrieveNewsData() {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/posts`, config);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export { retrieveNewsData };
