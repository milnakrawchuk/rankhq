export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function absoluteUrl(pathname: string) {
  return `https://rankhq.co${pathname}`;
}
