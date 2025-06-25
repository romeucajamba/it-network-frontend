import {CoursesSection} from "./_components/courseSection";
import {SuggestionsSection} from "./_components/sugestionsSection";

const Carrer = () => {
  return (
    <div className="min-h-screen bg-slate-900">
        <div className="space-y-8">
            <CoursesSection />
            <SuggestionsSection />
        </div>
    </div>
  );
};

export default Carrer;