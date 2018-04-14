'use strict';
/* global */

// eslint-disable-next-line no-unused-vars
const store = (() => {
  let error = null;
  const setError = (err) => {
    error = err;
  };

  const hasError = () => {
    return Boolean(error);
  };

  const getError = () => {
    return error;
  };

  const setAdding = function(adding) {
    this.adding = adding;
  };

  const setRating = function(rating) {
    this.rating = rating;
  };

  const setEditingId = function(id) {
    this.editingId = id;
  };

  const addItem = function(item) {
    this.items.push(item);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  }

  const findAndUpdate = function(id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
  }

  return {
    items: [],
    adding: false,
    rating: 0,
    editingId: '',

    setError,
    hasError,
    getError,
    setAdding,
    setRating,
    setEditingId,
    addItem,
    findById,
    findAndDelete,
    findAndUpdate,
  };

})();