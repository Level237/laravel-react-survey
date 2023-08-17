<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\SurveyQuestion;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rules\Enum;
use App\Http\Resources\SurveyResource;
use App\Http\Requests\StoreSurveyRequest;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\UpdateSurveyRequest;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user=$request->user();

        return SurveyResource::collection(Survey::where('user_id',$user->id)->orderBy('created_at','desc')->paginate(10));
    }

    /**
     * Show the form for creating a new resource.
     */

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyRequest $request)
    {
        $data=$request->validated();
        $relativePath="";
        if(isset($data['image'])){
            $relativePath=$this->saveImage($data['image']);
            $data['image']=$relativePath;
        }

        $survey=Survey::create($data);

        foreach($data['questions'] as $question){
            $question['survey_id'] = $survey->id;
            $this->createQuestion($question);
        }

        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey,Request $request)
    {
        $user=$request->user();

        if($user->id !==$survey->user_id){
            return abord(403,'Unauthorized action');
        }

        return new SurveyResource($survey);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey)
    {
        //
    }

    private function saveImage($image){

        // check if image is valid base64 string
        if(preg_match('/^data:image\/(w+);base64,/',$image,$type)){
            // take out the base64 encoded text without mime type
            $image=substr($image,strpos($image,',') +1);
            // Get File extension
            $type=strtolower($type[1]); // jpg,png,gif

            // Check if file is an image
            if(!in_array($type,['jpg','jpeg','gif','png'])){
                throw new \Exception('invalid image type');
            }

            $image=str_replace(' ','+',$image);
            $image=base64_decode($image);

            if($image === false){
                throw new \Exception('base64_decode failed');
            }else{
                throw new \Exception('did not match data uri with image data');
            }

            $dir = 'images/';
            $file=Str::random() . '.' . $type;
            $absolutePath=public_path($dir);
            $relativePath=$dir . $file;

            if(!File::exists($absolutePath)){
                File::makeDirectory($absolutePath,0755,true);
            }
            file_put_contents($relativePath,$image);

            return $relativePath;
        }
    }

    private function createQuestion($data){

        if(is_array($data['data'])){
            $data['data']=json_encode($data['data']);
        }

        $validator=Validator::make($data,[
            'question'=>'required|string',
            'type'=>['required',new Enum(QuestionTypeEnum::class)],
            'description'=>'nullable|string',
            'data'=>'present',
            'survey_id'=>'exist:App\Models\Survey,id'
        ]);

        return SurveyQuestion::create($validator->validated());
    }
}
