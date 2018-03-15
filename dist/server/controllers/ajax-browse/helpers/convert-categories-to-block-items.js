'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertCategoriesToBlockItems = undefined;

var _categories = require('./../data/categories.json');

var _categories2 = _interopRequireDefault(_categories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts an object of catergories into
 * block items used with react ajax brose redux store
 *
 * @param {*} categories
 * @return array of block item objects
 */
const convertCategoriesToBlockItems = exports.convertCategoriesToBlockItems = categories => {
  return categories.map(category => {
    const allChildCategories = _categories2.default.data.filter(categoryItem => {
      return categoryItem.parent_test_item_category_id === category.id;
    });
    return {
      id: category.id,
      href: '#',
      heading: category.name,
      description: false,
      loading: false,
      active: false,
      endOfTree: allChildCategories.length === 0
    };
  });
};