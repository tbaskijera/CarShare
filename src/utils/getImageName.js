export const getImageName = (uri) => {
  return uri.split("/").pop();
};
