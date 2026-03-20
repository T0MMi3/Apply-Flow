"use client";
import Link from "next/link";
import { JobApplication } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import { useRouter } from "next/navigation";

type ApplicationTableProps = {
  applications: JobApplication[];
  onDelete: (id: number) => void;
};

export default function ApplicationTable({
  applications,
  onDelete,
}: ApplicationTableProps) {

  const router = useRouter();

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 font-semibold text-gray-900">Company</th>
            <th className="px-6 py-3 font-semibold text-gray-900">Role</th>
            <th className="px-6 py-3 font-semibold text-gray-900">Location</th>
            <th className="px-6 py-3 font-semibold text-gray-900">Status</th>
            <th className="px-6 py-3 font-semibold text-gray-900">Applied</th>
            <th className="px-6 py-3 font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr
              key={app.id}
              onClick={() => router.push(`/applications/${app.id}`)}
              className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition cursor-pointer"
            >
              <td className="px-6 py-3 font-semibold text-gray-900">
                <Link
                  href={`/applications/${app.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-900 hover:text-blue-600 hover:underline"
                >
                  {app.company}
                </Link>
              </td>
              <td className="px-6 py-3 text-gray-800">{app.role}</td>
              <td className="px-6 py-3 text-gray-800">{app.location}</td>
              <td className="px-6 py-3 text-gray-800">
                <StatusBadge status={app.status} />
              </td>
              <td className="px-6 py-3 text-gray-800">{app.dateApplied}</td>

              <td className="px-6 py-3 text-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const confirmed = window.confirm(`Delete application for ${app.company}?`);
                    if (confirmed) {
                      onDelete(app.id);
                    }
                  }}
                  className="rounded-md border border-red-200 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}