import * as ACTION_TYPES from './../constants';

const initialState = [];

export default function blocks(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_BLOCK: {
      const items = action.items.map((item, index) => {
        return {
          id: item.id || false,
          href: item.href || '#',
          heading: item.heading || '',
          description: item.description || '',
          loading: item.loading || false,
          active: item.active || false,
          endOfTree: item.endOfTree || false,
          clicked: false,
        };
      });
      return [
        ...state,
        {
          items,
          visible: action.visible,
        },
      ];
    }

    case ACTION_TYPES.UPDATE_BLOCK: {
      return state.map((block, index) => {
        if (index === action.blockIndex) {
          const items = action.newItems.map((item, index) => {
            return {
              id: item.id || false,
              href: item.href || '#',
              heading: item.heading || '',
              description: item.description || '',
              loading: item.loading || false,
              active: item.active || false,
              endOfTree: item.endOfTree || false,
            };
          });
          return {
            ...block,
            items,
          };
        }
        return {
          ...block,
        };
      });
    }

    case ACTION_TYPES.REMOVE_BLOCK: {
      return [...state.slice(0, action.blockIndex), ...state.slice(action.blockIndex + 1)];
    }

    case ACTION_TYPES.REMOVE_BLOCKS_AFTER_INDEX: {
      const newState = [...state.slice(0, action.endBlockIndex + 1)];
      return newState.map((block, index) => {
        if (index === newState.length - 1) {
          const items = block.items.map(item => {
            return {
              ...item,
              active: false,
            };
          });
          return {
            ...block,
            items,
          };
        }
        return block;
      });
    }

    case ACTION_TYPES.REMOVE_LAST_BLOCK: {
      const newState = [...state.slice(0, state.length - 1)];
      return newState.map((block, index) => {
        if (index === newState.length - 1) {
          const items = block.items.map((item, index) => {
            return {
              ...item,
              active: false,
            };
          });
          return {
            ...block,
            items,
          };
        }
        return {
          ...block,
        };
      });
    }

    case ACTION_TYPES.ENABLE_BLOCK_ITEM_LOADING: {
      return state.map((block, index) => {
        if (index === action.blockIndex) {
          const items = block.items.map((item, index) => {
            if (index === action.itemIndex) {
              return {
                ...item,
                loading: true,
              };
            }
            return {
              ...item,
              loading: false,
            };
          });
          return {
            ...block,
            items,
          };
        }
        return {
          ...block,
        };
      });
    }

    case ACTION_TYPES.DISABLE_BLOCK_ITEM_LOADING: {
      return state.map((block, index) => {
        if (index === action.blockIndex) {
          const items = block.items.map((item, index) => {
            if (index === action.itemIndex) {
              return {
                ...item,
                loading: false,
              };
            }
            return {
              ...item,
              loading: false,
            };
          });
          return {
            ...block,
            items,
          };
        }
        return {
          ...block,
        };
      });
    }

    case ACTION_TYPES.ENABLE_BLOCK_ITEM_ACTIVE: {
      return state.map((block, index) => {
        if (index === action.blockIndex) {
          const items = block.items.map((item, index) => {
            if (index === action.itemIndex) {
              return {
                ...item,
                active: true,
              };
            }
            return {
              ...item,
              active: false,
            };
          });
          return {
            ...block,
            items,
          };
        }
        return {
          ...block,
        };
      });
    }

    case ACTION_TYPES.DISABLE_BLOCK_ITEM_ACTIVE: {
      return state.map((block, index) => {
        if (index === action.blockIndex) {
          const items = block.items.map((item, index) => {
            if (index === action.itemIndex) {
              return {
                ...item,
                active: false,
              };
            }
            return {
              ...item,
              active: false,
            };
          });
          return {
            ...block,
            items,
          };
        }
        return {
          ...block,
        };
      });
    }

    default: {
      return state;
    }
  }
}
