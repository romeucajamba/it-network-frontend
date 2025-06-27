import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  MapPin, 
  Users, 
  BookOpen, 
  Award,
  ExternalLink,
  Clock
} from "lucide-react";

interface Teacher {
  id: number;
  name: string;
  profession: string;
  image: string;
  bio: string;
  location: string;
  rating: number;
  students: string;
  courses: string[];
  expertise: string[];
  experience: string;
}

interface TeacherModalProps {
  teacher: Teacher;
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherModal = ({ teacher, isOpen, onClose }: TeacherModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Perfil do Professor
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Photo and Basic Info */}
          <div className="space-y-4">
            <div className="text-center">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-purple-500"
              />
              <h3 className="text-xl font-semibold">{teacher.name}</h3>
              <p className="text-gray-400 mb-2">{teacher.profession}</p>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold">{teacher.rating}</span>
                <span className="text-gray-400">rating</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Users className="w-4 h-4" />
                <span>{teacher.students} estudantes</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>{teacher.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>{teacher.experience}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio Section */}
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Biografia
              </h4>
              <p className="text-gray-300 leading-relaxed">{teacher.bio}</p>
            </div>

            {/* Expertise Section */}
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-green-400" />
                Áreas de Especialização
              </h4>
              <div className="flex flex-wrap gap-2">
                {teacher.expertise.map((skill, index) => (
                  <Badge 
                    key={index} 
                    className="bg-purple-600/20 text-purple-300 border-purple-500"
                    variant="outline"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Courses Section */}
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-yellow-400" />
                Principais Cursos
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {teacher.courses.map((course, index) => (
                  <div 
                    key={index}
                    className="bg-slate-700 p-3 rounded-lg border border-slate-600 hover:bg-slate-600 transition-colors"
                  >
                    <h5 className="font-medium mb-1">{course}</h5>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>4.{Math.floor(Math.random() * 9) + 1}</span>
                      <span>•</span>
                      <span>{Math.floor(Math.random() * 50) + 10}k estudantes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-slate-700">
              <Button 
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={() => window.open('https://coursera.org', '_blank')}
              >
                Ver Cursos no Coursera
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline"
                className="flex-1 border-purple-500 text-purple-300 hover:bg-purple-600/20"
                onClick={() => window.open('https://udemy.com', '_blank')}
              >
                Ver no Udemy
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};