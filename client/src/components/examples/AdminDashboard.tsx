import AdminDashboard from "../AdminDashboard";

export default function AdminDashboardExample() {
  return (
    <div className="p-8 bg-background min-h-screen">
      <AdminDashboard
        totalTokens={500}
        usedTokens={150}
        totalGenerations={15}
        popularTemplate="Patriotic Frame"
      />
    </div>
  );
}
