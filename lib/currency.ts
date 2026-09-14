export const CURRENCY_OPTIONS = [
    { value: "BDT", label: "BDT (Bangladeshi Taka)", name: "Bangladeshi Taka", symbol: "৳" },
    { value: "USD", label: "USD (US Dollar)", name: "US Dollar", symbol: "$" },
];

export const currencySymbol = (currency: string) => CURRENCY_OPTIONS.find((c) => c.value === currency)?.symbol || "";
export const currencyName = (currency: string) => CURRENCY_OPTIONS.find((c) => c.value === currency)?.name || currency;

export const formatMoney = (n: number, currency: string = "BDT") => {
    const safe = Number.isFinite(n) ? n : 0;
    return `${currencySymbol(currency)} ${safe.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Bangladeshi digit grouping (e.g. 3800000 -> "38,00,000.00")
export const formatIndianGrouping = (n: number) => {
    const safe = Number.isFinite(n) ? n : 0;
    const [intPart, decPart] = Math.abs(safe).toFixed(2).split(".");
    let lastThree = intPart.slice(-3);
    const rest = intPart.slice(0, -3);
    if (rest) lastThree = `,${lastThree}`;
    const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    return `${safe < 0 ? "-" : ""}${grouped}${lastThree}.${decPart}`;
};

// Plain amount (no currency symbol) formatted per the document's numbering convention
export const formatDocNumber = (n: number, currency: string) =>
    currency === "BDT" ? formatIndianGrouping(n) : (Number.isFinite(n) ? n : 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
