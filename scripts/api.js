const api = (()=>{
  const BASE_URL = "https://thinkful-list-api.herokuapp.com";  
  const USERNAME = "jeffrey";
  const API_URL = `${BASE_URL}/${USERNAME}`;
  
  const getItems = (callback) => {
    $.getJSON(API_URL + "/bookmarks", callback);
  };

  return {
    getItems,
  };

})();