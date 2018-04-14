'use strict';
/* global $, api, store, bookmarkList */

$(document).ready(() => {
  bookmarkList.bindEvenHandlers();
  bookmarkList.render();

  api.getItems((items) => {
    items.forEach((item) => store.addItem(item));
    bookmarkList.render();
  });
});