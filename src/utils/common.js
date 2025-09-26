export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

export const buildUrl = (url, params) => {
  let urlWidthParams = url;

  Object.entries(params).forEach(([key, value], i) => {
    const sign = !i ? "?" : "&";

    urlWidthParams += `${sign}${key}=${value}`;
  });

  return urlWidthParams;
};

export const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0);
