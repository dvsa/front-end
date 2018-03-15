'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItems = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _formattedOutput = require('./data/formatted-output.json');

var _formattedOutput2 = _interopRequireDefault(_formattedOutput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 50);
  });
};

const getItems = exports.getItems = async (req, res) => {
  await delay();

  // Get all categories based on parent id
  const parentCategoryId = req.body.params.itemId;
  const subCategories = _formattedOutput2.default.categories.filter(category => {
    return category.parentCategoryId === parentCategoryId;
  });

  // Format sub categories for response
  const responseItems = subCategories.map(subCategory => {
    let currentSubCategories = _formattedOutput2.default.categories.filter(category => {
      return parseInt(category.parentCategoryId) === parseInt(subCategory.id);
    });
    return {
      id: subCategory.id,
      href: '#',
      heading: subCategory.name,
      description: subCategory.description,
      loading: false,
      active: false,
      endOfTree: req.body.params.blocksLength === 5 ? true : currentSubCategories.length === 0
    };
  });

  console.log(responseItems);

  res.json({
    items: responseItems
  });
};