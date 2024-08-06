import { CountriesData, CountriesNames } from "@/interfaces";

interface Parameters {
  value: number;
  country: CountriesNames;
  minFractionDigis?: number;
  maxFractionDigits?: number;
}

export const currencyFormat = ({ value, country, minFractionDigis = 2, maxFractionDigits = 2 }: Parameters) => {

  const currencyCountry = CountriesData.map((item) => {

    if (item.name === country) {

      return new Intl.NumberFormat(item.numberFormat, {
        style: "currency",
        currency: item.currency,
        minimumFractionDigits: minFractionDigis,
        maximumFractionDigits: maxFractionDigits
      }).format(value);
    }

  })

  return currencyCountry
}