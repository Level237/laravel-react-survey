import TButton from "./core/Tbutton";
import  {ArrowTopRightOnSquareIcon,PencilIcon,TrashIcon} from "@heroicons/react/24/outline"


export default function SurveyListem({survey,onDeleteClick}) {
  return (
    <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-h-[470px]">
      <img
      // eslint-disable-next-line react/prop-types
      src={survey.image_url}
      // eslint-disable-next-line react/prop-types
      alt={survey.title}/>
      <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
      <div
      dangerouslySetInnerHTML={{ __html:survey.description }}
      className="overflow-hidden flex-1">

      </div>
      <div className="flex justify-between items-center mt-3">
        <TButton to={`surveys/${survey.id}`}>
          <PencilIcon className="w-5 h-5 mr-2"/>
          Edit
        </TButton>
        <div className="flex items-center">
        <TButton href={`view/surveys/${survey.slug}`} circle link>
          <ArrowTopRightOnSquareIcon className="w-5 h-5"/>
        </TButton>

        {survey.id && (
          <TButton onClick={onDeleteClick} circle link color="red">
          <TrashIcon className="w-5 h-5"/>
        </TButton>
        )}
        </div>
      </div>
    </div>
  )
}
