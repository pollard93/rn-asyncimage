/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { storiesOf } from '@storybook/react-native';
import { useForm } from 'react-hook-form';
import { View, Button } from 'react-native';
import { EditableAsyncImage } from 'mbp-components-rn-asyncimage';
import CenterView from '../components/CenterView/CenterView';
import AssetPickerDecorator from '../components/AssetPickerDecorator/AssetPickerDecorator';
import { PhotoIdentifier } from '@react-native-community/cameraroll';

type FormData = {
  profilePicture: PhotoIdentifier['node'];
};

storiesOf('EditableAsyncImage', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator((getStory) => <AssetPickerDecorator>{getStory()}</AssetPickerDecorator>)
  .add('EditableAsyncImage', () => {
    const TestComponent = () => {
      const { register, setValue, handleSubmit, reset, formState: { isValid, dirty } } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
          profilePicture: undefined,
        },
      });


      const onSubmit = ({profilePicture}) => {
        console.log("onSubmit -> profilePicture", profilePicture);

        /**
         * Insert query which will ultimately update the urls used below
         */

        /**
         * If using apollo create ReactNativeFile
         *

         const upload = new ReactNativeFile({
           uri: profilePicture[0].image.uri,
           name: profilePicture[0].image.filename,
           type: profilePicture[0].type,
         });
        */

        reset({
          profilePicture: undefined,
        });
      };


      /**
       * Register form
       */
      useEffect(() => {
        register(
          { name: 'profilePicture' },
          { required: false, validate: (v) => !!v },
        )
      }, [register]);


      return (
        <View>
          <EditableAsyncImage
            asyncImageProps={{
              /**
               * Always populate urls for editable, because if the user cancels their selection it needs to revert the image
               * Can populate with placeholder image locally
               */
              splashUrl: 'https://images.unsplash.com/photo-1558980664-2506fca6bfc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=5&q=80',
              fullUrl: 'https://images.unsplash.com/photo-1558980664-2506fca6bfc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
              containerProps: {
                style: {
                  width: 250,
                  height: 250,
                },
              },
            }}
            onChange={(file) => setValue('profilePicture', file, true)}
          >
            {({selectedAsset, openPicker, onCancel}) => {
              console.log("selectedAsset", selectedAsset)

              /**
               * Render controls here
               */
              return (
                <>
                  <Button
                    title="Change"
                    onPress={openPicker}
                  />

                  <Button
                    title="Cancel"
                    disabled={!selectedAsset}
                    onPress={onCancel}
                  />
                </>
              );
            }}
          </EditableAsyncImage>

          <Button
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || !dirty}
          />
        </View>
      );
    };

    return <TestComponent />;
  });
