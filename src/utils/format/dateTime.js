export function dateToIsoDateTime(date) {
  if (!date || Number.isNaN(date.getTime())) {
    return '';
  }

  const copy = new Date(date);
  copy.setSeconds(0, 0);

  const pad = (part) => String(part).padStart(2, '0');

  return `${copy.getFullYear()}-${pad(copy.getMonth() + 1)}-${pad(copy.getDate())}T${pad(copy.getHours())}:${pad(copy.getMinutes())}:${pad(copy.getSeconds())}`;
}

export function getNowDate() {
  const now = new Date();
  now.setSeconds(0, 0);
  return now;
}
