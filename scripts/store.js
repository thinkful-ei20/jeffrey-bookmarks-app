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

  const setRating = function(rating) {
    this.rating = rating;
  };

  const setEditingId = function(id) {
    this.editingId = id;
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

  const findById = function(id) {
    console.log('`store.findById` ran'); // eslint-disable-line no-console
    return this.items.find(item => item.id === id);
  };

  const findAndUpdateItem = (id, newData) => {
    console.log('`store.findAndUpdateItem` ran'); // eslint-disable-line no-console
    const item = this.findById(id);
    Object.assign(item, newData);
  };

  const findAndDeleteItem = (id) => {
    console.log('`store.findAndDeleteItem` ran'); // eslint-disable-line no-console
    this.items = this.items.filter(item => item.id !== id);
  };

  return {
    setError,
    getError,
    hasError,    

    RENDER_MODE,
    setRenderMode,
    getRenderMode,
    
    rating: 0,
    editingId: '',
    setRating,
    setEditingId,
    
    getItems,
    addItem,
    findAndUpdateItem,
    findAndDeleteItem,
  };
})();