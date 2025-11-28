import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  message: string;
  timestamp: number;
}

interface TypingStatus {
  playerId: string;
  playerName: string;
  timestamp: number;
}

interface ChatBoxProps {
  messages: ChatMessage[];
  currentPlayerId: string;
  currentPlayerName: string;
  onSendMessage: (message: string) => void;
  gameId?: string;
  typingStatus?: TypingStatus;
}

export function ChatBox({ messages, currentPlayerId, currentPlayerName, onSendMessage, gameId, typingStatus }: ChatBoxProps) {
  const [inputMessage, setInputMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Send typing status to server
  const sendTypingStatus = async (isTyping: boolean) => {
    if (!gameId) return;
    
    try {
      const projectId = (await import('../utils/supabase/info.tsx')).projectId;
      const publicAnonKey = (await import('../utils/supabase/info.tsx')).publicAnonKey;
      const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59`;
      
      await fetch(`${serverUrl}/game/${gameId}/typing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          playerId: currentPlayerId,
          playerName: currentPlayerName,
          isTyping,
        }),
      });
    } catch (err) {
      console.error('Error sending typing status:', err);
    }
  };

  // Handle input change with debounce for typing status
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputMessage(value);

    if (!gameId) return;

    // If user is typing and wasn't before, send typing status
    if (value.trim() && !isTypingRef.current) {
      isTypingRef.current = true;
      sendTypingStatus(true);
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing status after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      if (isTypingRef.current) {
        isTypingRef.current = false;
        sendTypingStatus(false);
      }
    }, 2000);

    // If input is empty, immediately stop typing status
    if (!value.trim() && isTypingRef.current) {
      isTypingRef.current = false;
      sendTypingStatus(false);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Clear typing status immediately when sending
      if (isTypingRef.current) {
        isTypingRef.current = false;
        sendTypingStatus(false);
      }
      
      onSendMessage(inputMessage.trim());
      setInputMessage('');
      
      // Clear timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (isTypingRef.current && gameId) {
        sendTypingStatus(false);
      }
    };
  }, [gameId]);

  // Check if someone else is typing (and if the status is recent)
  const isOtherPlayerTyping = typingStatus && 
    typingStatus.playerId !== currentPlayerId &&
    (Date.now() - typingStatus.timestamp < 5000); // Show for max 5 seconds

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 shadow-sm">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-2xl">
        <h3 className="text-sm text-gray-700">💬 Chat</h3>
        <p className="text-xs text-gray-500">Répondez à la question ou discutez</p>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-3"
        style={{ maxHeight: '300px', minHeight: '200px' }}
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-8">
            Aucun message pour l'instant. Commencez la conversation !
          </div>
        ) : (
          messages.map((msg) => {
            const isCurrentUser = msg.playerId === currentPlayerId;
            return (
              <div
                key={msg.id}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    isCurrentUser
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  {!isCurrentUser && (
                    <p className="text-xs opacity-70 mb-1">{msg.playerName}</p>
                  )}
                  <p className="text-sm break-words">{msg.message}</p>
                  <p className={`text-xs mt-1 ${isCurrentUser ? 'text-white/70' : 'text-gray-500'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
        {/* Typing Indicator */}
        {isOtherPlayerTyping && (
          <div className="mb-2 px-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{typingStatus?.playerName} est en train d'écrire</span>
              <div className="flex gap-1">
                <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            className="flex-1 bg-white border-gray-200 focus:border-purple-300 rounded-xl"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}