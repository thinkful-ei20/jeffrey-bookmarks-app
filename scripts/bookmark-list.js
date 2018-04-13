const bookmarkList = (() => {
  const generateItemElement = (item) => {
    return `
    <li class="js-item-element" data-item-id="${item.id}">
      <details>
        <summary>${item.title} ${item.rating} stars</summary>
        <p>${item.desc}</p>
        <a href="${item.url}" target="_blank">Visit Site</a>
      </details>
    </li>
    `;
  };

  const generateBookmarkItemsString = (bookmarkList) => {
    const items = store.items.map((item) => {
      return generateItemElement(item);
    });
    
    return items.join("");
  };

  const render = () => {
    console.log("`render` ran");
    const bookmarkListItemsString = generateBookmarkItemsString(store.items);
    $('.js-bookmark-list').html(bookmarkListItemsString);
  };

  const handleNewItemSubmit = () => {
    $('#js-bookmark-list-form').submit((event) => {
      event.preventDefault();
      const newItemTitle = $('.js-bookmark-list-entry-title').val();
      const newItemUrl = $('.js-bookmark-list-entry-url').val();
      api.createItem({title: newItemTitle, url: newItemUrl},
        (newItem) => {
          store.addItem(newItem);
          render();
        },
        (err) => {
          store.setError(err);
          render();
        });
    });
  };

  const handleAddItemClicked = () => {
    $('.js-list-add').click((event) => {
      console.log(event);
    });
  };

  const bindEvenHandlers = () => {
    handleAddItemClicked();
    handleNewItemSubmit();
  };

  return {
    render,
    bindEvenHandlers,
  };

})();