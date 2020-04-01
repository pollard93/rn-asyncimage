
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import { AsyncImage, AsyncImageProps } from 'mbp-components-rn-asyncimage';
import CenterView from '../components/CenterView/CenterView';
import { Button, View } from 'react-native';

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
  ))
  .add('AsyncImage - no urls', () => (
    <AsyncImage
      splashUrl={null}
      fullUrl={null}
      placeholderImageSource={require('../../icon-small.png')}
      containerProps={{
        style: {
          width: 250,
          height: 250,
        },
      }}
    />
  ))
  .add('AsyncImage - updateable', () => {
    const TestComponent = () => {
      const [selectedIndex, setSelectedIndex] = useState(0);

      const images = [
        'https://images.unsplash.com/photo-1558980664-10e7170b5df9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
        'https://images.unsplash.com/photo-1584500167088-53ef0470677e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1585175920486-fa1c1d403eeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=629&q=80',
      ];

      return (
        <View>
          <AsyncImage
            splashUrl="https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80"
            fullUrl={images[selectedIndex]}
            containerProps={{
              style: {
                width: 250,
                height: 250,
              },
            }}
          />
          <Button
            title="Change image"
            onPress={() => {
              if(selectedIndex < images.length -1){
                setSelectedIndex(selectedIndex + 1);
              }
            }}
          />
          <Button
            title="Cancel"
            onPress={() => setSelectedIndex(0)}
          />
        </View>
      )
    };

    return <TestComponent />
  });
