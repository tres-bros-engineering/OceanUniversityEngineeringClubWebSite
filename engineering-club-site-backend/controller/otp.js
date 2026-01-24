const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    otp += digits[array[i] % digits.length];
  }
  return otp;
}

const verifyOTP = (userOTP, savedOTP) => {
  if (userOTP === savedOTP) {
    return { success: true, message: "OTP verified" };
  }

  return { success: false, message: "Invalid OTP" };
}

exports.generateOTP = generateOTP;
exports.verifyOTP = verifyOTP;

// const generate_OTP = generateOTP();
// const verify_OTP = verifyOTP(generateOTP, generateOTP);
// console.log(generate_OTP);
// console.log(verify_OTP.message);