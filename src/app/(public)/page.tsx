import {Button} from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, MessageSquare, BookOpen, Settings, Star, Shield } from "lucide-react";
import Image from "next/image";
import Work from "@/assets/work.jpg"

export default function Wellcome() {

  const features = [
    {
      icon: Users,
      title: "Conecte-se com Desenvolvedores",
      description: "Encontre e colabore com desenvolvedores de todo o mundo. Construa sua rede profissional."
    },
    {
      icon: MessageSquare,
      title: "Conversas em Tempo Real",
      description: "Chat integrado para comunicação instantânea. Mantenha-se conectado com sua equipe."
    },
    {
      icon: BookOpen,
      title: "Espaço de trabalho",
      description: "Áreas dedicadas para interagir com a tua equipa."
    },
    {
      icon: Settings,
      title: "Grupos interativos",
      description: "Acesse e compartilhe recursos, tutoriais e documentações técnicas."
    }
  ];

  const stats = [
    { value: "10K+", label: "Desenvolvedores Ativos" },
    { value: "50+", label: "Linguagens Suportadas" },
    { value: "1M+", label: "Linhas de Código Compartilhadas" },
    { value: "24/7", label: "Suporte da Comunidade" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative z-10 px-4 lg:px-6 h-16 flex items-center border-b border-white/10 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <span className="text-xl font-bold text-white">Learning Platform</span>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/login">
            <Button 
            className="bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
            Começar Agora
          </Button>
          </Link>
          
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-20 lg:px-6 lg:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <div className="relative">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              A Rede Social para
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Desenvolvedores
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Conecte-se, aprenda e cresça junto com uma comunidade vibrante de desenvolvedores. 
              Compartilhe conhecimento, colabore em projetos e acelere sua carreira na tecnologia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
               <Link href="/login">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
                    
                    >
                    Junte-se à Comunidade
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
               </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-1 backdrop-blur-sm">
              <Image
                src={Work} 
                alt="Desenvolvedores colaborando"
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-500/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-500/30 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 lg:px-6 border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Descubra as ferramentas que irão transformar sua jornada como desenvolvedor
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="px-4 py-20 lg:px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Tecnologia de Ponta
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Construído com as mais modernas tecnologias para uma experiência excepcional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Segurança Avançada</h3>
              <p className="text-gray-300">Protocolos de segurança de última geração para proteger seus dados</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Performance Superior</h3>
              <p className="text-gray-300">Interface rápida e responsiva otimizada para produtividade</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Comunidade Ativa</h3>
              <p className="text-gray-300">Milhares de desenvolvedores prontos para colaborar</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 lg:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Pronto para Começar sua Jornada?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de desenvolvedores que já estão transformando suas carreiras
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button 
              size="lg" 
              className="bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg"
              >
               Criar Conta Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
             </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 lg:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold text-white">Learning Platform</span>
          </div>
          
          <p className="text-gray-400 mb-6">
            A plataforma que conecta desenvolvedores ao redor do mundo
          </p>
          
          <div className="text-gray-500 text-sm">
            © 2024 Learning Platform. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};