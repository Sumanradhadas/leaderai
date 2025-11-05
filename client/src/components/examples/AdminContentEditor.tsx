import AdminContentEditor from "../AdminContentEditor";

export default function AdminContentEditorExample() {
  const content = {
    leaderName: "John Mitchell",
    partyName: "Progressive Alliance Party",
    slogan: "Together, We Build Tomorrow",
    aboutMessage: "John Mitchell has dedicated his life to public service...",
    manifesto: "## Healthcare for All\nWe believe healthcare is a right...",
    primaryColor: "#DC2626",
    secondaryColor: "#1E40AF",
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <AdminContentEditor
        content={content}
        onSave={(data) => console.log("Save content:", data)}
      />
    </div>
  );
}
