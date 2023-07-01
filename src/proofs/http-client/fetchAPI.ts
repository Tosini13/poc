export function fetchApi(url: string) {
  return async function () {
    return await fetch(url)
      .then((data) => data.json())
      .then((data) => {
        return { data };
      })
      .catch((e) => {
        return {
          error: {
            message: e.message,
          },
        };
      })
      .finally(() => console.log("finally"));
  };
}
