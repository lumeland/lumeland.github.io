export const url = "/search.json";

export default function ({ search }, { url }) {
  const result = [];

  for (const { data } of search.pages("url!=/")) {
    result.push({
      label: data.title,
      search: `${data.title} ${data.description} ${data.section}`,
      value: url(data.url),
    });
  }

  return JSON.stringify(result);
}
