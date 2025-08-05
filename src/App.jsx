import { useState, useEffect } from "react";
import { Input } from "./Components";
import useCurrency from "./hooks/UseCurrencyInfo";


function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("inr");
  const [to, setTo] = useState("usd");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const currencyInfo = useCurrency(from);
  const diffCurr = Object.keys(currencyInfo || {});

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
    setToastMessage(
      `Currency swapped: ${to.toUpperCase()} → ${from.toUpperCase()}`
    );
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const convert = () => {
    const rate = currencyInfo[to];
    if (rate) {
      setConvertedAmount((amount * rate).toFixed(2));
    }
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-[#1f1f2e] relative before:absolute before:inset-0 before:bg-black/60 before:backdrop-blur-md before:z-0">
      {showToast && (
        <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-bounce z-50">
          ✅ {toastMessage}
        </div>
      )}

      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-black/30 shadow-2xl z-10 shadow-white/20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <Input
                label="From"
                amount={amount}
                currencyOptions={diffCurr}
                selectCurrency={from}
                onCurrencyChange={(value) => setFrom(value)}
                onAmountChange={(value) => setAmount(value)}
              />
            </div>

            <div className="relative w-full h-0.5 my-4">
              <button
                type="button"
                onClick={swap}
                className="bg-[#00FFF7] hover:bg-[#00d5d0] absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-black rounded-lg text-black px-4 py-2 transition-transform hover:rotate-180 duration-300"
              >
                🔁 Swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <Input
                label="To"
                amount={convertedAmount}
                currencyOptions={diffCurr}
                selectCurrency={to}
                onCurrencyChange={(value) => setTo(value)}
                amountDisable
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6C63FF] hover:bg-[#574de0] text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
