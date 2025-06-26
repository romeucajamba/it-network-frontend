import {MainContent} from "./_components/mainContent";
import { VirtualAssistant } from "@/components/virtualAssistent";

const Dashboard = () => {
  return (
    <div className="bg-slate-900 flex-1 flex">
        <MainContent />
        <VirtualAssistant />
    </div>
  );
};

export default Dashboard;