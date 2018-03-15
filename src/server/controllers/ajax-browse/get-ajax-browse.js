import CATEGORIES from './data/categories.json';
import { convertCategoriesToBlockItems } from './helpers';

/**
 * Renders the initial page with block items
 *
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @return the html view with first block items
 */
export const getAjaxBrowse = (req, res) => {
  // Find all categories with parent id of 0
  const rootCategories = CATEGORIES.data.filter(category => {
    return category.parent_test_item_category_id === 0;
  });

  // Convert all categories to ajax browse component format
  const items = convertCategoriesToBlockItems(rootCategories);

  // Create an initial state used for redux store
  const initialState = {
    endpointURL: '/prototypes/ajax-browse',
    blocks: [
      {
        visible: true,
        items,
      },
    ],
  };

  // Render template
  res.render('prototypes/ajax-browse/index', {
    initialState,
    items,
  });
};
