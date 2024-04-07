const querySearch = (req, _, next) => {
  req.searchData = function (data, queries) {
    let store = [];
    for (let videoData of data) {
      let counter = 0;
      for (let key in queries) {
        if(key == "video_title" && videoData[key].toLowerCase() == queries[key].toLowerCase() ) counter ++;
        else if(videoData[key]== queries[key]) counter ++
      }
      if (Object.keys(queries).length == counter) store.push(videoData);
    }
    return store;
  };
  return next()
};

module.exports = {querySearch}