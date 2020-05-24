import React, { useEffect, useRef } from 'react';
import { TextInput } from 'react-native';
// import { useField } from '@unform/core';
import ErrorLine from './ErrorLine';

export default function Input({ name, secure = false, type = 'default', width = 300, ...props }) {
  // const theme = useTheme();
  // const inputRef = useRef(null);
  // const { fieldName, registerField, defaultValue, error } = useField(name);
  // useEffect(() => {
  //   inputRef.current.value = defaultValue;
  // }, [defaultValue]);

  // useEffect(() => {
  //   registerField({
  //     name: fieldName,
  //     ref: inputRef.current,
  //     path: 'value',
  //     clearValue(ref) {
  //       ref.value = '';
  //       ref.clear();
  //     },
  //     setValue(ref, value) {
  //       ref.setNativeProps({ text: value });
  //       inputRef.current.value = value;
  //     },
  //     getValue(ref) {
  //       return ref.value;
  //     },
  //   });
  // }, [fieldName, registerField]);

  return (
    <React.Fragment>
      <TextInput
        // ref={inputRef}
        testID={'TextInput_' + name}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        placeholderTextColor="#666360"
        // autoCapitalize="none"
        secureTextEntry={secure}
        keyboardType={type}
        // onChangeText={(value) => {
        //   if (inputRef.current) {
        //     inputRef.current.value = value;
        //   }
        // }}
        style={{
          fontSize: 18,
          height: 40,
          borderBottomWidth: 1,
          width: width,
          color: theme.textInputText,
          borderBottomColor: error ? theme.error : theme.textInputBorderBottom,
          ...props,
        }}
      />
      <ErrorLine error={error} />
    </React.Fragment>
  );
}
