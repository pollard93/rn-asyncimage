/* eslint-disable no-underscore-dangle */
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import AsyncImage from './AsyncImage';
import AsyncImageView from './AsyncImageView';

describe('<AsyncImage />', () => {
  it('Tests render', async () => {
    const wrapper = mount(
      <AsyncImage
        splashUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80"
        fullUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop"
        containerProps={{
          style: {
            width: 250,
            height: 250,
          },
        }}
      />,
    );

    // Test render
    expect(wrapper.findWhere((n) => n.props().testID === 'AIPLACEHOLDER')).to.not.have.length;
    expect(wrapper.findWhere((n) => n.props().testID === 'AISPLASH')).to.have.length;
    expect(wrapper.findWhere((n) => n.props().testID === 'AIFULL')).to.have.length;
    expect(wrapper.find('AnimatedComponent').props().style[0].opacity._value).to.equal(0);
  });

  it('Tests render with placeholder', async () => {
    const wrapper = mount(
      <AsyncImage
        splashUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80"
        fullUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop"
        placeholderImageSource={{ uri: 'https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80' }}
        containerProps={{
          style: {
            width: 250,
            height: 250,
          },
        }}
      />,
    );

    // Test render
    expect(wrapper.findWhere((n) => n.props().testID === 'AIPLACEHOLDER')).to.have.length;
  });

  it('Tests loaded state', async () => {
    const wrapper = mount(
      <AsyncImageView
        loaded={true}
        onLoad={() => {}}
        splashUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80"
        fullUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop"
        containerProps={{
          style: {
            width: 250,
            height: 250,
          },
        }}
      />,
    );

    // Test render
    expect(wrapper.findWhere((n) => n.props().testID === 'AIPLACEHOLDER')).to.not.have.length;
    expect(wrapper.findWhere((n) => n.props().testID === 'AISPLASH')).to.not.have.length;
    expect(wrapper.findWhere((n) => n.props().testID === 'AIFULL')).to.have.length;
  });

  it('Tests loaded state with placeholder', async () => {
    const wrapper = mount(
      <AsyncImageView
        loaded={true}
        onLoad={() => {}}
        splashUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80"
        fullUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop"
        placeholderImageSource={{ uri: 'https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80' }}
        containerProps={{
          style: {
            width: 250,
            height: 250,
          },
        }}
      />,
    );

    // Test render
    expect(wrapper.findWhere((n) => n.props().testID === 'AIPLACEHOLDER')).to.not.have.length;
    expect(wrapper.findWhere((n) => n.props().testID === 'AISPLASH')).to.not.have.length;
    expect(wrapper.findWhere((n) => n.props().testID === 'AIFULL')).to.have.length;
  });
});
