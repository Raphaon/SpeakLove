import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Heart, Sparkles, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { getUserId, getCoupleId, getUserProfile } from '../utils/storage';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { motion, AnimatePresence } from 'motion/react';

interface GratitudeWallProps {
  onNavigate: (page: string) => void;
}

interface GratitudePost {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

const gratitudePrompts = [
  "Merci pour...",
  "J'apprécie vraiment quand tu...",
  "Tu m'as rendu(e) heureux/heureuse aujourd'hui en...",
  "Je suis reconnaissant(e) de...",
  "Ce que j'aime chez toi c'est...",
  "Tu as illuminé ma journée quand...",
  "Je me sens aimé(e) lorsque tu...",
  "Ta gentillesse se manifeste quand...",
];

export function GratitudeWall({ onNavigate }: GratitudeWallProps) {
  const [posts, setPosts] = useState<GratitudePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('');
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
      const [coupleRes, postsRes] = await Promise.all([
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        ),
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/gratitude`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        ),
      ]);

      const coupleData = await coupleRes.json();
      const postsData = await postsRes.json();

      if (coupleData.success) {
        setCoupleData(coupleData.couple);
      }

      if (postsData.success) {
        setPosts(postsData.posts || []);
      }
    } catch (err) {
      console.error('Error loading gratitude posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async () => {
    if (!newContent.trim() || !coupleId) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/gratitude`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            userName: profile?.firstName || 'Utilisateur',
            content: newContent.trim(),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setPosts([data.post, ...posts]);
        setNewContent('');
        setSelectedPrompt('');
        setShowAddForm(false);
      }
    } catch (err) {
      console.error('Error adding gratitude post:', err);
      alert('Erreur lors de l\'ajout. Veuillez réessayer.');
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!coupleId || !confirm('Supprimer ce message ?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/gratitude/${postId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setPosts(posts.filter(p => p.id !== postId));
      }
    } catch (err) {
      console.error('Error deleting post:', err);
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

  const myPosts = posts.filter(p => p.userId === userId);
  const partnerPosts = posts.filter(p => p.userId !== userId);
  const partnerName = coupleData?.user1Id === userId ? coupleData?.user2Name : coupleData?.user1Name;

  const getRandomColor = (index: number) => {
    const colors = [
      'from-purple-400 to-pink-400',
      'from-pink-400 to-rose-400',
      'from-rose-400 to-red-400',
      'from-purple-400 to-indigo-400',
      'from-pink-400 to-purple-400',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
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
              <h1 className="text-gray-900">Mur de Gratitude</h1>
              <p className="text-sm text-gray-600">Partagez votre reconnaissance 🙏</p>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pt-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl mb-1">🙏</p>
            <p className="text-gray-900">{posts.length}</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-4 text-center border border-purple-200">
            <p className="text-2xl mb-1">💜</p>
            <p className="text-purple-900">{myPosts.length}</p>
            <p className="text-xs text-purple-600">Mes messages</p>
          </div>
          <div className="bg-pink-50 rounded-2xl p-4 text-center border border-pink-200">
            <p className="text-2xl mb-1">💕</p>
            <p className="text-pink-900">{partnerPosts.length}</p>
            <p className="text-xs text-pink-600">{partnerName || 'Partenaire'}</p>
          </div>
        </div>

        {/* Gratitude Feed */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Chargement...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🙏</div>
            <p className="text-gray-600 mb-2">Aucun message de gratitude</p>
            <p className="text-sm text-gray-500">Commencez à partager votre reconnaissance !</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, index) => {
              const isMyPost = post.userId === userId;
              
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className={`relative rounded-3xl p-8 shadow-lg overflow-hidden ${
                    isMyPost
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                      : 'bg-gradient-to-br from-pink-500 to-rose-500'
                  }`}>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
                    
                    {/* Sparkles */}
                    <div className="absolute top-4 left-4">
                      <Sparkles className="h-6 w-6 text-white/50" />
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Heart className="h-6 w-6 text-white/50" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-white/90 text-sm mb-1">{post.userName}</p>
                          <p className="text-white/70 text-xs">
                            {new Date(post.createdAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>

                        {isMyPost && (
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-2 text-white/70 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      <p className="text-white text-lg leading-relaxed">
                        {post.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Info Cards */}
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
            <p className="text-sm text-purple-900">
              💡 <strong>Pouvoir de la gratitude :</strong> Exprimer sa reconnaissance renforce les liens 
              et crée un cercle vertueux de positivité. Le cerveau se concentre naturellement sur ce qui 
              va bien, améliorant ainsi le bien-être du couple.
            </p>
          </div>

          {posts.length >= 10 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-5 border-2 border-yellow-300"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">🏆</div>
                <div className="flex-1">
                  <p className="text-amber-900 mb-1">
                    <strong>Bravo !</strong> Vous avez partagé {posts.length} messages de gratitude
                  </p>
                  <p className="text-sm text-amber-700">
                    Vous cultivez activement la reconnaissance dans votre couple 💕
                  </p>
                </div>
              </div>
            </motion.div>
          )}
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
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🙏</div>
                <h2 className="text-gray-900 mb-2">Exprimez votre gratitude</h2>
                <p className="text-sm text-gray-600">Partagez ce qui vous rend reconnaissant(e)</p>
              </div>

              {/* Prompts */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-3">Suggestions d'amorces</label>
                <div className="flex flex-wrap gap-2">
                  {gratitudePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedPrompt(prompt);
                        setNewContent(prompt + ' ');
                      }}
                      className={`px-3 py-2 rounded-full text-sm transition-all ${
                        selectedPrompt === prompt
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Input */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">Votre message</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Ex: Merci d'avoir pris le temps de m'écouter ce soir. Ta présence compte énormément pour moi."
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-400 outline-none resize-none"
                  rows={5}
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2">
                  {newContent.length} caractères
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewContent('');
                    setSelectedPrompt('');
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleAddPost}
                  disabled={newContent.trim().length < 10}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Publier
                </Button>
              </div>

              {newContent.trim().length > 0 && newContent.trim().length < 10 && (
                <p className="text-xs text-red-500 mt-3 text-center">
                  Minimum 10 caractères requis
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
