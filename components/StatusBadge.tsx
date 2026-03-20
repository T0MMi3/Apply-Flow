import { ApplicationStatus } from "@/lib/types";

type StatusBadgeProps = {
  status: ApplicationStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<ApplicationStatus, string> = {
    Applied: "bg-blue-100 text-blue-700",
    OA: "bg-yellow-100 text-yellow-700",
    Interview: "bg-purple-100 text-purple-700",
    Rejected: "bg-red-100 text-red-700",
    Offer: "bg-green-100 text-green-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}