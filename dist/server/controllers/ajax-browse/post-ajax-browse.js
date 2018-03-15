'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postAjaxBrowse = undefined;

var _categories = require('./data/categories.json');

var _categories2 = _interopRequireDefault(_categories);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the next block based on the requested category
 *
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @return json response with next block items
 */
const postAjaxBrowse = exports.postAjaxBrowse = (req, res) => {
  const { itemId, blocksLength } = req.body.params;

  const subCategoriesForParent = _categories2.default.data.filter(category => {
    return category.parent_test_item_category_id === itemId;
  });

  const items = (0, _helpers.convertCategoriesToBlockItems)(subCategoriesForParent);

  res.json({
    items
  });
};