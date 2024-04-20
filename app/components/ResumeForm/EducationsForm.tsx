import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks"
import { changeEducation, selectEducations } from "@/app/lib/redux/resumeSlice"
import { changeShowBulletPoints, selectShowBulletPoints } from "@/app/lib/redux/settingsSlice"
import { BulletListTextArea, Input } from "./Form/InputGroup"
import { Form, FormSection } from "./Form"
import { CreateHandleChangeArgsWithDescriptions } from "./types"
import { ResumeEducation } from "@/app/lib/redux/types"
import { BulletListIconButton } from "./Form/IconButton"

export const EducationsForm =({}:{}) => {

    const educations = useAppSelector(selectEducations)
    const dispatch = useAppDispatch()
    const showDelete = educations.length>1;
    const form ="educations";
    const showBulletPoints = useAppSelector(selectShowBulletPoints(form))

   
    return (
        <Form form={form} addButtonText="Add">
          {educations.map(({ school,degree,gpa,date,descriptions}, idx) => {
            const handleWorkExperienceChange = (
              ...[
                field,
                value,
              ]: CreateHandleChangeArgsWithDescriptions<ResumeEducation>
            ) => {
              dispatch(changeEducation({ idx, field, value } as any));
            };

            const handleShowBulletPoints =(value:boolean) =>{
                dispatch(changeShowBulletPoints({field:form,value}))

            }
    
            const showMoveUp = idx !== 0;
            const showMoveDown = idx !== educations.length - 1;
    
            return (
              <FormSection
                key={idx}
                form="educations"
                idx={idx}
                showMoveUp={showMoveUp}
                showMoveDown={showMoveDown}
                showDelete={showDelete}
                deleteButtonTooltipText="Delete School"
              >
                <Input
                  label="School"
                  labelClassName="col-span-4"
                  name="school"
                  placeholder="X University"
                  value={school}
                  onChange={handleWorkExperienceChange}
                />
               
                <Input
                  label="Date"
                  labelClassName="col-span-2"
                  name="date"
                  placeholder="Jan 2022 - Present"
                  value={date}
                  onChange={handleWorkExperienceChange}
                />
                  <Input
                  label="Degree"
                  labelClassName="col-span-4"
                  name="degree"
                  placeholder="Software Engineer"
                  value={degree}
                  onChange={handleWorkExperienceChange}
                />
                  <Input
                  label="GPA"
                  labelClassName="col-span-2"
                  name="gpa"
                  placeholder="grade point average"
                  value={gpa}
                  onChange={handleWorkExperienceChange}
                />
                <div className="relative col-span-full">
                <BulletListTextArea
                  label="Additional Informations(Optional)"
                  labelClassName="col-span-full"
                  name="descriptions"
                  placeholder="Additional Informations"
                  value={descriptions}
                  onChange={handleWorkExperienceChange}
                  showBulletPoints={showBulletPoints}
                />
                <div className="absolute left-[15.6rem] top-[0.07rem]">
                    <BulletListIconButton showBulletPoints={showBulletPoints} onClick={handleShowBulletPoints}/>


                </div>

                </div>
                
              </FormSection>
            );
          })}
        </Form>
      );


}