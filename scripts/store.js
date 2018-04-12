const store = (() => {
  const setError = function(error) {
    this.error = error;
  };

  const addItem = function(item) {
    this.items.push(item);
  };

  return {
    items: [],
    error: null,

    setError,
    addItem,
  };

})();