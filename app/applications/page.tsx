import { applications } from "@/lib/data";
import ApplicationTable from "@/components/ApplicationTable";

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
        <p className="mt-2 text-gray-700">
          View all tracked roles and their current status.
        </p>
      </div>

      <ApplicationTable
        applications={applications}
        onDelete={handleDeleteApplication}
      />
    </div>
  );
}

function handleDeleteApplication(id: number) {
  console.log("Delete not wired yet:", id);
}