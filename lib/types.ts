export type ApplicationStatus =
  | "Applied"
  | "OA"
  | "Interview"
  | "Rejected"
  | "Offer";

export type JobApplication = {
  id: number;
  company: string;
  role: string;
  location: string;
  status: ApplicationStatus;
  dateApplied: string;
  notes: string;
};