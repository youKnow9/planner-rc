// import { useState } from 'react';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import TextField from '@mui/material/TextField';

// const PasswordInput = (props) => {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => {
//     setShowPassword((prevValue) => !prevValue);
//   };

//   return (
//     <TextField
//       {...props}
//       type={showPassword ? 'text' : 'password'}
//       InputProps={{
//         endAdornment: (
//           <InputAdornment position="end">
//             <IconButton
//               aria-label="toggle password visibility"
//               onClick={handleClickShowPassword}
//               edge="end"
//             >
//               {showPassword ? <Visibility /> : <VisibilityOff />}
//             </IconButton>
//           </InputAdornment>
//         ),
//       }}
//     />
//   );
// };

// export default PasswordInput;