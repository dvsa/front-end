import * as ACTION_TYPES from './../constants';

export const addBlock = (items = [], visible = true) => {
  return {
    type: ACTION_TYPES.ADD_BLOCK,
    items,
    visible,
  };
};

export const updateBlock = (blockIndex, newItems) => {
  return {
    type: ACTION_TYPES.UPDATE_BLOCK,
    blockIndex,
    newItems,
  };
};

export const removeBlock = blockIndex => {
  return {
    type: ACTION_TYPES.REMOVE_BLOCK,
    blockIndex,
  };
};

export const removeBlocksAfterIndex = endBlockIndex => {
  return {
    type: ACTION_TYPES.REMOVE_BLOCKS_AFTER_INDEX,
    endBlockIndex,
  };
};

export const removeLastBlock = () => {
  return {
    type: ACTION_TYPES.REMOVE_LAST_BLOCK,
  };
};

export const enableItemLoading = (blockIndex, itemIndex) => {
  return {
    type: ACTION_TYPES.ENABLE_BLOCK_ITEM_LOADING,
    blockIndex,
    itemIndex,
  };
};

export const disableItemLoading = (blockIndex, itemIndex) => {
  return {
    type: ACTION_TYPES.DISABLE_BLOCK_ITEM_LOADING,
    blockIndex,
    itemIndex,
  };
};

export const enableItemActive = (blockIndex, itemIndex) => {
  return {
    type: ACTION_TYPES.ENABLE_BLOCK_ITEM_ACTIVE,
    blockIndex,
    itemIndex,
  };
};

export const disableItemActive = (blockIndex, itemIndex) => {
  return {
    type: ACTION_TYPES.DISABLE_BLOCK_ITEM_ACTIVE,
    blockIndex,
    itemIndex,
  };
};
