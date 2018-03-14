import faker from 'faker';
import RFR_DATA from './data/formatted-output.json';

const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 50);
  });
};

export const getItems = async (req, res) => {
  await delay();

  // Get all categories based on parent id
  const parentCategoryId = req.body.params.itemId;
  const subCategories = RFR_DATA.categories.filter(category => {
    return category.parentCategoryId === parentCategoryId;
  });

  // Format sub categories for response
  const responseItems = subCategories.map(subCategory => {
    let currentSubCategories = RFR_DATA.categories.filter(category => {
      return parseInt(category.parentCategoryId) === parseInt(subCategory.id);
    });
    return {
      id: subCategory.id,
      href: '#',
      heading: subCategory.name,
      description: subCategory.description,
      loading: false,
      active: false,
      endOfTree: req.body.params.blocksLength === 5 ? true : currentSubCategories.length === 0,
    };
  });

  console.log(responseItems);

  res.json({
    items: responseItems,
  });
};
