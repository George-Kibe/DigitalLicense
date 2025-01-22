export default function generateUserCode(length = 12) {
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    // const symbols = "!@#$%^&*()_+[]{}|;:',.<>?";
  
    const allChars = upperCaseChars + lowerCaseChars + numbers // + symbols;
    let userCode = "";
  
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        userCode += allChars[randomIndex];
    }
  
    return userCode;
  }