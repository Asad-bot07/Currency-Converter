import { useId } from "react";

function Input({
  label,
  amount = "",
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "inr",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountId = useId();

  return (
    <div
      className={`bg-[#1f1f2e] p-5 rounded-xl text-sm flex gap-4 border border-[#2a2a40] shadow-xl ${className}`}
    >
      <div className="w-1/2">
        <label
          htmlFor={amountId}
          className="text-gray-300 font-semibold mb-2 inline-block"
        >
          {label}
        </label>
        <input
          className="outline-none w-full bg-[#2c2c40] text-white placeholder-gray-400 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#6C63FF] transition-all"
          id={amountId}
          type="number"
          placeholder="Enter amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            onAmountChange && onAmountChange(value === "" ? "" : Number(value));
          }}
        />
      </div>

      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-gray-300 font-semibold mb-2 w-full">Currency Type</p>
        <select
          className="rounded-md px-3 py-2 bg-[#2c2c40] text-white outline-none shadow-sm hover:bg-[#3a3a55] focus:ring-2 focus:ring-[#6C63FF] transition-all"
          disabled={currencyDisable}
          value={selectCurrency}
          onChange={(e) => {
            if (onCurrencyChange) {
              onCurrencyChange(e.target.value);
            }
          }}
        >
          {currencyOptions.map((curr) => (
            <option key={curr} value={curr}>
              {curr.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Input;
