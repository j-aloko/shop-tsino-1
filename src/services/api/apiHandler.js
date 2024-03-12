export const handleErrors = (error, toast, defaultValue, rejectWithValue) => {
  const errorMessage = error?.message || 'Something went wrong';
  toast.error(errorMessage);
  return rejectWithValue(errorMessage || defaultValue);
};

export const fetchData = async (url, values) => {
  let body;
  if (values !== null) {
    body = JSON.stringify(values);
  }

  const response = await fetch(url, {
    body,
    cache: 'force-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    const error = new Error();
    error.status = response.status;

    const json = await response.json();
    error.message = json.message || response.statusText;

    throw error;
  }

  return response.json();
};
