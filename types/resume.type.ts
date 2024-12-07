export type ExperienceType = {
  id?: number;
  docId?: number | null;
  title: string | null;
  companyName: string | null;
  city: string | null;
  state: string | null;
  startDate: string | null;
  endDate?: string | null;
  currentlyWorking: boolean;
  workSummary: string | null;
};

export type EducationType = {
  id?: number;
  docId?: number | null;
  universityName: string | null;
  startDate: string | null;
  endDate: string | null;
  degree: string | null;
  major: string | null;
  description: string | null;
};

export type SkillType = {
  id?: number;
  docId?: number | null;
  name: string | null;
  rating?: number;
};

export type PersonalInfoType = {
  id?: number;
  docId?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  jobTitle?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  linkedin?: string | null;
  portfolio?: string | null;
};
// New type for Projects
export type ProjectType = {
  id?: number;
  docId?: number | null; // Ensuring this is non-nullable as per the database schema
  projectName: string | null;
  projectLink: string | null;
  description: string | null;
  technologies: string | null; // Matches `varchar(500)` in the database schema
};

// New type for Certificates
export type CertificateType = {
  id?: number;
  docId?: number | null;
  title: string; // Non-null if sanitizing properly
  issuer: string; // Ensure `issuer` is non-null after sanitization
  issueDate?: string | null;
  description?: string | null;
};

export type StatusType = "archived" | "private" | "public" | undefined;

export type ResumeDataType = {
  id?: number;
  documentId?: string;
  title: string;
  status: StatusType;
  thumbnail?: string | null;
  personalInfo?: PersonalInfoType | null;
  themeColor?: string | null;
  currentPosition?: number | null;
  summary: string | null;
  experiences?: ExperienceType[] | null;
  educations?: EducationType[] | null;
  skills?: SkillType[] | null;
  projects?: ProjectType[] | null;
  certificates?: CertificateType[] | null;
  updatedAt?: string;
};
