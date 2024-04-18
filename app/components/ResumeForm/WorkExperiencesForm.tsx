import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks"
import { selectWorkExperiences } from "@/app/lib/redux/resumeSlice"

export const WorkExperiencesForm =() => {
   const workExperiences = useAppSelector(selectWorkExperiences)
   const dispatch = useAppDispatch();

   const showDelete = workExperiences.length>1

   return (
    <Form
   )

}