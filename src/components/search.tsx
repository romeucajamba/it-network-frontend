"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { useUsers } from '@/hooks/useUser';
import { SearchResults } from '@/components/userSearch';

export function SearchPage () {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();
  const { searchUsers } = useUsers();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    // Simular delay de busca
    setTimeout(() => {
      const results = searchUsers(searchTerm);
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value.trim()) {
      setSearchResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate.back()}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold text-blue-600 mb-6">
              Pesquisar Usuários
            </h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  name="search"
                  placeholder="Digite o nome do usuário..."
                  className="w-full h-11 pr-10"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Button 
                  type="submit" 
                  variant="ghost" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0 h-6 w-6"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Search Results */}
          {(searchTerm.trim() || searchResults.length > 0) && (
            <SearchResults results={searchResults} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
};
