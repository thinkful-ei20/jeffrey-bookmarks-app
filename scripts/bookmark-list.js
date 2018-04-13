const bookmarkList = (() => {
  const generateItemElement = (item) => {
    return `
    <li class="item-element js-item-element" data-item-id="${item.id}">
      <details>
        <summary>${item.title} ${(item.rating ? item.rating + " stars" : "No Rating")}</summary>
        <p>${(item.desc ? item.desc : "No Description")}</p>
        <a href="${item.url}" target="_blank">Visit Site</a>
        <button>Remove Bookmark</button>
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

  const handleCancelItemSubmit = () => {
    $('#js-bookmark-list-form').on("reset", ((event) => {
      $('.bookmark-add-controls').addClass('hidden');
    }));
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
        }
      );
      $('.bookmark-add-controls').addClass('hidden');
    });
  };

  const handleAddItemClicked = () => {
    $('.js-list-add').click((event) => {
      $('.bookmark-add-controls').removeClass('hidden');
      $('.js-bookmark-list-entry-title').empty();
      $('.js-bookmark-list-entry-url').empty();
      $('.js-bookmark-list-entry-title').focus();
    });
  };

  const bindEvenHandlers = () => {
    handleAddItemClicked();
    handleNewItemSubmit();
    handleCancelItemSubmit();
  };

  return {
    render,
    bindEvenHandlers,
  };

})();