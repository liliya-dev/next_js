export const formatDate = (value: number) => {
  const date = new Date(value)
  const month = `${date.getMonth() + 1}`.length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
  const day = `${date.getDate()}`.length === 1 ? `0${date.getDate()}` : `${date.getDate()}`;
  const year = date.getFullYear();

  return [year, month, day].join('-');
}