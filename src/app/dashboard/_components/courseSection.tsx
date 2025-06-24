"use client"
import Image from "next/image";
import UserLogo from "@/assets/user.svg";


export const CoursesSection = () => {
  const courses = [
    {
      id: 1,
      instructor: "Eleanor Pena",
      role: "Dog Trainer",
      description: "Lorem ipsum dolor sit amet",
      avatar: UserLogo,
      online: true
    },
    {
      id: 2,
      instructor: "Kathryn Murphy",
      role: "Medical Assistant", 
      description: "Lorem ipsum dolor sit amet",
      avatar: UserLogo,
      online: false
    }
  ];

  const platforms = [
    {
      id: 1,
      instructor: "Wade Warren",
      role: "Web Designer",
      description: "Lorem ipsum dolor sit amet",
      avatar: UserLogo
    },
    {
      id: 2,
      instructor: "Marvin McKinney", 
      role: "Nursing Assistant",
      description: "Lorem ipsum dolor sit amet",
      avatar: UserLogo
    }
  ];

  return (
    <div className="space-y-8">
      {/* Cursos e Professores */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-6">Cursos e Professores</h2>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={course.avatar} 
                      alt={course.instructor} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {course.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">{course.instructor}</h4>
                  <p className="text-gray-400 text-sm mb-2">{course.role}</p>
                  <p className="text-gray-300 text-sm">{course.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plataformas e sites para aprendizado */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-6">Plataformas e sites para aprendizado</h2>
        <div className="space-y-4">
          {platforms.map((platform) => (
            <div key={platform.id} className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image 
                    src={platform.avatar} 
                    alt={platform.instructor} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">{platform.instructor}</h4>
                  <p className="text-gray-400 text-sm mb-2">{platform.role}</p>
                  <p className="text-gray-300 text-sm">{platform.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};