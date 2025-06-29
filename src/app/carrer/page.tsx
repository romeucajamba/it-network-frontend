"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  ExternalLink, 
  Star, 
  Clock,
  Globe,
  Award,
  Laptop,
  Brain
} from "lucide-react";
import {TeacherModal } from "./_components/teacherModel";
import Link from "next/link";


const Career = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [activeTab, setActiveTab] = useState("professors");
  

  const professors = [
    {
      id: 1,
      name: "Andrew Ng",
      profession: "AI/Machine Learning Expert",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      bio: "Co-founder of Coursera, former Stanford professor, and leading AI researcher. Pioneer in deep learning and online education.",
      location: "Stanford, California",
      rating: 4.9,
      students: "5M+",
      courses: ["Machine Learning", "Deep Learning", "AI for Everyone"],
      expertise: ["Machine Learning", "Deep Learning", "AI Strategy"],
      experience: "20+ years in AI research and education"
    },
    {
      id: 2,
      name: "Andrei Neagoie",
      profession: "Full Stack Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      bio: "Senior software developer and instructor with expertise in modern web technologies. Founder of Zero To Mastery Academy.",
      location: "Toronto, Canada",
      rating: 4.8,
      students: "1M+",
      courses: ["Complete Web Developer", "JavaScript", "React", "Python"],
      expertise: ["JavaScript", "React", "Python", "Full Stack Development"],
      experience: "15+ years in software development"
    },
    {
      id: 3,
      name: "Angela Yu",
      profession: "App Development Instructor",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      bio: "Lead instructor at App Brewery, specializing in iOS and web development. Expert in Swift, Flutter, and modern app development.",
      location: "London, UK",
      rating: 4.9,
      students: "3M+",
      courses: ["iOS Development", "Flutter", "Web Development Bootcamp"],
      expertise: ["iOS Development", "Flutter", "Swift", "Dart"],
      experience: "12+ years in app development"
    },
    {
      id: 4,
      name: "Maximilian Schwarzmüller",
      profession: "Web Development Expert",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      bio: "Professional web developer and instructor, specializing in modern JavaScript frameworks and backend technologies.",
      location: "Munich, Germany",
      rating: 4.7,
      students: "2M+",
      courses: ["React", "Vue.js", "Node.js", "Angular"],
      expertise: ["React", "Vue.js", "Node.js", "TypeScript"],
      experience: "10+ years in web development"
    }
  ];

  const platforms = [
    {
      name: "Coursera",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      description: "University-level courses from top institutions",
      url: "https://coursera.org",
      courses: ["Machine Learning", "Data Science", "Computer Science"],
      rating: 4.6
    },
    {
      name: "Udemy",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop",
      description: "Practical skills and professional development",
      url: "https://udemy.com",
      courses: ["Web Development", "Programming", "Business"],
      rating: 4.5
    },
    {
      name: "Microsoft Learn",
      logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop",
      description: "Free learning paths for Microsoft technologies",
      url: "https://docs.microsoft.com/learn",
      courses: ["Azure", "Power Platform", ".NET"],
      rating: 4.7
    },
    {
      name: "LinkedIn Learning",
      logo: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=100&h=100&fit=crop",
      description: "Professional skills and career development",
      url: "https://linkedin.com/learning",
      courses: ["Leadership", "Software Development", "Data Analysis"],
      rating: 4.4
    }
  ];

  const books = [
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop",
      description: "A handbook of agile software craftsmanship",
      rating: 4.8,
      price: "$45"
    },
    {
      title: "Computer Networking: A Top-Down Approach",
      author: "James Kurose",
      category: "Networking",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=300&fit=crop",
      description: "Comprehensive guide to computer networking",
      rating: 4.6,
      price: "$89"
    },
    {
      title: "The Art of Electronics",
      author: "Paul Horowitz",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=300&fit=crop",
      description: "Classic electronics engineering textbook",
      rating: 4.9,
      price: "$125"
    },
    {
      title: "Design Patterns",
      author: "Gang of Four",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=300&fit=crop",
      description: "Elements of reusable object-oriented software",
      rating: 4.7,
      price: "$55"
    }
  ];

  const schools = [
    {
      name: "MIT",
      location: "Cambridge, MA",
      specialty: "Computer Science & AI",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=200&fit=crop",
      rating: 4.9,
      programs: ["Computer Science", "AI", "Robotics"]
    },
    {
      name: "Stanford University",
      location: "Stanford, CA",
      specialty: "Technology & Innovation",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=300&h=200&fit=crop",
      rating: 4.8,
      programs: ["CS", "HCI", "Data Science"]
    },
    {
      name: "Carnegie Mellon",
      location: "Pittsburgh, PA",
      specialty: "Software Engineering",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=200&fit=crop",
      rating: 4.7,
      programs: ["Software Engineering", "Cybersecurity", "AI"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Centro de Carreira</h1>
              <p className="text-xl text-purple-100">
                Desenvolva suas habilidades com os melhores recursos
              </p>
            </div>
            <Link href="/dashboard">
               <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer"
                >
                 Voltar ao Dashboard
                </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 mb-8">
            <TabsTrigger value="professors" className="data-[state=active]:bg-white cursor-pointer data-[state=active]:text-black text-gray-100">
              <Users className="w-4 h-4 mr-2" />
              Professores
            </TabsTrigger>
            <TabsTrigger value="platforms" className="data-[state=active]:bg-white cursor-pointer data-[state=active]:text-black text-gray-100">
              <Globe className="w-4 h-4 mr-2" />
              Plataformas
            </TabsTrigger>
            <TabsTrigger value="schools" className="data-[state=active]:bg-white cursor-pointer data-[state=active]:text-black text-gray-100">
              <GraduationCap className="w-4 h-4 mr-2" />
              Escolas
            </TabsTrigger>
            <TabsTrigger value="books" className="data-[state=active]:bg-white cursor-pointer data-[state=active]:text-black text-gray-100">
              <BookOpen className="w-4 h-4 mr-2" />
              Livros
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-white cursor-pointer data-[state=active]:text-black text-gray-100">
              <Brain className="w-4 h-4 mr-2" />
              Recursos
            </TabsTrigger>
          </TabsList>

          {/* Professors Tab */}
          <TabsContent value="professors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {professors.map((professor, index) => (
                <Card 
                  key={professor.id}
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedTeacher(professor)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={professor.image}
                        alt={professor.name}
                        className="w-20 h-20 rounded-full mb-4 group-hover:scale-105 transition-transform"
                      />
                      <h3 className="text-lg font-semibold mb-2 text-white">{professor.name}</h3>
                      <p className="text-sm text-gray-400 mb-3">{professor.profession}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-blue-600">{professor.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">{professor.students} estudantes</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Platforms Tab */}
          <TabsContent value="platforms">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platforms.map((platform, index) => (
                <Card 
                  key={platform.name}
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <img
                        src={platform.logo}
                        alt={platform.name}
                        className="w-12 h-12 rounded-lg"
                      />
                      <div>
                        <CardTitle className="text-lg text-white">{platform.name}</CardTitle>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-blue-600">{platform.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">{platform.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {platform.courses.map((course) => (
                        <Badge key={course} variant="secondary" className="bg-purple-600/20 text-purple-300">
                          {course}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      className="w-full cursor-pointer bg-blue-600 hover:bg-blue-500"
                      onClick={() => window.open(platform.url, '_blank')}
                    >
                      Visitar Plataforma
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schools Tab */}
          <TabsContent value="schools">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schools.map((school, index) => (
                <Card 
                  key={school.name}
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <img
                      src={school.image}
                      alt={school.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 rounded flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm">{school.rating}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{school.name}</h3>
                    <p className="text-gray-400 mb-2">{school.location}</p>
                    <p className="text-sm text-gray-500 mb-4">{school.specialty}</p>
                    <div className="flex flex-wrap gap-2">
                      {school.programs.map((program) => (
                        <Badge key={program} variant="outline" className="border-purple-500 text-purple-300">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Books Tab */}
          <TabsContent value="books">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book, index) => (
                <Card 
                  key={book.title}
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{book.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">por {book.author}</p>
                    <Badge className="mb-3 bg-blue-600/20 text-blue-300">{book.category}</Badge>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-3">{book.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{book.rating}</span>
                      </div>
                      <span className="text-lg font-semibold text-purple-400">{book.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    Certificações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• AWS Certified Solutions Architect</li>
                    <li>• Google Cloud Professional</li>
                    <li>• Microsoft Azure Fundamentals</li>
                    <li>• CompTIA Security+</li>
                    <li>• Cisco CCNA</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Laptop className="w-5 h-5 text-blue-400" />
                    Ferramentas de Desenvolvimento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Visual Studio Code</li>
                    <li>• Git & GitHub</li>
                    <li>• Docker</li>
                    <li>• Postman</li>
                    <li>• Figma</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-400" />
                    Roadmaps de Carreira
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Frontend Developer</li>
                    <li>• Backend Developer</li>
                    <li>• DevOps Engineer</li>
                    <li>• Data Scientist</li>
                    <li>• Cybersecurity Specialist</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Teacher Modal */}
      {selectedTeacher && (
        <TeacherModal
          teacher={selectedTeacher}
          isOpen={!!selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />
      )}
    </div>
  );
};

export default Career;