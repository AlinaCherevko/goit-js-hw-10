const URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  const searchParams = new URLSearchParams({
    fields: name,
    capital,
    population,
    flags,
    languages,
  });

  return fetch(`${URL}${name}?${searchParams}`).then(response => {
    if (response.ok) {
      console.log(response);
      return response.json();
    }
    throw new Error('ooops');
  });
}
