// src/hooks/UseCurrencyInfo.js
import { useEffect, useState } from "react";

function useCurrency(base) {
  const [data, setData] = useState({});

  useEffect(() => {
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setData(res[base] || {})) // ensure fallback
      .catch((err) => console.error("Currency fetch failed:", err));
  }, [base]);

  return data;
}

export default useCurrency;
