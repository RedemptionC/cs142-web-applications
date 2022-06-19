"use strict";

function cs142MakeMultiFilter(originalArray) {
  let currentArray = [...originalArray];
  function arrayFilterer(filterCriteria, callback) {
    // If filterCriteria is not a function, the returned
    // function (arrayFilterer) should immediately return the
    // value of currentArray with no filtering performed.
    if (typeof filterCriteria !== "function") {
      return currentArray;
    }

    currentArray = currentArray.filter(filterCriteria);

    if (typeof callback === "function") {
      callback.call(originalArray, currentArray);
    }

    return arrayFilterer;
  }

  return arrayFilterer;
}
