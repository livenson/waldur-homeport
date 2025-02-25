/**
 * Redirects to a URL with POST data by creating and submitting a form
 * @param url - The target URL to redirect to
 * @param data - The data to include in the POST request
 */
export const redirectPost = (
  url: string,
  data: Record<string, string>,
): void => {
  const form = document.createElement('form');
  document.body.appendChild(form);
  form.method = 'POST';
  form.action = url;
  for (const name in data) {
    if (Object.prototype.hasOwnProperty.call(data, name)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = data[name];
      form.appendChild(input);
    }
  }
  form.submit();
};
