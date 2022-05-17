export default function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/`;
  const fields = `?fields=name,flags,capital,population,languages,currencies`;

  return fetch(`${url}${name}${fields}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};



