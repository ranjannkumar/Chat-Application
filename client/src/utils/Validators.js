export const usernameValidator=(username)=>{
  if (username.length === 0) {
    return { isValid: false, errorMessage: "Please enter a Username" };
  }
  return { isValid: true };
}