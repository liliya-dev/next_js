export const getPhotoUrl = (url, size) => {
  const photoUrl = url.replace('{size}', size)
  return photoUrl
}