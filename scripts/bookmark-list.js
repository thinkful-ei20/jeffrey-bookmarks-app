'use strict';
/* global jQuery, api, store */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (($) => {
  const generateError = (err) => {
    console.log('`bookmarkList.generateError` ran'); // eslint-disable-line no-console
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
    console.log('`bookmarkList.generateItemElement` ran'); // eslint-disable-line no-console
    let itemRating = '';
    for(let i = 1; i <= 5; i++) {
      itemRating += `<span class="fa fa-star ${(item.rating >= i ? 'checked' : '')}"></span>`;
    }

    let itemView = '';
    if(store.selectedIds.includes(item.id)) {
      itemView += `<p>${(item.desc ? item.desc : "No Description")}</p>`;
      itemView += `<a href="${item.url}" target="_blank"><p>Visit Site</p></a>`;
      itemView += `<button class="bookmark-item-delete js-item-delete">Remove Bookmark</button>`;
    }

    return `
    <li class="item-element js-item-element" data-item-id="${item.id}">
      <div class="item-element-container">
        <h2>${item.title}</h2>
        ${itemView}
        ${itemRating}
      </div>
    </li>
    `;
  };

  const generateBookmarkItemsString = (itemList) => {
    console.log('`bookmarkList.generateBookmarkItemsString` ran'); // eslint-disable-line no-console
    const items = itemList.map((item) => {
      if(!(item.rating >= store.getFilterMinimumRatingAbove())) {
        return '';
      }

      return generateItemElement(item);
    });
    
    return items.join("");
  };

  const render = () => {
    console.log('`RENDER` ran'); // eslint-disable-line no-console
    console.log(store); // eslint-disable-line no-console

    if (store.hasError()) {
      const el = generateError(store.getError());
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }

    if(store.getRenderMode() === store.RENDER_MODE.adding) {
      $('.bookmark-list-controls').addClass('hidden');
      $('.bookmark-add-controls').removeClass('hidden');
      $('.js-bookmark-list-entry-title').val("");
      $('.js-bookmark-list-entry-url').val("");
      $('.js-bookmark-list-entry-title').focus();
    }
    else {
      $('.bookmark-add-controls').addClass('hidden');
      $('.bookmark-list-controls').removeClass('hidden');
      $('.js-list-rating').val(store.getFilterMinimumRatingAbove());
    }
    
    const bookmarkListItemsString = generateBookmarkItemsString(store.getItems());
    $('.js-bookmark-list').html(bookmarkListItemsString);
  };

  const handleCancelItemSubmit = () => {
    console.log('`bookmarkList.handleCancelItemSubmit` ran'); // eslint-disable-line no-console
    console.log('`render` ran'); // eslint-disable-line no-console
    $('#js-bookmark-list-form').on("reset", ((event) => {
      store.setRenderMode(store.RENDER_MODE.default);
      store.setError(null);
      render();
    }));
  };

  const handleNewItemSubmit = () => {
    console.log('`bookmarkList.handleNewItemSubmit` ran'); // eslint-disable-line no-console
    $('#js-bookmark-list-form').submit((event) => {
      event.preventDefault();
      const newItemTitle = $('.js-bookmark-list-entry-title').val();
      const newItemUrl = $('.js-bookmark-list-entry-url').val();
      api.createItem({title: newItemTitle, url: newItemUrl},
        (newItem) => {
          store.addItem(newItem);
          store.setRenderMode(store.RENDER_MODE.default);
          store.setError(null);
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
    console.log('`bookmarkList.handleAddItemClicked` ran'); // eslint-disable-line no-console
    $('.js-list-add').click((event) => {
      store.setRenderMode(store.RENDER_MODE.adding);
      render();
    });
  };

  const handleMinimumRatingChanged = () => {
    console.log('`bookmarkList.handleMinimumRatingChanged` ran'); // eslint-disable-line no-console
    $('.js-list-rating').on('change', (event) => {
      const rating = parseInt($('.js-list-rating').val());
      store.setFilterMinimumRatingAbove(rating);
      render();
    });
  };

  function getItemIdFromElement(item) {
    console.log('`bookmarkList.getItemIdFromElement` ran'); // eslint-disable-line no-console
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }

  const handleListItemClicked = () => {
    console.log('`bookmarkList.handleListItemClicked` ran'); // eslint-disable-line no-console
    $('.js-bookmark-list').on('click', '.js-item-element', event => {
      const id = getItemIdFromElement(event.currentTarget);
      if(store.selectedIds.includes(id)) {
        store.selectedIds.splice(store.selectedIds.indexOf(id), 1);
      }
      else {
        store.selectedIds.push(id);
      }
      render();
    });
  };

  const handleEditItemClicked = () => {
    console.log('`bookmarkList.handleEditItemClicked` ran'); // eslint-disable-line no-console
    $('.js-bookmark-list').on('click', '.js-item-edit', event => {
      const id = getItemIdFromElement(event.currentTarget);
      store.setSelectedId(id);
      render();
    });
  };

  const handleCancelEditItemSubmit = () => {
    console.log('`bookmarkList.handleCancelEditItemSubmit` ran'); // eslint-disable-line no-console
    $('.js-bookmark-list').on("reset", ((event) => {
      store.setSelectedId('');
      store.setError(null);
      render();
    }));
  };

  const handleEditItemSubmit = () => {
    console.log('`bookmarkList.handleEditItemSubmit` ran'); // eslint-disable-line no-console
    $('.js-bookmark-list').on('submit', '.js-edit-item', (event) => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const itemTitle = $('.js-bookmark-item-title').val();
      const itemUrl = $('.js-bookmark-item-url').val();
      const itemRating = $('.js-bookmark-item-rating').val();
      const itemDesc = $('.js-bookmark-item-desc').val();
      const itemData = { title: itemTitle, url: itemUrl};
      if(itemRating > 0)
        itemData.rating = itemRating;
      if(itemDesc.length > 0)
        itemData.desc = itemDesc;

      api.updateItem(id, itemData,
        (response) => {
          store.findAndUpdateItem(id, itemData);
          store.setSelectedId('');
          render();
        },
        (err) => {
          store.setError(err);
          render();
        });
    });
  };

  const handleDeleteItemClicked = () => {
    console.log('`bookmarkList.handleDeleteItemClicked` ran'); // eslint-disable-line no-console
    $('.js-bookmark-list').on('click', '.js-item-delete', event => {
      const id = getItemIdFromElement(event.currentTarget);
      api.deleteItem(id, () => {
        store.findAndDeleteItem(id);
        store.setSelectedId('');
        render();
      });
    });
  };

  const handleCloseError = () => {
    console.log('`bookmarkList.handleCloseError` ran'); // eslint-disable-line no-console
    $('.error-container').on('click', '#cancel-error', () => {
      store.setError(null);
      render();
    });
  };

  const bindEvenHandlers = () => {
    console.log('`bookmarkList.bindEvenHandlers` ran'); // eslint-disable-line no-console
    handleAddItemClicked();
    handleMinimumRatingChanged();
    handleNewItemSubmit();
    handleEditItemSubmit();
    handleCancelEditItemSubmit();
    handleCancelItemSubmit();
    handleListItemClicked();
    handleEditItemClicked();
    handleDeleteItemClicked();
    handleCloseError();    
  };

  return {
    render,
    bindEvenHandlers,
  };

})(jQuery);