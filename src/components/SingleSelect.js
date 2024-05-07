import React, { useState, useRef, useEffect } from 'react';
import {useColorScheme } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

function SingleSelect({ data, onSelect }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'DARK' : 'LIGHT';

  const [selectedValue, setSelectedValue] = useState(
    data.length > 0 ? data[0].value : null
  );
  const [isOpen, setIsOpen] = useState(false);
  const prevSelectedValueRef = useRef(null);

  useEffect(() => {
    prevSelectedValueRef.current = selectedValue;
  }, [data, selectedValue]);

  return (
    <DropDownPicker
      items={data.map((item) => ({
        label: item.label,
        value: item.value,
      }))}
      open={isOpen}
      theme={theme}
      setOpen={setIsOpen}
      value={selectedValue}
      setValue={setSelectedValue}
      onSelectItem={(item) => {
        onSelect(item.value);
      }}
    />
  );
}

export default SingleSelect;
