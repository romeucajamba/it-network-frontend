"use client"
import {NewsSection} from "./_components/newSection";
import {Feed} from "./_components/feed";
import { Stories } from "./_components/stories/strories";

const Dashboard = () => {

  return (
    <div className="flex h-screen bg-slate-900">
      <div className="flex-1 flex">
        {/* Left News Section */}
        <div className="w-80 bg-slate-800 border-r border-slate-700 overflow-hidden">
          <NewsSection />
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Stories/>
          <div className="flex-1 overflow-hidden">
            {/* Tabs Content */}
            <div className="flex-1 overflow-hidden">
                <Feed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;