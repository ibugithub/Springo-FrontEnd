export interface DropdownMenuProps {
  onLogoutClick : () => void;
}

export interface Product {
  id: string;
  name: string;
  description: string;
}


export interface signupResponseData {
  email : string[],
  password : string[],
  password2: string[]
}