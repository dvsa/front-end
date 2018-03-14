import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import faker from 'faker';

import AjaxBrowse from './AjaxBrowse';
import Block from './components/Block';
import BackButton from './components/BackButton';
import BlockItem from './components/BlockItem';
import reducers from './reducers';
import * as ACTIONS from './actions';

describe('<AjaxBrowse />', () => {
  let store = false;
  let wrapper = false;

  const nothingToDisplayMessage = 'Nothing to display.';
  const endpointURL = 'http://localhost:3002/api/v1/ajax-browse';

  const linkSelector = '.ajax-browse__link';

  const getAjaxBrowseBlocksClassSelector = blocksCount => {
    return `.ajax-browse--${blocksCount}-blocks`;
  };

  beforeEach(() => {
    store = createStore(reducers);
    store.dispatch(ACTIONS.setupEndpointURL(endpointURL));
    wrapper = mount(
      <Provider store={store}>
        <AjaxBrowse />
      </Provider>
    );
  });

  it('should render without errors', () => {
    const ajaxBrowse = wrapper.find(AjaxBrowse);
    expect(ajaxBrowse.length).toBe(1);
  });

  it(`should initially have '${nothingToDisplayMessage}' message displayed`, () => {
    const ajaxBrowse = wrapper.find(AjaxBrowse);
    expect(ajaxBrowse.text()).toEqual(nothingToDisplayMessage);
  });

  it('should initially have no blocks', () => {
    const block = wrapper.find(Block);
    expect(block.length).toBe(0);
  });

  it('should have initially have no back button', () => {
    const backButton = wrapper.find(BackButton);
    expect(backButton.length).toBe(0);
  });

  it('should display block once added to redux state', () => {
    const blockItem = {
      id: 123,
      href: '#',
      heading: 'Births, deaths, marriages and care',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia rerum sunt quod modi veritatis voluptatibus odio cupiditate possimus aperiam, facilis, rem iste cum odit quam.',
      loading: false,
      active: false,
      endOfTree: false,
    };
    store.dispatch(ACTIONS.addBlock([blockItem]));
    wrapper.update();
    const block = wrapper.find(Block);
    expect(block.length).toBe(1);
    // Exect the wrapper to have a count class of 1
    expect(wrapper.find(getAjaxBrowseBlocksClassSelector(1)).length).toBe(1);
  });

  it('should add new block or update next after clicking on a block item and getting ajax response', done => {
    const blockItems = [
      {
        id: faker.random.number(999),
        href: '#',
        heading: faker.random.words(3),
        description: faker.random.words(15),
        loading: false,
        active: false,
        endOfTree: false,
      },
    ];

    // Add initial block to state
    store.dispatch(ACTIONS.addBlock(blockItems));

    // Update component tree
    wrapper.update();

    // Create a fake server
    const server = sinon.fakeServer.create();

    // Make server respond without delay
    server.respondImmediately = true;

    // Make server respond with fake data
    server.respondWith(
      JSON.stringify({
        items: blockItems,
      })
    );

    // Find the first block item in the tree
    const blockItem = wrapper.find(BlockItem).first();

    // Check that it exists
    expect(blockItem.length).toBe(1);

    // Click on the first block item
    blockItem.find(linkSelector).simulate('click');

    // Wait for the promise to complete
    setImmediate(() => {
      // Update the component tree
      wrapper.update();

      // Expect there to be 2 blocks in total
      expect(wrapper.find(Block).length).toBe(2);

      // Exect the wrapper to have a count class of 2
      expect(wrapper.find(getAjaxBrowseBlocksClassSelector(2)).length).toBe(1);

      // Find another block item in the first block
      const blockItem = wrapper
        .find(Block)
        .first()
        .find(BlockItem);

      // Click on the block item
      blockItem.find(linkSelector).simulate('click');

      // Wait for promise to complete
      setImmediate(() => {
        // Update component tree
        wrapper.update();

        // Expect there to still be 2 blocks in total
        // since it should update the second block
        // rather than adding a new block
        expect(wrapper.find(Block).length).toBe(2);

        // Exect the wrapper to have a count class of 2
        expect(wrapper.find(getAjaxBrowseBlocksClassSelector(2)).length).toBe(1);

        // Find a block item in the second block
        const blockItem = wrapper
          .find(Block)
          .at(1)
          .find(BlockItem)
          .first();

        // Click on block item link
        blockItem.find(linkSelector).simulate('click');

        // Wait for promise to complete
        setImmediate(() => {
          // Update component tree
          wrapper.update();

          // Expect there to be 3 blocks in total
          expect(wrapper.find(Block).length).toBe(3);

          // Expect there to be a back button
          expect(wrapper.find(BackButton).length).toBe(1);

          // Exect the wrapper to have a count class of 3
          expect(wrapper.find(getAjaxBrowseBlocksClassSelector(3)).length).toBe(1);

          // Complete async test
          done();
        });
      });
    });
  });
});
