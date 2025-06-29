"use client"
import { User } from '@/hooks/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation'

interface SearchResultsProps {
  results: User[];
  isLoading?: boolean;
}

export const SearchResults = ({ results, isLoading = false }: SearchResultsProps) => {
  const route = useRouter();

  const handleUserClick = (userId: string) => {
    route.push(`/profile/${userId}`);
  };

  if (isLoading) {
    return (
      <Card className="mt-4">
        <CardContent className="p-4">
          <p className="text-gray-500 text-center">Pesquisando...</p>
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="mt-4">
        <CardContent className="p-4">
          <p className="text-gray-500 text-center">Nenhum usuário encontrado</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3">Resultados da pesquisa</h3>
        <div className="space-y-3">
          {results.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{user.name}</p>
                {user.bio && (
                  <p className="text-sm text-gray-500 truncate">{user.bio}</p>
                )}
              </div>
              {user.isConnected && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Conectado
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};