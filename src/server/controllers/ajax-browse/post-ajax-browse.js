import CATEGORIES from './data/categories.json';
import { convertCategoriesToBlockItems } from './helpers';

/**
 * Returns the next block based on the requested category
 *
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @return json response with next block items
 */
export const postAjaxBrowse = (req, res) => {
  const { itemId, blocksLength } = req.body.params;

  const subCategoriesForParent = CATEGORIES.data.filter(category => {
    return category.parent_test_item_category_id === itemId;
  });

  const items = convertCategoriesToBlockItems(subCategoriesForParent);

  res.json({
    items,
  });
};
