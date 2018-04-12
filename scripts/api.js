const api = (()=>{
  const BASE_URL = "https://thinkful-list-api.herokuapp.com";  
  const USERNAME = "jeffrey";
  const API_URL = `${BASE_URL}/${USERNAME}`;
  
  const getItems = (callback) => {
    $.getJSON(API_URL + "/bookmarks", callback);
  };

  const createItem = (item, onSuccess, onError) => {
    const newItem = JSON.stringify(item);
    $.ajax({
      url: API_URL + "/bookmarks",
      method: "POST",
      contentType: "application/json",
      data: newItem,
      success: onSuccess,
      error: onError,
    });
  };

  const updateItem = (id, updateData, onSuccess, onError) => {
    const updateItem = JSON.stringify(updateData);
    $.ajax({
      url: API_URL + "/bookmarks/" + id,
      method: "PATCH",
      contentType: "application/json",
      data: updateItem,
      success: onSuccess,
      error: onError,
    });
  };

  return {
    getItems,
    createItem,
    updateItem,
  };

})();