import AdminTokenManager from "../AdminTokenManager";

export default function AdminTokenManagerExample() {
  return (
    <div className="p-8 bg-background min-h-screen">
      <AdminTokenManager
        currentTokens={350}
        onAddTokens={(amount) => console.log("Add tokens:", amount)}
      />
    </div>
  );
}
