const store = (() => {
  const setError = function(error) {
    this.error = error;
  };

  const setAdding = function(adding) {
    this.adding = adding;
  }

  const setRating = function(rating) {
      this.rating = rating;
  }

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
    error: null,
    adding: false,
    rating: 0,
    editingId: '',

    setError,
    setAdding,
    setRating,
    setEditingId,
    addItem,
    findById,
    findAndDelete,
    findAndUpdate,
  };

})();