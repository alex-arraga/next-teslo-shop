// [1, 2, 3, 4, 5, 6 ,7]
// [1, ..., 11, 12, 13, ... 49, 50]
// [1, 2, 3, ... ,48, 49, 50]

export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {

  // Si el numero total de paginas es <= 7 mostramos ...
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)  // output: [1, 2, 3, 4, 5, 6, 7]
  }

  // Si la pagina actual se encuentra entre las primeras 3
  // mostramos las primeras 3 paginas, puntos suspensivos, y las ultimas 2
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]   // output: [1, 2, 3, '...', 49, 50]
  }

  // Si la pagina actual esta entre las ultimas 3 paginas
  // mostramos las primeras 2, y las ultimas 3
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]    // output: [1, 2, '...', 48, 49, 50]
  }

  // Si la pagina esta en un lugar medio, mostramos la primer pagina, puntos suspensivos, pagina actual y vecinos
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ]
}