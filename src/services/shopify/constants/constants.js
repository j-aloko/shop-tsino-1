export const defaultFilter = {
  available_for_sale: true,
  price_max: null,
  price_min: null,
  product_type: null,
};

export const defaultSort = (ready, translate) => ({
  reverse: false,
  slug: 'title-asc',
  sortKey: 'TITLE',
  title: 'Alphabetically, A-Z',
  translatedTitle: `${ready ? translate('collections.sortOptionsTitle.titleAsc') : 'Alphabetically, A-Z'}`,
});

export const sorting = (ready, translate) => [
  {
    reverse: true,
    slug: 'latest-desc',
    sortKey: 'CREATED_AT',
    title: 'Latest arrivals',
    translatedTitle: `${ready ? translate('collections.sortOptionsTitle.latestDesc') : 'Latest arrivals'}`,
  },
  {
    reverse: false,
    slug: 'trending-desc',
    sortKey: 'BEST_SELLING',
    title: 'Best selling',
    translatedTitle: `${ready ? translate('collections.sortOptionsTitle.trendingDesc') : 'Best selling'}`,
  },
  {
    reverse: false,
    slug: 'title-asc',
    sortKey: 'TITLE',
    title: 'Alphabetically, A-Z',
    translatedTitle: `${ready ? translate('collections.sortOptionsTitle.titleAsc') : 'Alphabetically, A-Z'}`,
  },
  {
    reverse: true,
    slug: 'title-desc',
    sortKey: 'TITLE',
    title: 'Alphabetically, Z-A',
    translatedTitle: `${ready ? translate('collections.sortOptionsTitle.titleDesc') : 'Alphabetically, Z-A'}`,
  },
  {
    reverse: false,
    slug: 'price-asc',
    sortKey: 'PRICE',
    title: 'Price, Low to high',
    translatedTitle: `${ready ? translate('collections.sortOptionsTitle.priceAsc') : 'Price, Low to high'}`,
  },
  {
    reverse: true,
    slug: 'price-desc',
    sortKey: 'PRICE',
    title: 'Price, High to low',
    translatedTitle: `${ready ? translate('collections.sortOptionsTitle.priceDesc') : 'Price, High to low'}`,
  },
  {
    reverse: false,
    slug: 'date-asc',
    sortKey: 'CREATED_AT',
    title: 'Date, old to new',
    translatedTitle: `${ready ? translate('collections.sortOptionsTitle.dateAsc') : 'Date, old to new'}`,
  },
  {
    reverse: true,
    slug: 'date-desc',
    sortKey: 'CREATED_AT',
    title: 'Date, new to old',
    translatedTitle: `${ready ? translate('collections.sortOptionsTitle.dateDesc') : 'Date, new to old'}`,
  },
];

export const TAGS = {
  cart: 'cart',
  collections: 'collections',
  products: 'products',
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
