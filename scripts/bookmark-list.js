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
        <button aria-label="Close Error" id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  };

  const generateItemElement = (item) => {
    console.log('`bookmarkList.generateItemElement` ran'); // eslint-disable-line no-console
    
    let itemTitle = `
    <h3>${item.title}</h3>
    `;

    let itemRating = '';
    for(let i = 0; i < 5; i++) {
      itemRating += `<span class="fa fa-star ${(item.rating > i ? 'checked' : '')}"></span>`;
    }
    if (!store.selectedIds.includes(item.id)) {
      return `
      <li class="item-element js-item-element card" data-item-id="${item.id}">
      ${itemTitle}
      ${itemRating}
      <button class="bookmark-item-expand js-item-expand" role="button">&darr;</button>
    </li>
    `;
    }
    else {
      if(store.editingId !== item.id) {
        return `
        <li class="item-element js-item-element card" data-item-id="${item.id}">
        ${itemTitle}
        <p>${(item.desc ? item.desc : 'No Description')}</p>
        <a href="${item.url}" target="_blank"><p>Visit Site</p></a>
        <button class="bookmark-item-delete js-item-delete" role="button">Delete</button>
        <button class="bookmark-item-edit js-item-edit" role="button">Edit</button>
        <button class="bookmark-item-collapse js-item-collapse" role="button">&uarr;</button>
        ${itemRating}
        </li>
        `;
      }
      else {
        return `
        <li class="item-element js-item-element card" data-item-id="${item.id}">
        ${itemTitle}
        <textarea class="bookmark-edit-item-desc js-edit-item-desc">${(item.desc ? item.desc : '')}</textarea>
        <select class="bookmark-edit-item-rating js-edit-item-rating" aria-label="Star Rating">
            <option value="5" ${(item.rating === 5 ? 'selected' : '')}>5 Stars</option>
            <option value="4" ${(item.rating === 4 ? 'selected' : '')}>4 Stars</option>
            <option value="3" ${(item.rating === 3 ? 'selected' : '')}>3 Stars</option>
            <option value="2" ${(item.rating === 2 ? 'selected' : '')}>2 Stars</option>
            <option value="1" ${(item.rating === 1 ? 'selected' : '')}>1 Stars</option>
          </select>
        <button class="bookmark-item-delete js-item-discard" role="button">Discard</button>
        <button class="bookmark-item-edit js-item-update" role="button">Update</button>
        </li>
        `;
      }
    }  
  };

  const generateBookmarkItemsString = (itemList) => {
    console.log('`bookmarkList.generateBookmarkItemsString` ran'); // eslint-disable-line no-console
    const items = itemList.map((item) => {
      if(!(item.rating >= store.getFilterMinimumRatingAbove())) {
        return '';
      }

      return generateItemElement(item);
    });
    
    return items.join('');
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
      $('.js-bookmark-list-entry-title').val('');
      $('.js-bookmark-list-entry-url').val('');
      $('.js-bookmark-list-entry-desc').val('');
      $('.js-bookmark-list-entry-rating').val(5);
      $('.js-bookmark-list-entry-title').focus();
    }
    else {
      $('.bookmark-add-controls').addClass('hidden');
      $('.bookmark-list-controls').removeClass('hidden');
      $('.js-list-rating').val(store.getFilterMinimumRatingAbove());
    }
    
    const bookmarkListItemsString = generateBookmarkItemsString(store.items);
    $('.js-bookmark-list').html(bookmarkListItemsString);
  };

  const handleCancelItemSubmit = () => {
    console.log('`bookmarkList.handleCancelItemSubmit` ran'); // eslint-disable-line no-console
    $('#js-bookmark-list-form').on('reset', (() => {
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
      const newItemRating = parseInt($('.js-bookmark-list-entry-rating').val());
      const newItemDesc = $('.js-bookmark-list-entry-desc').val();

      const newItemData = { title: newItemTitle, url: newItemUrl, rating: newItemRating };
      if(newItemDesc !== null) {
        newItemData.desc = newItemDesc;
      }
      
      api.createItem(newItemData,
        (newItem) => {
          store.addItem(newItem);
          store.setRenderMode(store.RENDER_MODE.default);
          store.setError(null);
          render();
          $('.js-list-add').focus();
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
    $('.js-list-add').click(() => {
      store.setRenderMode(store.RENDER_MODE.adding);
      render();
    });
  };

  const handleMinimumRatingChanged = () => {
    console.log('`bookmarkList.handleMinimumRatingChanged` ran'); // eslint-disable-line no-console
    $('.js-list-rating').on('change', () => {
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
    $('.js-bookmark-list').on('click', '.js-item-expand', (event) => {
      const id = getItemIdFromElement(event.currentTarget);
      if(store.selectedIds.includes(id)) {
        store.selectedIds.splice(store.selectedIds.indexOf(id), 1);
      }
      else {
        store.selectedIds.push(id);
      }
      render();
    });

    $('.js-bookmark-list').on('click', '.js-item-collapse', (event) => {
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
    $('.js-bookmark-list').on('click', '.js-item-edit', (event) => {
      const id = getItemIdFromElement(event.currentTarget);
      store.editingId = id;
      render();
    });
  };

  const handleDeleteItemClicked = () => {
    console.log('`bookmarkList.handleDeleteItemClicked` ran'); // eslint-disable-line no-console
    $('.js-bookmark-list').on('click', '.js-item-delete', (event) => {
      const id = getItemIdFromElement(event.currentTarget);
      api.deleteItem(id, () => {
        store.findAndDeleteItem(id);
        store.selectedIds.splice(store.selectedIds.indexOf(id), 1);
        render();
      });
    });
  };

  const handleDiscardItemClicked = () => {
    console.log('`bookmarkList.handleEditItemClicked` ran'); // eslint-disable-line no-console
    $('.js-bookmark-list').on('click', '.js-item-discard', (event) => {
      store.editingId = '';
      render();
    });
  };

  const handleUpdateItemClicked = () => {
    console.log('`bookmarkList.handleDeleteItemClicked` ran'); // eslint-disable-line no-console
    $('.js-bookmark-list').on('click', '.js-item-update', (event) => {
      const id = getItemIdFromElement(event.currentTarget);
      const updateItemDesc = $('.js-edit-item-desc').val();
      const updateItemRating = parseInt($('.js-edit-item-rating').val());
      const updateData = { desc: updateItemDesc, rating: updateItemRating };
      api.updateItem(id, updateData,
        () => {
          store.findAndUpdateItem(id, updateData);
          store.setError(null);
          store.editingId = '';
          render();
        },
        (err) => {
          store.setError(err);
          render();
        }
      );
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
    handleCancelItemSubmit();

    handleListItemClicked();
    handleEditItemClicked();
    handleDeleteItemClicked();
    handleUpdateItemClicked();
    handleDiscardItemClicked();
    
    handleCloseError();
  };

  return {
    render,
    bindEvenHandlers,
  };
})(jQuery);