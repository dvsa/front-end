import CATEGORIES from './../data/categories.json';

/**
 * Converts an object of catergories into
 * block items used with react ajax brose redux store
 *
 * @param {*} categories
 * @return array of block item objects
 */
export const convertCategoriesToBlockItems = categories => {
  return categories.map(category => {
    const allChildCategories = CATEGORIES.data.filter(categoryItem => {
      return categoryItem.parent_test_item_category_id === category.id;
    });
    return {
      id: category.id,
      href: '#',
      heading: category.name,
      description: false,
      loading: false,
      active: false,
      endOfTree: allChildCategories.length === 0,
    };
  });
};
