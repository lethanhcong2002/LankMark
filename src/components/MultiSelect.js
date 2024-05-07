/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

function MultiSelect({data}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState([]);

  return (
    <DropDownPicker
      items={data}
      open={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      value={currentValue}
      setValue={val => setCurrentValue(val)}
      autoScroll
      placeholder="Chọn loại món ăn bạn muốn"
      theme="LIGHT"
      maxHeight={400}
      multiple={true}
      min={1}
      mode="BADGE"
      badgeColors={['red', 'blue', 'green']}
      badgeTextStyle={{color: '#fff', padding: 3}}
      badgeDotColors={['white']}
      extendableBadgeContainer={true}
      //searchable={true}
    />
  );
}

export default MultiSelect;
