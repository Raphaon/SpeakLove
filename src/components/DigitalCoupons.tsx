import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Gift, Heart, Clock, Coffee, Sparkles, Check, Trash2, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { getUserId, getCoupleId, getUserProfile } from '../utils/storage';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { motion, AnimatePresence } from 'motion/react';
import { loveLanguages } from '../data/loveLanguages';

interface DigitalCouponsProps {
  onNavigate: (page: string) => void;
}

interface Coupon {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  title: string;
  description?: string;
  loveLanguage: string;
  validUntil?: string;
  redeemed: boolean;
  redeemedAt?: string;
  createdAt: string;
}

const couponTemplates = [
  { id: 'massage', title: 'Massage de 15 min', language: 'touch', emoji: '💆', desc: 'Un moment de détente et de connexion' },
  { id: 'quality-time', title: 'Soirée sans téléphone', language: 'quality-time', emoji: '📵', desc: '2h rien que nous deux' },
  { id: 'breakfast', title: 'Petit-déjeuner au lit', language: 'acts', emoji: '☕', desc: 'Je prépare tout avec amour' },
  { id: 'compliment', title: '3 compliments sincères', language: 'words', emoji: '💬', desc: 'Des mots qui viennent du cœur' },
  { id: 'date-night', title: 'Soirée surprise', language: 'quality-time', emoji: '🌙', desc: 'Je m\'occupe de tout' },
  { id: 'gift', title: 'Petit cadeau surprise', language: 'gifts', emoji: '🎁', desc: 'Quelque chose qui te fera plaisir' },
  { id: 'help', title: 'Je fais tes corvées', language: 'acts', emoji: '🧹', desc: 'Une journée sans tâches ménagères' },
  { id: 'hug', title: 'Câlin de 10 min', language: 'touch', emoji: '🤗', desc: 'Juste nous, dans les bras l\'un de l\'autre' },
];

export function DigitalCoupons({ onNavigate }: DigitalCouponsProps) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customTitle, setCustomTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('quality-time');
  const [validDays, setValidDays] = useState('30');
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
      const [coupleRes, couponsRes] = await Promise.all([
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        ),
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/coupons`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        ),
      ]);

      const coupleData = await coupleRes.json();
      const couponsData = await couponsRes.json();

      if (coupleData.success) {
        setCoupleData(coupleData.couple);
      }

      if (couponsData.success) {
        setCoupons(couponsData.coupons || []);
      }
    } catch (err) {
      console.error('Error loading coupons:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCoupon = async () => {
    if (!coupleId) return;

    const template = couponTemplates.find(t => t.id === selectedTemplate);
    const title = template ? template.title : customTitle;
    const description = template ? template.desc : customDescription;
    const language = template ? template.language : selectedLanguage;

    if (!title.trim()) return;

    const partnerId = coupleData?.user1Id === userId ? coupleData?.user2Id : coupleData?.user1Id;
    const partnerName = coupleData?.user1Id === userId ? coupleData?.user2Name : coupleData?.user1Name;

    if (!partnerId) return;

    try {
      const validUntil = new Date();
      validUntil.setDate(validUntil.getDate() + parseInt(validDays));

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/coupons`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fromUserId: userId,
            fromUserName: profile?.firstName || 'Utilisateur',
            toUserId: partnerId,
            toUserName: partnerName,
            title: title.trim(),
            description: description.trim() || undefined,
            loveLanguage: language,
            validUntil: validUntil.toISOString(),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setCoupons([data.coupon, ...coupons]);
        setShowCreateForm(false);
        setSelectedTemplate('');
        setCustomTitle('');
        setCustomDescription('');
      }
    } catch (err) {
      console.error('Error creating coupon:', err);
      alert('Erreur lors de la création. Veuillez réessayer.');
    }
  };

  const handleRedeemCoupon = async (couponId: string) => {
    if (!coupleId || !confirm('Échanger ce coupon maintenant ?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/coupons/${couponId}/redeem`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setCoupons(coupons.map(c => c.id === couponId ? data.coupon : c));
      }
    } catch (err) {
      console.error('Error redeeming coupon:', err);
    }
  };

  const handleDeleteCoupon = async (couponId: string) => {
    if (!coupleId || !confirm('Supprimer ce coupon ?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/coupons/${couponId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setCoupons(coupons.filter(c => c.id !== couponId));
      }
    } catch (err) {
      console.error('Error deleting coupon:', err);
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

  const sentCoupons = coupons.filter(c => c.fromUserId === userId);
  const receivedCoupons = coupons.filter(c => c.toUserId === userId);
  const activeSentCoupons = sentCoupons.filter(c => !c.redeemed);
  const activeReceivedCoupons = receivedCoupons.filter(c => !c.redeemed);

  const getLoveLanguageData = (langId: string) => {
    return loveLanguages.find(l => l.id === langId) || loveLanguages[0];
  };

  const isExpired = (validUntil?: string) => {
    if (!validUntil) return false;
    return new Date(validUntil) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
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
              <h1 className="text-gray-900">Bons Digitaux</h1>
              <p className="text-sm text-gray-600">Échangeables dans la vraie vie 🎟️</p>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <Plus className="mr-2 h-4 w-4" />
              Créer
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pt-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl mb-1">🎟️</p>
            <p className="text-gray-900">{coupons.length}</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-4 text-center border border-green-200">
            <p className="text-2xl mb-1">✨</p>
            <p className="text-green-900">{activeSentCoupons.length + activeReceivedCoupons.length}</p>
            <p className="text-xs text-green-600">Actifs</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-4 text-center border border-purple-200">
            <p className="text-2xl mb-1">📤</p>
            <p className="text-purple-900">{sentCoupons.length}</p>
            <p className="text-xs text-purple-600">Envoyés</p>
          </div>
          <div className="bg-pink-50 rounded-2xl p-4 text-center border border-pink-200">
            <p className="text-2xl mb-1">📥</p>
            <p className="text-pink-900">{receivedCoupons.length}</p>
            <p className="text-xs text-pink-600">Reçus</p>
          </div>
        </div>

        {/* Received Coupons (Active) */}
        {activeReceivedCoupons.length > 0 && (
          <div>
            <h3 className="text-gray-900 mb-4">Vos bons à utiliser 🎁</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeReceivedCoupons.map((coupon, index) => {
                const langData = getLoveLanguageData(coupon.loveLanguage);
                const expired = isExpired(coupon.validUntil);

                return (
                  <motion.div
                    key={coupon.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 text-white shadow-xl overflow-hidden ${
                      expired ? 'opacity-60' : ''
                    }`}
                  >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-2xl">{langData.icon}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-white/80">De</p>
                          <p className="text-white">{coupon.fromUserName}</p>
                        </div>
                      </div>

                      <h4 className="text-white text-xl mb-2">{coupon.title}</h4>
                      {coupon.description && (
                        <p className="text-white/90 text-sm mb-4">{coupon.description}</p>
                      )}

                      {coupon.validUntil && (
                        <p className="text-white/70 text-xs flex items-center gap-2 mb-4">
                          <Clock className="h-3 w-3" />
                          Valide jusqu'au {new Date(coupon.validUntil).toLocaleDateString('fr-FR')}
                        </p>
                      )}

                      {expired ? (
                        <div className="bg-red-500/30 rounded-xl px-4 py-2 text-center">
                          <p className="text-white text-sm">Expiré</p>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleRedeemCoupon(coupon.id)}
                          className="w-full bg-white text-pink-600 hover:bg-white/90"
                        >
                          <Gift className="mr-2 h-4 w-4" />
                          Utiliser maintenant
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sent Coupons (Active) */}
        {activeSentCoupons.length > 0 && (
          <div>
            <h3 className="text-gray-900 mb-4">Bons envoyés (en attente) 📤</h3>
            <div className="space-y-3">
              {activeSentCoupons.map((coupon, index) => {
                const langData = getLoveLanguageData(coupon.loveLanguage);

                return (
                  <motion.div
                    key={coupon.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-purple-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">{langData.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-gray-900 mb-1">{coupon.title}</h4>
                          {coupon.description && (
                            <p className="text-sm text-gray-600 mb-2">{coupon.description}</p>
                          )}
                          <p className="text-xs text-gray-500">
                            Pour {coupon.toUserName}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteCoupon(coupon.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Redeemed Coupons */}
        {coupons.filter(c => c.redeemed).length > 0 && (
          <div>
            <h3 className="text-gray-900 mb-4">Bons utilisés ✅</h3>
            <div className="space-y-3">
              {coupons.filter(c => c.redeemed).map((coupon, index) => {
                const langData = getLoveLanguageData(coupon.loveLanguage);
                const iReceived = coupon.toUserId === userId;

                return (
                  <motion.div
                    key={coupon.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`rounded-2xl p-5 shadow-sm border-2 ${
                      iReceived
                        ? 'bg-pink-50 border-pink-200'
                        : 'bg-purple-50 border-purple-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">{coupon.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {iReceived ? `De ${coupon.fromUserName}` : `Pour ${coupon.toUserName}`}
                        </p>
                        {coupon.redeemedAt && (
                          <p className="text-xs text-green-600">
                            ✓ Utilisé le {new Date(coupon.redeemedAt).toLocaleDateString('fr-FR')}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Chargement...</p>
          </div>
        ) : coupons.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎟️</div>
            <p className="text-gray-600 mb-2">Aucun bon pour le moment</p>
            <p className="text-sm text-gray-500">Créez votre premier bon pour surprendre votre partenaire !</p>
          </div>
        ) : null}

        {/* Info Card */}
        <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
          <p className="text-sm text-purple-900">
            💡 <strong>Comment ça marche :</strong> Créez des bons personnalisés et envoyez-les à votre partenaire. 
            Il/elle pourra les échanger dans la vraie vie quand il/elle le souhaite. C'est une façon ludique 
            de s'offrir du temps et de l'attention !
          </p>
        </div>
      </div>

      {/* Create Form Modal */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50 overflow-y-auto"
            onClick={() => setShowCreateForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl my-8"
            >
              <h2 className="text-gray-900 mb-6">Créer un bon</h2>

              {/* Templates */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-3">Modèles rapides</label>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {couponTemplates.map(template => {
                    const langData = getLoveLanguageData(template.language);
                    
                    return (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          selectedTemplate === template.id
                            ? 'bg-purple-100 border-purple-400'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{template.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 truncate">{template.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{langData.name}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-gray-200 my-6" />

              {/* Custom Coupon */}
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-2">Ou créez un bon personnalisé</label>
                <Input
                  type="text"
                  value={customTitle}
                  onChange={(e) => {
                    setCustomTitle(e.target.value);
                    setSelectedTemplate('');
                  }}
                  placeholder="Ex: Soirée cinéma de ton choix"
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-2">Description (optionnel)</label>
                <Input
                  type="text"
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  placeholder="Ex: On regarde le film que tu veux, avec pop-corn maison"
                  className="w-full"
                />
              </div>

              {!selectedTemplate && (
                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">Langage d'amour</label>
                  <div className="grid grid-cols-5 gap-2">
                    {loveLanguages.map(lang => (
                      <button
                        key={lang.id}
                        onClick={() => setSelectedLanguage(lang.id)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          selectedLanguage === lang.id
                            ? 'bg-purple-100 border-purple-400'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-2xl mb-1">{lang.icon}</div>
                        <p className="text-xs text-gray-600 truncate">{lang.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">Valide pendant</label>
                <select
                  value={validDays}
                  onChange={(e) => setValidDays(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-400 outline-none"
                >
                  <option value="7">7 jours</option>
                  <option value="14">14 jours</option>
                  <option value="30">30 jours</option>
                  <option value="60">60 jours</option>
                  <option value="90">90 jours</option>
                  <option value="365">1 an</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setShowCreateForm(false);
                    setSelectedTemplate('');
                    setCustomTitle('');
                    setCustomDescription('');
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleCreateCoupon}
                  disabled={!selectedTemplate && !customTitle.trim()}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Envoyer le bon
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
