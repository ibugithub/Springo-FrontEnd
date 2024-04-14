import { useRouter } from "next/navigation";

type NextNavigationRouter = ReturnType<typeof useRouter>;
export interface CustomRouter extends NextNavigationRouter {

}

export interface DropdownMenuProps {
  onLogoutClick : () => void;
}


export interface Story {
  id: string;
  name: string;
  story: string;
}

export interface EditStoryProps {
  story: Story;
  onSave: (story: Story) => void;
  onCancel: () => void;
}

export interface signupResponseData {
  email : string[],
  password : string[],
  password2: string[]
}
