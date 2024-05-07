import React from 'react';
import {TextInput, HelperText} from 'react-native-paper';

function CustomTextInput({
  label,
  value,
  keyboardType = 'default',
  onChangeText,
  onPressIn,
  error,
  helperText,
}) {
  return (
    <>
      <TextInput
        label={label}
        mode="outlined"
        value={value}
        activeOutlineColor="green"
        keyboardType={keyboardType}
        onPressIn={onPressIn}
        onChangeText={onChangeText}
        className="bg-transparent"
        error={error}
      />
      {error && <HelperText type="error">{helperText}</HelperText>}
    </>
  );
}

export default CustomTextInput;
