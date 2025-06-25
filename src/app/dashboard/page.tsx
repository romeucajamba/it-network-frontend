import {MainContent} from "./_components/mainContent";
import { VirtualAssistant } from "@/components/virtualAssistent";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="flex-1 flex">
        <MainContent />
        <VirtualAssistant />
      </div>
    </div>
  );
};

export default Dashboard;