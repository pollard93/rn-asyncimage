
import React from 'react';
import {Text} from 'react-native';
import { storiesOf } from '@storybook/react-native';
import Hello from 'mpb-components-rn-npm-boilerplate';

storiesOf('Hello', module)
  .add('Hello', () => (
    <Hello content="Hello" />
  ));
