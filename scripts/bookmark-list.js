const bookmarkList = (() => {
  const generateError = (err) => {
    let message = '';
    if (err.responseJSON && err.responseJSON.message) {
      message = err.responseJSON.message;
    } else {
      message = `${err.code} Server Error`;
    }

    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  };

  const generateItemElement = (item) => {
    return `
    <li class="item-element js-item-element" data-item-id="${item.id}">
      <details>
        <summary>${item.title} ${(item.rating ? item.rating + " stars" : "No Rating")}</summary>
        <p>${(item.desc ? item.desc : "No Description")}</p>
        <a href="${item.url}" target="_blank">Visit Site</a>
        <button class="bookmark-item-delete js-item-delete">Remove Bookmark</button>
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
    if (store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }

    if (store.adding) {
      console.log("store is adding");
      $('.bookmark-add-controls').removeClass('hidden');
      $('.js-bookmark-list-entry-title').val("");
      $('.js-bookmark-list-entry-url').val("");
      $('.js-bookmark-list-entry-title').focus();
    }
    else {
      console.log("store is NOT adding");
      $('.bookmark-add-controls').addClass('hidden');
    }
    
    console.log("`render` ran");
    const bookmarkListItemsString = generateBookmarkItemsString(store.items);
    $('.js-bookmark-list').html(bookmarkListItemsString);
  };

  const handleCancelItemSubmit = () => {
    $('#js-bookmark-list-form').on("reset", ((event) => {
      store.setAdding(false);
      render();      
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
          $('.bookmark-add-controls').addClass('hidden');
          render();
        },
        (err) => {
          store.setError(err);
          render();
        }
      );
    });
  };

  const handleAddItemClicked = () => {
    $('.js-list-add').click((event) => {
      store.setAdding(true);
      render();
    });
  };

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }

  const handleDeleteItemClicked = () => {
    $('.js-bookmark-list').on('click', '.js-item-delete', event => {
      const id = getItemIdFromElement(event.currentTarget);
      api.deleteItem(id, () => {
        store.findAndDelete(id);
        render();
      });
    });
  };

  const handleCloseError = () => {
    $('.error-container').on('click', '#cancel-error', () => {
      store.setError(null);
      render();
    });
  };

  const bindEvenHandlers = () => {
    handleAddItemClicked();
    handleNewItemSubmit();
    handleCancelItemSubmit();
    handleDeleteItemClicked();
    handleCloseError();
  };

  return {
    render,
    bindEvenHandlers,
  };

})();