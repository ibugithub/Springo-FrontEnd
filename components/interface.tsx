export interface DropdownMenuProps {
  onLogoutClick : () => void;
}

export interface Story {
  id: string;
  name: string;
  story: string;
}


export interface signupResponseData {
  email : string[],
  password : string[],
  password2: string[]
}