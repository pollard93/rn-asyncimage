
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import AsyncImage from 'mbp-components-rn-asyncimage';
import CenterView from '../components/CenterView/CenterView';

storiesOf('AsyncImage', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('AsyncImage - default', () => (
    <AsyncImage
      splashUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80"
      fullUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop"
      containerProps={{
        style: {
          width: 250,
          height: 250,
        },
      }}
    />
  ))
  .add('AsyncImage - with placeholder', () => (
    <AsyncImage
      splashUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80"
      fullUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop"
      placeholderImageSource={require('../../icon-small.png')}
      containerProps={{
        style: {
          width: 250,
          height: 250,
        },
      }}
    />
  ));
