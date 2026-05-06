export const shuffle = <T>(arr: T[]): T[] =>
  [...arr].sort(() => 0.5 - Math.random());

type UrlParamPrimitive = string | number | boolean;

export const buildUrl = (
  url: string,
  params: Record<string, UrlParamPrimitive | null | undefined>,
): string => {
  let urlWidthParams = url;

  Object.entries(params).forEach(([key, value], i) => {
    if (value === undefined || value === null) return;
    const sign = !i ? "?" : "&";

    urlWidthParams += `${sign}${key}=${value}`;
  });

  return urlWidthParams;
};

export const sumBy = (arr: number[]): number =>
  arr.reduce((prev, cur) => prev + cur, 0);
