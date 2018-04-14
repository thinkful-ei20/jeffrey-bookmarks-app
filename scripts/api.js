'use strict';
/* global jQuery */

// eslint-disable-next-line no-unused-vars
const api = (($) => { 
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/';
  const USERNAME = 'jeffrey';
  const ENDPOINT = '/bookmarks';
  const API_URL = `${BASE_URL}${USERNAME}${ENDPOINT}`;
  const CONTENT_TYPE = 'application/json';
  const DATA_TYPE = 'json';

  let isInitialized = false;

  const getItems = (callback) => {
    console.log('`api.getItems` ran'); // eslint-disable-line no-console
    doWork({
      url: API_URL,
      success: callback,
    });
  };

  const createItem = (item, onSuccess, onError) => {
    console.log('`api.createItem` ran'); // eslint-disable-line no-console
    doWork({
      url: API_URL,
      method: 'POST',
      data: JSON.stringify(item),
      success: onSuccess,
      error: onError,
    });
  };

  const updateItem = (id, updateData, onSuccess, onError) => {
    console.log('`api.updateItem` ran'); // eslint-disable-line no-console
    doWork({
      url: `${API_URL}/${id}`,
      method: 'PATCH',
      data: JSON.stringify(updateData),
      success: onSuccess,
      error: onError,
    });
  };

  const deleteItem = (id, onSuccess, onError) => {
    console.log('`api.deleteItem` ran'); // eslint-disable-line no-console
    doWork({
      url: `${API_URL}/${id}`,
      method: 'DELETE',
      success: onSuccess,
      error: onError,
    });
  };

  const doWork = (work) => {
    console.log('`api.doWork` ran'); // eslint-disable-line no-console
    if(!isInitialized) {
      init();
      isInitialized = true;
    }
    
    $.ajax(work);
  };
  
  const init = () => {
    console.log('`api.init` ran'); // eslint-disable-line no-console
    $.ajaxSetup({
      contentType: CONTENT_TYPE,
      dataType: DATA_TYPE,
    });
  };
  
  return {
    getItems,
    createItem,
    updateItem,
    deleteItem,
  };
})(jQuery);