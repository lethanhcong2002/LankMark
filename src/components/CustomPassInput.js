// import React, { useState, useEffect } from 'react';
// import { TextInput, HelperText } from 'react-native-paper';
// import { useSelector, useDispatch } from 'react-redux';
// import { setPasswordVisibility } from '../actions/passAction';

// function CustomPassInput({
//   label,
//   icons = [],
//   onChangeText,
//   error,
//   helperText,
// }) {
//   const isSecureRedux = useSelector(state => state.showpass.isSecure);
//   const dispatch = useDispatch();

//   const [currentIcon, setCurrentIcon] = useState(icons[0]);

//   useEffect(() => {
//     setCurrentIcon(isSecureRedux ? icons[0] : icons[1]);
//   }, [isSecureRedux, icons]);

//   const handleIconPress = () => {
//     dispatch(setPasswordVisibility(!isSecureRedux));
//     setCurrentIcon(prevIcon => (prevIcon === icons[0] ? icons[1] : icons[0]));
//   };

//   return (
//     <>
//       <TextInput
//         label={label}
//         mode="outlined"
//         activeOutlineColor="green"
//         secureTextEntry={isSecureRedux}
//         className="bg-transparent"
//         onChangeText={onChangeText}
//         right={<TextInput.Icon icon={currentIcon} onPress={handleIconPress} forceTextInputFocus={false}/>}
//         error={error}
//       />
//       {error && <HelperText type="error">{helperText}</HelperText>}
//     </>
//   );
// }

// export default CustomPassInput;
import React, { useState, useEffect } from 'react';
import { TextInput, HelperText } from 'react-native-paper';

function CustomPassInput({
  label,
  icons = [],
  onChangeText,
  error,
  helperText,
}) {
  const [isSecure, setIsSecure] = useState(true);

  const [currentIcon, setCurrentIcon] = useState(icons[0]);

  useEffect(() => {
    setCurrentIcon(isSecure ? icons[0] : icons[1]);
  }, [isSecure, icons]);

  const handleIconPress = () => {
    setIsSecure(prevIsSecure => !prevIsSecure);
  };

  return (
    <>
      <TextInput
        label={label}
        mode="outlined"
        activeOutlineColor="green"
        secureTextEntry={isSecure}
        className="bg-transparent"
        onChangeText={onChangeText}
        right={<TextInput.Icon icon={currentIcon} onPress={handleIconPress} />}
        error={error}
      />
      {error && <HelperText type="error">{helperText}</HelperText>}
    </>
  );
}

export default CustomPassInput;
