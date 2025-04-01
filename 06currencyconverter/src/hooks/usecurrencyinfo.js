import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://cors-anywhere.herokuapp.com/https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD`)


            .then((res) => res.json())
            .then((res) => setData(res[currency]))
            .catch((error) => console.error("Error fetching currency data:", error));
    }, [currency]);

    return data
}
export default useCurrencyInfo;