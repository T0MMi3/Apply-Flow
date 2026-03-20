"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import ApplicationTable from "@/components/ApplicationTable";
import { JobApplication } from "@/lib/types";

type FilterStatus = "All" | "Applied" | "OA" | "Interview" | "Rejected" | "Offer";
type SortOption = "date" | "company" | "status";

export default function HomePage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>("All");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [newApplication, setNewApplication] = useState({
    company: "",
    role: "",
    location: "",
    status: "Applied" as JobApplication["status"],
    dateApplied: "",
    notes: "",
  });

  const filteredApplications = applications
  .filter((app) => {
    const matchesStatus =
      selectedStatus === "All" || app.status === selectedStatus;

    const search = searchTerm.toLowerCase();
    const matchesSearch =
      app.company.toLowerCase().includes(search) ||
      app.role.toLowerCase().includes(search) ||
      app.location.toLowerCase().includes(search);

    return matchesStatus && matchesSearch;
  })
  .sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime();
    }

    if (sortBy === "company") {
      return a.company.localeCompare(b.company);
    }

    if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    }

    return 0;
  });
  
  const total = applications.length;
  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;
  const offers = applications.filter((app) => app.status === "Offer").length;
  const pending = applications.filter(
    (app) => app.status === "Applied" || app.status === "OA"
  ).length;

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

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("applyflow-applications", JSON.stringify(applications));
    }
  }, [applications, loading]);

    function handleAddApplication(e: React.FormEvent) {
      e.preventDefault();

    if (
      !newApplication.company ||
      !newApplication.role ||
      !newApplication.location ||
      !newApplication.dateApplied
    ) {
      return;
    }

    const applicationToAdd: JobApplication = {
      id: Date.now(),
      company: newApplication.company,
      role: newApplication.role,
      location: newApplication.location,
      status: newApplication.status,
      dateApplied: newApplication.dateApplied,
      notes: newApplication.notes,
    };

    setApplications((prev) => [applicationToAdd, ...prev]);

    setNewApplication({
      company: "",
      role: "",
      location: "",
      status: "Applied",
      dateApplied: "",
      notes: "",
    });

    setShowForm(false);
    setSelectedStatus("All");
  }

  function handleDeleteApplication(id: number) {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-gray-900">Interview Tracker Dashboard</h1>
        <p className="mt-2 text-gray-700">
          Track applications, interviews, and progress in one place.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Applications"
          value={total}
          subtitle="All tracked job applications"
        />
        <StatCard
          title="Interviews"
          value={interviews}
          subtitle="Applications currently in interview stage"
        />
        <StatCard
          title="Offers"
          value={offers}
          subtitle="Applications that resulted in offers"
        />
        <StatCard
          title="Pending"
          value={pending}
          subtitle="Applications awaiting next steps"
        />
      </section>

      <div className="flex items-center justify-between">
        

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          {showForm ? "Close Form" : "+ Add Application"}
        </button>

        <button
          onClick={() => {
            const confirmed = window.confirm("Clear all applications?");
            if (confirmed) {
              setApplications([]);
              localStorage.setItem("applyflow-applications", JSON.stringify([]));
            }
          }}
          className="text-sm text-gray-500 hover:text-red-600 underline"
        >
          Clear All Applications
        </button>

      </div>

      {showForm && (
        <form
          onSubmit={handleAddApplication}
          className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              value={newApplication.company}
              onChange={(e) =>
                setNewApplication({ ...newApplication, company: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="GM Financial"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              value={newApplication.role}
              onChange={(e) =>
                setNewApplication({ ...newApplication, role: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Software Development Engineer I"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={newApplication.location}
              onChange={(e) =>
                setNewApplication({ ...newApplication, location: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Irving, TX"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={newApplication.status}
              onChange={(e) =>
                setNewApplication({
                  ...newApplication,
                  status: e.target.value as JobApplication["status"],
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="Applied">Applied</option>
              <option value="OA">OA</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Date Applied
            </label>
            <input
              type="date"
              value={newApplication.dateApplied}
              onChange={(e) =>
                setNewApplication({
                  ...newApplication,
                  dateApplied: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={newApplication.notes}
              onChange={(e) =>
                setNewApplication({ ...newApplication, notes: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              rows={4}
              placeholder="Notes about the role, interview prep, recruiter contact, etc."
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Save Application
            </button>
          </div>
        </form>
      )}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Recent Applications</h2>
          <p className="text-sm text-gray-600">
            Showing: {filteredApplications.length} result{filteredApplications.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {["All", "Applied", "OA", "Interview", "Rejected", "Offer"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status as FilterStatus)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company, role, or location..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-500"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white"
          >
            <option value="date">Sort by Date</option>
            <option value="company">Sort by Company</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>

       {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-gray-600 shadow-sm">
            Loading applications...
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-gray-600 shadow-sm">
            No applications match your current filters.
          </div>
        ) : (
          <ApplicationTable
            applications={filteredApplications}
            onDelete={handleDeleteApplication}
          />
        )}
      </section>
    </div>
  );
}