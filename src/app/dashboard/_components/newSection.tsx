"use client"
import { useState, } from "react";
import { Card, CardContent, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, TrendingUp, BookOpen, Video, FileText } from "lucide-react";

const newsData = [
  {
    id: 1,
    title: "React 19 RC Released with New Features",
    category: "Frameworks",
    time: "2h ago",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    type: "article",
    trending: true
  },
  {
    id: 2,
    title: "AI Development Tools Transform Coding",
    category: "AI",
    time: "4h ago",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
    type: "video",
    trending: false
  },
  {
    id: 3,
    title: "The Future of Web Development",
    category: "Documentary",
    time: "6h ago",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    type: "documentary",
    trending: true
  },
  {
    id: 4,
    title: "JavaScript Performance Tips 2024",
    category: "Tutorial",
    time: "8h ago",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=200&fit=crop",
    type: "article",
    trending: false
  },
  {
    id: 5,
    title: "Cybersecurity Trends to Watch",
    category: "Security",
    time: "12h ago",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop",
    type: "article",
    trending: true
  },
  {
    id: 6,
    title: "Machine Learning Breakthrough 2024",
    category: "AI",
    time: "1d ago",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop",
    type: "article",
    trending: false
  },
  {
    id: 7,
    title: "Cloud Computing Evolution",
    category: "Cloud",
    time: "1d ago",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=200&fit=crop",
    type: "video",
    trending: true
  },
  {
    id: 8,
    title: "Blockchain Applications Beyond Crypto",
    category: "Blockchain",
    time: "2d ago",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
    type: "documentary",
    trending: false
  }
];

export const NewsSection = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "documentary":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

 return (
    <div className="h-screen flex flex-col"> {/* altura total da tela */}
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          Tech News
        </h2>
        <p className="text-sm text-gray-400 mt-1">Latest in technology</p>
      </div>

      {/* Aqui garantimos que o ScrollArea ocupe o restante da tela */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {newsData.map((item, index) => (
              <Card
                key={item.id}
                className="bg-slate-700/50 border-slate-600 hover:bg-slate-700 transition-all duration-300 cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-32 object-cover transition-transform duration-300 ${
                        hoveredItem === item.id ? "scale-105" : "scale-100"
                      }`}
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      {item.trending && (
                        <Badge className="bg-red-500/80 text-white text-xs animate-pulse">
                          Trending
                        </Badge>
                      )}
                      <Badge className="bg-black/60 text-white text-xs flex items-center gap-1">
                        {getIcon(item.type)}
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="text-center pt-4 pb-4">
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                Ver mais notícias →
              </button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

