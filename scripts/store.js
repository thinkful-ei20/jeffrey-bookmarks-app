const store = (() => {
  const setError = function(error) {
    this.error = error;
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

  return {
    items: [],
    error: null,

    setError,
    addItem,
    findById,
    findAndDelete,
  };

})();