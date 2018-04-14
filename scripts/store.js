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

  const addItem = function(item) {
    console.log('`store.addItem` ran'); // eslint-disable-line no-console
    this.items.push(item);
  };

  const findById = function(id) {
    console.log('`store.findById` ran'); // eslint-disable-line no-console
    return this.items.find(item => item.id === id);
  };

  const findAndUpdateItem = function(id, newData) {
    console.log('`store.findAndUpdateItem` ran'); // eslint-disable-line no-console
    const item = this.findById(id);
    Object.assign(item, newData);
  };

  const findAndDeleteItem = function(id) {
    console.log('`store.findAndDeleteItem` ran'); // eslint-disable-line no-console
    this.items = this.items.filter(item => item.id !== id);
  };

  return {
    items: [],

    setError,
    getError,
    hasError,

    RENDER_MODE,
    setRenderMode,
    getRenderMode,
    
    getFilterMinimumRatingAbove,
    setFilterMinimumRatingAbove,
    
    selectedIds: [],
    editingId: '',
    
    addItem,
    findById,
    findAndUpdateItem,
    findAndDeleteItem,
  };
})();