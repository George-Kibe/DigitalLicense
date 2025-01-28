export default function generateUserCode(length = 10) {
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    // const symbols = "!@#$%^&*()_+[]{}|;:',.<>?";
  
    const allChars = upperCaseChars + numbers // + symbols;
    let userCode = "";
  
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        userCode += allChars[randomIndex];
    }
  
    return userCode;
  }

  export function generateLicenceNumber(length = 9) {
    const numbers = "0123456789";  
    let lNumber = "";
  
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        lNumber += numbers[randomIndex];
    }
    return lNumber;
  }

  export function generateCardNumber(length = 10) {
    const numbers = "0123456789";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
    let cardNumber = "";

    const allChars = numbers + upperCaseChars
  
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        cardNumber += allChars[randomIndex];
    }
    return cardNumber;
  }