export function validateCoords(coords) {
  const regExp = /^(\[?-?\d+\.\d{3,7},\s?-?\d+\.\d{3,7}\]?)$/;

  const result = regExp.test(coords);
  if (result) {
    const arr = coords.split(",");

    return {
      lat: arr[0].replace("[", ""),
      long: arr[1].trim().replace("]", ""),
    };
  } else {
    return false;
  }
}
