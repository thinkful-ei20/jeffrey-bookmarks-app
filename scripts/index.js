$(document).ready(() => {
  bookmarkList.bindEvenHandlers();
  bookmarkList.render();

  api.getItems((items) => {
    items.forEach((item) => store.insert(item));
    bookmarkList.render();
  });
});