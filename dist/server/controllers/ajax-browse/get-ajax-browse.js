'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAjaxBrowse = undefined;

var _categories = require('./data/categories.json');

var _categories2 = _interopRequireDefault(_categories);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Renders the initial page with block items
 *
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @return the html view with first block items
 */
const getAjaxBrowse = exports.getAjaxBrowse = (req, res) => {
  // Find all categories with parent id of 0
  const rootCategories = _categories2.default.data.filter(category => {
    return category.parent_test_item_category_id === 0;
  });

  // Convert all categories to ajax browse component format
  const items = (0, _helpers.convertCategoriesToBlockItems)(rootCategories);

  // Create an initial state used for redux store
  const initialState = {
    endpointURL: '/prototypes/ajax-browse',
    blocks: [{
      visible: true,
      items
    }]
  };

  // Render template
  res.render('prototypes/ajax-browse/index', {
    initialState,
    items
  });
};