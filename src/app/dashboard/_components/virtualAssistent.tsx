"use client"

export const VirtualAssistant = () => {
  return (
    <div className="w-80 bg-slate-800 p-6 flex flex-col">
      {/* Assistente Virtual */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Assistente virtual</h3>
          <div className="text-gray-300 text-sm">
            <p>Olá bom dia.</p>
            <p>No que posso ser útil?</p>
          </div>
        </div>
      </div>

      {/* Seu desempenho */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white mb-6">Seu desempenho</h3>
        
        <div className="bg-slate-700 rounded-xl p-6 text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            {/* Ilustração de performance */}
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <div className="text-white">
                <div className="text-3xl font-bold mb-1">85%</div>
                <div className="text-xs">Progresso</div>
              </div>
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">📈</span>
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">📊</span>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Cursos concluídos:</span>
              <span className="text-white font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span>Horas de estudo:</span>
              <span className="text-white font-medium">45h</span>
            </div>
            <div className="flex justify-between">
              <span>Pontuação:</span>
              <span className="text-white font-medium">850</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};