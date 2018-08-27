functions = {};

functions.formatDate = function(d) {
  var months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November",
                "December"];
  var formatted = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  return formatted;
}

functions.sortByPubDate = function(objectsList, oldestToNewest) {

  function compareDateOldestToNewest(a,b) {
    if (a.pub_date > b.pub_date) return 1;
    if (a.pub_date == b.pub_date) return 0;
    if (a.pub_date < b.pub_date) return -1;
  }
  function compareDateNewestToOldest(a,b) {
    if (a.pub_date > b.pub_date) return -1;
    if (a.pub_date == b.pub_date) return 0;
    if (a.pub_date < b.pub_date) return 1;
  }

  if (oldestToNewest) {
    objectsList.sort(compareDateOldestToNewest);
  } else {
    objectsList.sort(compareDateNewestToOldest);
  }

}

module.exports = functions;
