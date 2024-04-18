import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { ShowForm, changeFormHeading, changeFormOrder, changeShowForm, selectHeadingByForm, selectIsFirstForm, selectIsLastForm, selectShowByForm } from "@/app/lib/redux/settingsSlice";
import { AcademicCapIcon, BuildingOffice2Icon, LightBulbIcon, WrenchIcon } from "@heroicons/react/24/outline";
import { MoveIconButton, ShowIconButton } from "./IconButton";

const FORM_TO_ICON:{[section in ShowForm]:typeof BuildingOffice2Icon} ={
workExperiences:BuildingOffice2Icon,
educations:AcademicCapIcon,
projects:LightBulbIcon,
skills:WrenchIcon,
custom:WrenchIcon,
}

export const BaseForm=({
    children,
    className,
}:{
    children:React.ReactNode;
    className?:string;
}) =>(
    <section className={`flex flex-col gap-3 rounded-md bg-white p-6 pt-4 shadow transition-opacity duration-200 ${className}`}>
        {children}

    </section>
)


export const Form =({
    form,
    addButtonText,
    children,
}:{
    form:ShowForm;
    addButtonText?: string;
    children:React.ReactNode;
}) => {
    const showForm = useAppSelector(selectShowByForm(form))
    const heading = useAppSelector(selectHeadingByForm(form))

    const dispatch = useAppDispatch();

    const setShowForm =(showForm:boolean) => {
        dispatch(changeShowForm({field:form,value:showForm}))

    };

    const setHeading = (heading: string) => {

        dispatch(changeFormHeading({field:form,value:heading}))
    };

    const isFirstForm = useAppSelector(selectIsFirstForm(form));
    const isLastForm = useAppSelector(selectIsLastForm(form));

    const handleMoveClick =(type :"up" | "down" )=> {
        dispatch(changeFormOrder({form,type}))

    };

    const Icon = FORM_TO_ICON[form];

    return(
        <BaseForm className={`transition-opacity duration-200 ${showForm ? "pb-6" : "pb-2 opacity-60"}`}>
            <div className="flex items-center justify-between gap-4">
                <div className="flex grow items-center gap-2  ">
                    <Icon className="text-gray-600 h-6 w-6" aria-hidden="true" />
                    <input type="text"  className="block w-full border-b border-transparent text-lg font-semibold tracking-wide text-gray-900 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus: shadow-sm"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}/>
                </div>
                <div className="flex items-center gap-0.5">
                    {!isFirstForm && (
                        <MoveIconButton type="up" onClick={handleMoveClick}  />

                    )}
                    {!isLastForm && (
                        <MoveIconButton type="down" onClick={handleMoveClick}/>
                    )}

                    <ShowIconButton show={showForm} setShow={setShowForm}/>
                    
                </div>

            </div>
            
        </BaseForm>
    )
    
}