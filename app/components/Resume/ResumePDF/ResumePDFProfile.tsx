import { ResumeProfile } from "@/app/lib/redux/types"

export const ResumePDFProfile = ({
    profile,
    themeColor,
    isPDF
}:{
    profile:ResumeProfile;
    themeColor:string;
    isPDF:boolean;

}) => {
    const {name, email, phone, url,summary} = profile
    const iconProps = {email,phone,location,url};

    return (
        
    )
}