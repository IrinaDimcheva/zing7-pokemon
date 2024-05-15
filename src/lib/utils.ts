export const generatePagination = (totalPages: number) => {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
};
