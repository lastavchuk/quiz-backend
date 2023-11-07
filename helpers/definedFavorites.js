function definedFavorites(arr, favorites) {
  return arr.map(el => {
    const newEl = JSON.parse(JSON.stringify(el));
    const isFavorite = favorites.includes(newEl._id);
    return { ...newEl, isFavorite };
  });
}

module.exports = definedFavorites;
