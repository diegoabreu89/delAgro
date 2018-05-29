
export function addPriceUnit(categories) {
  return categories.map((el) => {
    const unit = el.id < 11 ? 'por Kg' : 'por cabeza';
    return {
      ...el,
      unit,
    };
  });
}

export function getPriceUnit(categoryId) {
  return categoryId < 11 ? 'por Kg' : 'por cabeza';
}
