type StatCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
};

export default function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <h2 className="mt-2 text-3xl font-bold text-gray-900">{value}</h2>
      <p className="mt-2 text-sm text-gray-700">{subtitle}</p>
    </div>
  );
}