import { notFound } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import { applications } from "@/lib/data";

type ApplicationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const { id } = await params;
  const application = applications.find((app) => app.id === Number(id));

  if (!application) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{application.company}</h1>
            <p className="mt-2 text-lg text-gray-600">{application.role}</p>
          </div>

          <StatusBadge status={application.status} />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-gray-500">Location</p>
            <p className="mt-1 text-base">{application.location}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">Date Applied</p>
            <p className="mt-1 text-base">{application.dateApplied}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-gray-500">Notes</p>
            <p className="mt-1 text-base">{application.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}