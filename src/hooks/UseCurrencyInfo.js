import { useEffect, useState } from "react";

function useCurrency(info) {
  const [data, setData] = useState({});

  useEffect(() => {
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${info}.json`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res && res[info]) {
          setData(res[info]);
        } else {
          setData({});
          console.error(`Currency data for "${info}" not found in API response.`);
        }
      })
      .catch((err) => console.error("Currency API fetch error:", err));
  }, [info]);

  return data;
}

export default useCurrency;
