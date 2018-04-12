const store = (() => {
  const setError = function(error) {
    this.error = error;
  };

  return {
    items: [],
    error: null,

    setError,
  };

})();