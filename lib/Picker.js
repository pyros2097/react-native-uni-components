import React, { useState } from 'react';
import { Picker as RNPicker, View } from 'react-native';
// import { Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';

export default function Picker({ name, control, items }) {
  const theme = useTheme();
  const [id, setId] = useState(null);
  if (!id && items && items.length > 0) {
    setId(items[0].value);
  }
  const onSelect = (args) => {
    setId(args[0]);
    return args[0];
  };
  return (
    <View>
      <Controller
        as={
          <RNPickerSelect
            value={id}
            items={items.map((item) => ({ label: item.label, value: item.value }))}
            placeholder={{ label: '', value: null }}
            textInputProps={{
              height: 40,
              width: 300,
              borderBottomColor: theme.textInputBorderBottom,
              borderBottomWidth: 1,
              color: theme.textInputText,
              fontSize: 18,
            }}
          />
        }
        control={control}
        name={name}
        onChange={onSelect}
        onChangeName="onValueChange"
        defaultValue={null}
      />
    </View>
  );
}
