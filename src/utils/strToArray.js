module.exports = async function strToArray(strTags) {
  const arrTag = [];
  strTags
    .toLowerCase()
    .split(",")
    .map((item) => {
      const tag = item.trim();
      if (tag) arrTag.push(tag);
    });

  return arrTag;
};
