"use client";

import { useEffect, useState } from "react";
import ApplicationTable from "@/components/ApplicationTable";
import { JobApplication } from "@/lib/types";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApplications() {
      try {
        const savedApplications = localStorage.getItem("applyflow-applications");

        if (savedApplications) {
          const parsed: JobApplication[] = JSON.parse(savedApplications);
          setApplications(parsed);
        } else {
          const res = await fetch("/api/applications");
          const data: JobApplication[] = await res.json();
          setApplications(data);
        }
      } catch (error) {
        console.error("Failed to load applications:", error);
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  function handleDeleteApplication(id: number) {
    const updatedApplications = applications.filter((app) => app.id !== id);
    setApplications(updatedApplications);
    localStorage.setItem(
      "applyflow-applications",
      JSON.stringify(updatedApplications)
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
        <p className="mt-2 text-gray-600">
          View all tracked roles and their current status.
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-gray-600 shadow-sm">
          Loading applications...
        </div>
      ) : applications.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-gray-600 shadow-sm">
          No applications found.
        </div>
      ) : (
        <ApplicationTable
          applications={applications}
          onDelete={handleDeleteApplication}
        />
      )}
    </div>
  );
}