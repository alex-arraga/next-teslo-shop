import { initialData } from "./seed";

interface abc {
  example: string
}

async function main() {
  console.log(initialData)
  console.log('Seed successfully executed')
}

(() => {
  if(process.env.NODE_ENV === 'production') return
  main()
})();