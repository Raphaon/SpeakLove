import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Heart, Gift, MessageCircle, Sparkles, Trash2, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { getUserId, getCoupleId, getUserProfile } from '../utils/storage';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { motion, AnimatePresence } from 'motion/react';

interface SharedWishlistProps {
  onNavigate: (page: string) => void;
}

interface WishlistItem {
  id: string;
  userId: string;
  userName: string;
  category: 'material-gift' | 'action' | 'sweet-words';
  content: string;
  notes?: string;
  completed: boolean;
  completedBy?: string;
  completedByName?: string;
  completedAt?: string;
  createdAt: string;
}

const categories = [
  { id: 'material-gift', label: 'Cadeaux matériels', icon: Gift, color: 'purple', emoji: '🎁' },
  { id: 'action', label: 'Actions à faire', icon: Heart, color: 'pink', emoji: '💝' },
  { id: 'sweet-words', label: 'Mots doux à entendre', icon: MessageCircle, color: 'blue', emoji: '💬' },
];

export function SharedWishlist({ onNavigate }: SharedWishlistProps) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('material-gift');
  const [newContent, setNewContent] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [filterView, setFilterView] = useState<'all' | 'mine' | 'partner'>('all');
  const [coupleData, setCoupleData] = useState<any>(null);

  const userId = getUserId();
  const coupleId = getCoupleId();
  const profile = getUserProfile();

  useEffect(() => {
    if (coupleId) {
      loadData();
    }
  }, [coupleId]);

  const loadData = async () => {
    if (!coupleId) return;

    try {
      const [coupleRes, itemsRes] = await Promise.all([
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        ),
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/wishlist`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        ),
      ]);

      const coupleData = await coupleRes.json();
      const itemsData = await itemsRes.json();

      if (coupleData.success) {
        setCoupleData(coupleData.couple);
      }

      if (itemsData.success) {
        setItems(itemsData.items || []);
      }
    } catch (err) {
      console.error('Error loading wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!newContent.trim() || !coupleId) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/wishlist`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            userName: profile?.firstName || 'Utilisateur',
            category: selectedCategory,
            content: newContent.trim(),
            notes: newNotes.trim() || undefined,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setItems([...items, data.item]);
        setNewContent('');
        setNewNotes('');
        setShowAddForm(false);
      }
    } catch (err) {
      console.error('Error adding wishlist item:', err);
      alert('Erreur lors de l\'ajout. Veuillez réessayer.');
    }
  };

  const handleToggleComplete = async (itemId: string, currentCompleted: boolean) => {
    if (!coupleId) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/wishlist/${itemId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: !currentCompleted,
            completedBy: !currentCompleted ? userId : undefined,
            completedByName: !currentCompleted ? (profile?.firstName || 'Utilisateur') : undefined,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setItems(items.map(item => 
          item.id === itemId ? data.item : item
        ));
      }
    } catch (err) {
      console.error('Error toggling complete:', err);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!coupleId || !confirm('Supprimer cet élément ?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/wishlist/${itemId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setItems(items.filter(item => item.id !== itemId));
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  if (!coupleId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Vous devez être lié(e) en couple pour accéder à cette fonctionnalité.</p>
          <Button onClick={() => onNavigate('couple-setup')}>
            Créer un lien couple
          </Button>
        </div>
      </div>
    );
  }

  const filteredItems = items.filter(item => {
    if (filterView === 'mine') return item.userId === userId;
    if (filterView === 'partner') return item.userId !== userId;
    return true;
  });

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(c => c.id === categoryId) || categories[0];
  };

  const partnerName = coupleData?.user1Id === userId ? coupleData?.user2Name : coupleData?.user1Name;

  return (
    <div className="min-h-screen bg-[#FFF5F7] pb-8">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('dashboard')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-gray-900">Liste d'Envies Partagée</h1>
              <p className="text-sm text-gray-600">Partagez vos souhaits 💝</p>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-[#E91E63] hover:bg-[#C2185B] text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pt-8 space-y-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-sm">
          <button
            onClick={() => setFilterView('all')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              filterView === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Tout voir
          </button>
          <button
            onClick={() => setFilterView('mine')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              filterView === 'mine'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Mes envies
          </button>
          <button
            onClick={() => setFilterView('partner')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              filterView === 'partner'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {partnerName || 'Partenaire'}
          </button>
        </div>

        {/* Items by Category */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Chargement...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💝</div>
            <p className="text-gray-600 mb-2">Aucun souhait pour le moment</p>
            <p className="text-sm text-gray-500">Ajoutez vos envies pour que votre partenaire puisse vous surprendre !</p>
          </div>
        ) : (
          <div className="space-y-6">
            {categories.map(category => {
              const categoryItems = filteredItems.filter(item => item.category === category.id);
              
              if (categoryItems.length === 0) return null;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full bg-${category.color}-100 flex items-center justify-center`}>
                      <span className="text-xl">{category.emoji}</span>
                    </div>
                    <div>
                      <h3 className="text-gray-900">{category.label}</h3>
                      <p className="text-sm text-gray-500">{categoryItems.length} élément{categoryItems.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {categoryItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`bg-white rounded-2xl p-5 shadow-sm border-2 transition-all ${
                          item.completed
                            ? 'border-green-200 bg-green-50/50'
                            : 'border-gray-100 hover:border-purple-200'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <button
                            onClick={() => handleToggleComplete(item.id, item.completed)}
                            className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                              item.completed
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-300 hover:border-purple-500'
                            }`}
                          >
                            {item.completed && <Check className="h-4 w-4 text-white" />}
                          </button>

                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <p className={`text-gray-900 mb-1 ${item.completed ? 'line-through text-gray-500' : ''}`}>
                                  {item.content}
                                </p>
                                {item.notes && (
                                  <p className="text-sm text-gray-500 mb-2">💭 {item.notes}</p>
                                )}
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                  <span className={item.userId === userId ? 'text-purple-600' : 'text-pink-600'}>
                                    {item.userName}
                                  </span>
                                  {item.completed && (
                                    <span className="text-green-600">
                                      ✓ Réalisé par {item.completedByName}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {item.userId === userId && (
                                <button
                                  onClick={() => handleDeleteItem(item.id)}
                                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Info Card */}
        <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
          <p className="text-sm text-purple-900">
            💡 <strong>Astuce :</strong> Soyez spécifique dans vos souhaits ! Plus c'est précis, 
            plus il sera facile pour votre partenaire de vous surprendre.
          </p>
        </div>
      </div>

      {/* Add Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
            >
              <h2 className="text-gray-900 mb-6">Ajouter un souhait</h2>

              {/* Category Selection */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-3">Catégorie</label>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedCategory === category.id
                          ? `bg-${category.color}-100 border-${category.color}-400`
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.emoji}</span>
                        <span className="text-gray-900">{category.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Input */}
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-2">Votre souhait</label>
                <Input
                  type="text"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Ex: Un bouquet de fleurs, Un dîner en tête-à-tête, Que tu me dises que tu es fier(e) de moi..."
                  className="w-full"
                />
              </div>

              {/* Notes Input */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">Notes (optionnel)</label>
                <Input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Ex: J'adore les roses rouges, Le restaurant italien près de chez nous..."
                  className="w-full"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleAddItem}
                  disabled={!newContent.trim()}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  Ajouter
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}