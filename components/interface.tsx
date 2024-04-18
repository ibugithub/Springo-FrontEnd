import { useRouter } from "next/navigation";

type NextNavigationRouter = ReturnType<typeof useRouter>;
export interface CustomRouter extends NextNavigationRouter {
}

export interface Story {
  id: string;
  name: string;
  story: string;
  author: string;
}

export interface EditStoryProps {
  story: Story;
  onSave: (isChanged: boolean) => void;
  onCancel: () => void;
}

export interface signupResponseData {
  email : string[],
  password : string[],
  password2: string[]
}

export interface storyIdProps {
  id: string;
}
