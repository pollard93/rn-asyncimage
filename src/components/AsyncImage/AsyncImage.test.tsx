/* eslint-disable no-underscore-dangle */
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Animated } from 'react-native';
import { AsyncImage } from './AsyncImage';
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
        placeholderImageProps={{
          source: { uri: 'https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80' },
        }}
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

  it('Tests render with no fullUrl', async () => {
    const wrapper = mount(
      <AsyncImage
        splashUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80"
        fullUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop"
        placeholderImageProps={{
          source: { uri: 'https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80' },
        }}
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
        opacity={new Animated.Value(1)}
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
    expect(wrapper.find('AnimatedComponent').props().style[0].opacity._value).to.equal(1);
  });

  it('Tests loaded state with placeholder', async () => {
    const wrapper = mount(
      <AsyncImageView
        opacity={new Animated.Value(1)}
        loaded={true}
        onLoad={() => {}}
        splashUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80"
        fullUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop"
        placeholderImageProps={{
          source: { uri: 'https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80' },
        }}
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
    expect(wrapper.find('AnimatedComponent').props().style[0].opacity._value).to.equal(1);
  });

  it('Tests loaded state with no urls', async () => {
    const wrapper = mount(
      <AsyncImageView
        opacity={new Animated.Value(1)}
        loaded={true}
        onLoad={() => {}}
        splashUrl={null}
        fullUrl={null}
        placeholderImageProps={{
          source: { uri: 'https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80' },
        }}
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
    expect(wrapper.findWhere((n) => n.props().testID === 'AISPLASH')).to.not.have.length;
    expect(wrapper.findWhere((n) => n.props().testID === 'AIFULL')).to.not.have.length;
  });

  it('Tests fullUrl updates', async () => {
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
        editable
      />,
    );

    // Test render, should be no TempImages
    expect(wrapper.findWhere((n) => n.props().testID === 'TempImage')).to.not.have.length;

    // Update image with a new fullUrl
    wrapper.setProps({ fullUrl: 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80' });
    wrapper.update();

    // Test render, should have 1 TempImages
    expect(wrapper.findWhere((n) => n.name() === 'AsyncImageComp' && n.props().testID === 'TempImage')).to.have.length(1);

    // Update image with a new fullUrl
    wrapper.setProps({ fullUrl: 'https://images.unsplash.com/photo-1584500167088-53ef0470677e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' });
    wrapper.update();

    // Test render, should have 2 TempImages
    expect(wrapper.findWhere((n) => n.name() === 'AsyncImageComp' && n.props().testID === 'TempImage')).to.have.length(2);

    // Update image with a new fullUrl with matches the initial url
    wrapper.setProps({ fullUrl: 'https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop' });
    wrapper.update();

    // Test render, should have cleared tempUrls
    expect(wrapper.findWhere((n) => n.name() === 'AsyncImageComp' && n.props().testID === 'TempImage')).to.have.length(0);
  });
});
