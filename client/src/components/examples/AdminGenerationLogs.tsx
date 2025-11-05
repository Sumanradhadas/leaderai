import AdminGenerationLogs from "../AdminGenerationLogs";

export default function AdminGenerationLogsExample() {
  const logs = [
    {
      id: "1",
      timestamp: new Date("2025-01-15T10:30:00"),
      templateName: "Patriotic Frame",
      tokensUsed: 10,
    },
    {
      id: "2",
      timestamp: new Date("2025-01-15T11:45:00"),
      templateName: "Social Media",
      tokensUsed: 10,
    },
    {
      id: "3",
      timestamp: new Date("2025-01-15T14:20:00"),
      templateName: "Vintage Poster",
      tokensUsed: 10,
    },
  ];

  return (
    <div className="p-8 bg-background min-h-screen">
      <AdminGenerationLogs logs={logs} />
    </div>
  );
}
