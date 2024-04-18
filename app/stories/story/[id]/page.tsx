import { ShowStory } from "@/components/Story/story";
const Page = ({params} : {params : {id : string}}) => {
  const id = params.id;
  return (
    <ShowStory id= {id}/>
  );
};

export default Page;