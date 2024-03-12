export function getAverageRating(metafields) {
  let averageRating = null;

  if (metafields && metafields?.length > 0) {
    const ratingMetafield = metafields.find((metafield) => metafield?.key === 'rating');
    if (ratingMetafield) {
      averageRating = +ratingMetafield.value;
    }
  }

  return averageRating;
}
