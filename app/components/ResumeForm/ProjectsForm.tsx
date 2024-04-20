import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks"
import {  changeProjects, selectProjects } from "@/app/lib/redux/resumeSlice"
import { BulletListTextArea, Input } from "./Form/InputGroup"
import { Form, FormSection } from "./Form"
import { CreateHandleChangeArgsWithDescriptions } from "./types"
import { ResumeProject } from "@/app/lib/redux/types"


export const ProjectsForm =({}:{}) => {

    const projects = useAppSelector(selectProjects)
    const dispatch = useAppDispatch()
    const showDelete = projects.length>1;


   
    return (
        <Form form="projects" addButtonText="Add Project">
          {projects.map(({ project,date,descriptions}, idx) => {
            const handleProjectChange = (
              ...[
                field,
                value,
              ]: CreateHandleChangeArgsWithDescriptions<ResumeProject>
            ) => {
              dispatch(changeProjects({ idx, field, value } as any));
            };

            
    
            const showMoveUp = idx !== 0;
            const showMoveDown = idx !== projects.length - 1;
    
            return (
              <FormSection
                key={idx}
                form="projects"
                idx={idx}
                showMoveUp={showMoveUp}
                showMoveDown={showMoveDown}
                showDelete={showDelete}
                deleteButtonTooltipText="Delete Project"
              >
                <Input
                  label="Project Name"
                  labelClassName="col-span-4"
                  name="project"
                  placeholder="X Project"
                  value={project}
                  onChange={handleProjectChange}
                />
               
                <Input
                  label="Date"
                  labelClassName="col-span-2"
                  name="date"
                  placeholder="Jan 2022 - Present"
                  value={date}
                  onChange={handleProjectChange}
                />
                 <BulletListTextArea
                  label="Description"
                  labelClassName="col-span-full"
                  name="descriptions"
                  placeholder="Additional Informations"
                  value={descriptions}
                  onChange={handleProjectChange}
               
                />
               
                
              </FormSection>
            );
          })}
        </Form>
      );


}