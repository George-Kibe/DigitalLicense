declare module '*.jpeg' {
  const value: any;
  export default value;
}
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
  username: string,
  nickname?: string,
  email: string,
  maritalStatus?: string,
  sexualOrientation?: string,
  clerkUserId: string,
  first_name?: string,
  name?: string,
  last_name?: string,
  age?: number,
  minAge?: number,
  maxAge?: number,
  bio?: string,
  greetingMessage?: string,
  myAvatars?: string[],
  children?: number,
  livingWithMe?: string,
  gender?: string,
  status?: string
}