'use strict';
/* global */

// eslint-disable-next-line no-unused-vars
const store = (() => {
  let error = null;
  const setError = (err) => {
    console.log('`store.setError` ran'); // eslint-disable-line no-console
    error = err;
  };
  
  const getError = () => {
    console.log('`store.getError` ran'); // eslint-disable-line no-console
    return error;
  };

  const hasError = () => {
    console.log('`store.hasError` ran'); // eslint-disable-line no-console
    return !(error === null);
  };

  const RENDER_MODE = Object.freeze({default:1, adding:2});
  let renderMode = RENDER_MODE.default;
  const setRenderMode = (mode) => {
    console.log('`store.setRenderMode` ran'); // eslint-disable-line no-console
    renderMode = mode;
  };

  const getRenderMode = () => {
    console.log('`store.getRenderMode` ran'); // eslint-disable-line no-console
    return renderMode;
  };

  let filterMinimumRatingAbove = 0;
  const setFilterMinimumRatingAbove = (rating) => {
    console.log('`store.setFilterMinimumRatingAbove` ran'); // eslint-disable-line no-console
    filterMinimumRatingAbove = rating;
  };
  
  const getFilterMinimumRatingAbove = () => {
    console.log('`store.getFilterMinimumRatingAbove` ran'); // eslint-disable-line no-console
    return filterMinimumRatingAbove;
  };

  let selectedId = '';
  const setSelectedId = (id) => {
    console.log('`store.setSelectedId` ran'); // eslint-disable-line no-console
    selectedId = id;
  };

  const getSelectedId = () => {
    console.log('`store.getSelectedId` ran'); // eslint-disable-line no-console
    return selectedId;
  };

  let items = [];
  const getItems = () => {
    console.log('`store.getItems` ran'); // eslint-disable-line no-console
    return items;
  };

  const addItem = (item) => {
    console.log('`store.addItem` ran'); // eslint-disable-line no-console
    items.push(item);
  };

  const findById = (id) => {
    console.log('`store.findById` ran'); // eslint-disable-line no-console
    return items.find(item => item.id === id);
  };

  const findAndUpdateItem = (id, newData) => {
    console.log('`store.findAndUpdateItem` ran'); // eslint-disable-line no-console
    const item = findById(id);
    Object.assign(item, newData);
  };

  const findAndDeleteItem = (id) => {
    console.log('`store.findAndDeleteItem` ran'); // eslint-disable-line no-console
    items = items.filter(item => item.id !== id);
  };

  return {
    setError,
    getError,
    hasError,

    RENDER_MODE,
    setRenderMode,
    getRenderMode,
    
    getFilterMinimumRatingAbove,
    setFilterMinimumRatingAbove,
    
    setSelectedId,
    getSelectedId,
    
    getItems,
    addItem,
    findAndUpdateItem,
    findAndDeleteItem,
  };
})();