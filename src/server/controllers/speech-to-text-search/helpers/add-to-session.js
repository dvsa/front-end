/*
// Partial add to session function
// 
// Accepts request object and sessionName to append a new object to
// Returns a function which expects an object to append to the
// closure sessionObject
*/
export const addToSession = (req, sessionName) => {
  // Init's session object / references current version
  req.session[sessionName] = req.session[sessionName] || {};

  // Returns a function to add more key / values to session object
  return appendedObject => {
    // If Object arg was not passed in return
    if (!appendedObject) return;

    // Loop through args object and append new key / values to session object
    Object.entries(appendedObject).forEach(([key, value]) => {
      req.session[sessionName][key] = value;
    });
  };
};
