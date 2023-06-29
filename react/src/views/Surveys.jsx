
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../Components/PageComponent";
import SurveyListem from "../Components/SurveyListem";
import TButton from "../Components/core/Tbutton";
import { useStateContext } from "../contexts/ContextProvider";


export default function Surveys() {

  const {surveys}=useStateContext();
  console.log(surveys);

  const onDeleteClick=()=> {
    console.log("On Delete click");
  }
  return (
    <PageComponent title="Survey" buttons={(
      <TButton color="green" to="/surveys/create">
        <PlusCircleIcon className="h-6 w-6 mr-2"/>
        create new
      </TButton>
    )}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {surveys.map(survey => (
        <SurveyListem survey={survey} key={survey.id} onClick={onDeleteClick}/>
      ))}
      </div>

   </PageComponent>
  )
}
