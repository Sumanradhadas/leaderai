import { useState, useEffect } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Coins, FileEdit, Image, ClipboardList, LogOut } from "lucide-react";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";
import AdminTokenManager from "@/components/AdminTokenManager";
import AdminContentEditor from "@/components/AdminContentEditor";
import AdminTemplateManager from "@/components/AdminTemplateManager";
import AdminGenerationLogs from "@/components/AdminGenerationLogs";
import { useToast } from "@/hooks/use-toast";
import type { Campaign, Template, GenerationLog } from "@shared/schema";

const ADMIN_PASSWORD = "admin123";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [logs, setLogs] = useState<GenerationLog[]>([]);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  // Fetch campaign data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCampaignData();
    }
  }, [isAuthenticated]);

  const fetchCampaignData = async () => {
    try {
      setLoading(true);
      
      // Fetch first campaign
      const campaignsRes = await fetch('/api/campaigns');
      const campaignsData = await campaignsRes.json();
      
      if (campaignsData && campaignsData.length > 0) {
        const campaignData = campaignsData[0];
        setCampaign(campaignData);
        
        // Fetch templates for this campaign
        const templatesRes = await fetch(`/api/templates/${campaignData.id}`);
        const templatesData = await templatesRes.json();
        setTemplates(templatesData || []);
        
        // Fetch logs for this campaign
        const logsRes = await fetch(`/api/logs/${campaignData.id}`);
        const logsData = await logsRes.json();
        setLogs(logsData || []);
      }
    } catch (error) {
      console.error('Failed to fetch campaign data:', error);
      toast({
        title: "Error",
        description: "Failed to load campaign data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: "dashboard", title: "Dashboard", icon: LayoutDashboard },
    { id: "tokens", title: "Token Management", icon: Coins },
    { id: "content", title: "Content Editor", icon: FileEdit },
    { id: "templates", title: "Templates", icon: Image },
    { id: "logs", title: "Generation Logs", icon: ClipboardList },
  ];

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "4rem",
  };

  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveView("dashboard");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  const handleUpdateTokens = async (amount: number, operation: 'add' | 'subtract' | 'set') => {
    if (!campaign) return;
    
    try {
      let finalAmount = amount;
      
      // Calculate the amount to send to API based on operation
      if (operation === 'subtract') {
        finalAmount = -amount; // Convert to negative for subtraction
      } else if (operation === 'set') {
        finalAmount = amount - campaign.tokens; // Calculate difference
      }
      
      const response = await fetch(`/api/campaigns/${campaign.id}/tokens`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalAmount }),
      });
      
      if (response.ok) {
        const updated = await response.json();
        setCampaign(updated);
        
        // Show appropriate success message
        let message = '';
        if (operation === 'add') {
          message = `Successfully added ${amount} tokens`;
        } else if (operation === 'subtract') {
          message = `Successfully subtracted ${amount} tokens`;
        } else {
          message = `Token balance set to ${amount}`;
        }
        
        toast({
          title: "Tokens Updated",
          description: message,
        });
      } else {
        throw new Error('Failed to update tokens');
      }
    } catch (error) {
      console.error('Error updating tokens:', error);
      toast({
        title: "Error",
        description: "Failed to update tokens",
        variant: "destructive",
      });
    }
  };

  const handleAddTemplate = async (template: Omit<Template, "id">) => {
    if (!campaign) return;
    
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...template, campaignId: campaign.id }),
      });
      
      if (response.ok) {
        const newTemplate = await response.json();
        setTemplates([...templates, newTemplate]);
        toast({
          title: "Template Added",
          description: `${template.name} has been added successfully`,
        });
      } else {
        throw new Error('Failed to add template');
      }
    } catch (error) {
      console.error('Error adding template:', error);
      toast({
        title: "Error",
        description: "Failed to add template",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    const template = templates.find((t) => t.id === id);
    
    try {
      const response = await fetch(`/api/templates/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setTemplates(templates.filter((t) => t.id !== id));
        toast({
          title: "Template Deleted",
          description: `${template?.name} has been deleted`,
        });
      } else {
        throw new Error('Failed to delete template');
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive",
      });
    }
  };

  const handleSaveContent = async (data: Partial<Campaign>) => {
    if (!campaign) return;
    
    try {
      const response = await fetch(`/api/campaigns/${campaign.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        const updated = await response.json();
        setCampaign(updated);
        toast({
          title: "Content Saved",
          description: "Campaign content has been updated successfully",
        });
      } else {
        throw new Error('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (loading || !campaign) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading campaign data...</p>
      </div>
    );
  }

  // Calculate dashboard stats
  const totalGenerations = logs.length;
  const totalTokensUsed = logs.reduce((sum, log) => sum + log.tokensUsed, 0);
  const popularTemplate = logs.length > 0 
    ? logs.reduce((acc, log) => {
        acc[log.templateName] = (acc[log.templateName] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    : {};
  const mostPopularTemplate = Object.entries(popularTemplate).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-bold px-4 py-6">
                Campaign Admin
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveView(item.id)}
                        className={activeView === item.id ? "bg-sidebar-accent" : ""}
                        data-testid={`nav-${item.id}`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={handleLogout}
                      data-testid="nav-logout"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1">
          <header className="flex items-center gap-4 p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <h2 className="text-xl font-semibold">Admin Panel - {campaign.leaderName}</h2>
          </header>

          <main className="flex-1 overflow-auto p-8">
            {activeView === "dashboard" && (
              <AdminDashboard
                totalTokens={campaign.tokens + totalTokensUsed}
                usedTokens={totalTokensUsed}
                totalGenerations={totalGenerations}
                popularTemplate={mostPopularTemplate}
              />
            )}
            {activeView === "tokens" && (
              <AdminTokenManager
                currentTokens={campaign.tokens}
                onUpdateTokens={handleUpdateTokens}
              />
            )}
            {activeView === "content" && (
              <AdminContentEditor
                content={{
                  leaderName: campaign.leaderName,
                  partyName: campaign.partyName,
                  slogan: campaign.slogan,
                  aboutMessage: campaign.aboutMessage,
                  manifesto: campaign.manifesto,
                  primaryColor: campaign.primaryColor,
                  secondaryColor: campaign.secondaryColor,
                }}
                onSave={handleSaveContent}
              />
            )}
            {activeView === "templates" && (
              <AdminTemplateManager
                templates={templates}
                onAddTemplate={handleAddTemplate}
                onDeleteTemplate={handleDeleteTemplate}
              />
            )}
            {activeView === "logs" && <AdminGenerationLogs logs={logs} />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
