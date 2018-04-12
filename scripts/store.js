const store = (() => {
  const setError = (error) {
    this.error = error;
  };

  return {
    items: [],
    error: null,
  };

})();