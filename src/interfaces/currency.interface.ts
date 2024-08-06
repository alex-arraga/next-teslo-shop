export interface Countries {
  name: CountriesNames,
  currency: CurrencyTypes
  numberFormat: NumberFormat
}

export type CountriesNames = "Argentina" | "United States" | "United Kingdom"
export type CurrencyTypes = "ARS" | "USD" | "GBP"
export type NumberFormat = "es-AR" | "en-US" | "en-GB"


const Argentina: Countries = {
  name: "Argentina",
  currency: "ARS",
  numberFormat: "es-AR"
}

const USA: Countries = {
  name: "United States",
  currency: "USD",
  numberFormat: "en-US"
}

const UK: Countries = {
  name: "United Kingdom",
  currency: "GBP",
  numberFormat: "en-GB"
}

export const CountriesData: Countries[] = [Argentina, USA, UK]