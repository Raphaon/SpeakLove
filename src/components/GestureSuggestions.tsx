import { useState } from 'react';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { LoveLanguageCode, loveLanguages, getAllLanguages } from '../data/loveLanguages';
import { RelationshipType, relationshipTypeLabels, gestureIdeas, getGesturesByLanguageAndRelation } from '../data/gestureIdeas';

interface GestureSuggestionsProps {
  initialLanguage?: LoveLanguageCode;
  onBack: () => void;
}

export function GestureSuggestions({ initialLanguage, onBack }: GestureSuggestionsProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<LoveLanguageCode | 'all'>(initialLanguage || 'all');
  const [selectedRelation, setSelectedRelation] = useState<RelationshipType | 'all'>('all');

  // Filtrer les gestes
  const filteredGestures = gestureIdeas.filter(gesture => {
    const languageMatch = selectedLanguage === 'all' || gesture.codeLangage === selectedLanguage;
    const relationMatch = selectedRelation === 'all' || gesture.relationshipTypes.includes(selectedRelation);
    return languageMatch && relationMatch;
  });

  const allLanguages = getAllLanguages();
  const currentLanguage = selectedLanguage !== 'all' ? loveLanguages[selectedLanguage] : null;

  const categoryIcons: Record<string, string> = {
    cadeau: '🎁',
    moment: '⏰',
    service: '🤝',
    message: '💬',
    physique: '🤗'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto py-8 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
          
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-pink-600">Idées de Gestes d'Amour</h1>
            <p className="text-gray-600">
              Trouvez des idées concrètes pour exprimer votre amour selon le langage et la relation
            </p>
          </div>
        </div>

        {/* Filtres */}
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle>Filtrer les suggestions</CardTitle>
            <CardDescription>
              Personnalisez les suggestions selon vos besoins
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Filtre Langage */}
              <div className="space-y-2">
                <label className="text-sm">Langage d'amour</label>
                <Select value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as LoveLanguageCode | 'all')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les langages</SelectItem>
                    {allLanguages.map(lang => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Filtre Relation */}
              <div className="space-y-2">
                <label className="text-sm">Type de relation</label>
                <Select value={selectedRelation} onValueChange={(value) => setSelectedRelation(value as RelationshipType | 'all')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les relations</SelectItem>
                    {Object.entries(relationshipTypeLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {currentLanguage && (
              <div className="p-4 rounded-lg" style={{ backgroundColor: currentLanguage.color + '15' }}>
                <p className="text-sm" style={{ color: currentLanguage.color }}>
                  <strong>{currentLanguage.label}</strong> : {currentLanguage.descriptionCourte}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Résultats */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-700">{filteredGestures.length} idée{filteredGestures.length > 1 ? 's' : ''} trouvée{filteredGestures.length > 1 ? 's' : ''}</h2>
          </div>

          {filteredGestures.length === 0 ? (
            <Card className="border-2 border-gray-200">
              <CardContent className="py-12 text-center space-y-2">
                <p className="text-gray-600">Aucune suggestion ne correspond à vos critères.</p>
                <p className="text-sm text-gray-500">Essayez de modifier vos filtres.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGestures.map(gesture => {
                const language = loveLanguages[gesture.codeLangage];
                return (
                  <Card key={gesture.id} className="border-2 hover:border-purple-300 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2">
                            <span>{categoryIcons[gesture.categorie]}</span>
                            <span>{gesture.title}</span>
                          </CardTitle>
                        </div>
                        <Badge 
                          style={{ 
                            backgroundColor: language.color + '20',
                            color: language.color,
                            borderColor: language.color
                          }}
                          className="border"
                        >
                          {language.shortLabel}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-700">
                        {gesture.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {gesture.relationshipTypes.slice(0, 3).map(relType => (
                          <Badge key={relType} variant="outline" className="text-xs">
                            {relationshipTypeLabels[relType]}
                          </Badge>
                        ))}
                        {gesture.relationshipTypes.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{gesture.relationshipTypes.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Info box */}
        <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-0">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Heart className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Astuce :</strong> Les gestes les plus efficaces sont ceux qui correspondent 
                  au langage d'amour principal de la personne.
                </p>
                <p>
                  N'oubliez pas : ce n'est pas la taille du geste qui compte, mais l'intention et 
                  la régularité !
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
