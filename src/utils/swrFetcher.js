export async function fetcher(args) {
  const [url, body] = args;

  const options = {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
}

// swr example implmentation in components

/* const { data: bestSellingProduct } = useSWR(['api/v1/products/best-selling', { first: 1, language: selectedLanguage, sortKey: 'BEST_SELLING' }], fetcher, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
  }); */
