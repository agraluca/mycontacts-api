export function validateParams(params, objectSchema) {
  const errors = [];

  for (let key in objectSchema) {
    if (!params.hasOwnProperty(key)) {
      errors.push({ error: `Field ${key} is required.` });
    }
  }
  return errors.length > 0 ? errors : null;
}
