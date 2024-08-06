import { CountriesData, CountriesNames } from "@/interfaces";

export const currencyFormat = (value: number, country: CountriesNames) => {

  const currencyCountry = CountriesData.map((item) => {

    if (item.name === country) {

      return new Intl.NumberFormat(item.numberFormat, {
        style: "currency",
        currency: item.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    }

  })

  return currencyCountry
}