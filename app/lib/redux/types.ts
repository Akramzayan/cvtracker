export interface ResumeProfile{
    name:string;
    email:string;
    phone:string;
    url:string;
    summary:string;
    loaction:string
}

export interface ResumeWorkExperience{
    company:string;
    jobTitle:string;
    date:string;
    description:string[];

}

export interface ResumeEducation {
    school:string;
    degree:string;
    data:string;
    gpa:string;
    descriptions:string[];

}

export interface ResumeProject{
    project:string;
    date:string;
    desciptions:string[];
}
export interface FeaturedSkill {
    skill:string;
    rating:number;

}

export interface ResumeSkill{
    featuredSkills:FeaturedSkill[];
    description:string[];

}

export interface ResumeCustom {
    description :string[];

}

export interface Resume {
    profile:ResumeProfile;
    workExperiences:ResumeWorkExperience[];
    educations:ResumeEducation[];
    projects:ResumeProject[];
    skills:ResumeSkill;
    custom:ResumeCustom;
}

export type Resumekey = keyof Resume;