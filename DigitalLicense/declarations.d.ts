declare module '*.jpeg' {
  const value: any;
  export default value;
}
declare module 'react-native-signature-capture-view'

declare module '*.png' {
  const value: any;
  export default value;
}
declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const value: any;
  export default value;
}
declare module '*.mp4' {
  const value: any;
  export default value;
}

type User = {
  _id?: string,
  firstName?: string,
  middleName?: string,
  lastName?: string,
  passportImage: string,
  signatureImage: string,
  fullName: string,
  email?: string,
  dateOfBirth: Date,
  age: number,
  address: string,
  status?: string,
  licenceNumber?: string,
  cardNumber: string,
  class?: string,
  gender?: string,
}