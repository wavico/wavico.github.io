
import { useEffect, useRef, useState } from "react";
import { Send, History, Plus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

interface Message {
  id: number | string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState<{id: string, title: string}[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 페이지 로드 시 대화 목록 불러오기
  useEffect(() => {
    loadConversations();
  }, []);

  // 현재 대화가 변경될 때 메시지 불러오기
  useEffect(() => {
    if (currentConversationId) {
      loadMessages(currentConversationId);
    } else {
      createNewConversation();
    }
  }, [currentConversationId]);

  // 메시지가 변경될 때 스크롤 맨 아래로
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 대화 목록 불러오기
  const loadConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('id, title, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setConversations(data.map(conv => ({
          id: conv.id,
          title: conv.title || '제목 없음'
        })));
        
        // 가장 최근 대화 선택
        setCurrentConversationId(data[0].id);
      } else {
        // 대화가 없으면 새 대화 생성
        createNewConversation();
      }
    } catch (error) {
      console.error('대화 목록을 불러오는 중 오류가 발생했습니다:', error);
      toast("대화 목록을 불러오는 데 실패했습니다", {
        description: "잠시 후 다시 시도해주세요",
      });
    }
  };

  // 메시지 불러오기
  const loadMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('timestamp', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        // DB에서 불러온 메시지를 화면에 표시할 형식으로 변환
        const formattedMessages = data.map((msg, index) => ({
          id: msg.id,
          text: msg.user_input || msg.bot_response || '',
          isUser: !!msg.user_input,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(formattedMessages);
      } else {
        // 메시지가 없으면 초기 인사말 추가
        const initialMessage = {
          id: 'initial',
          text: "안녕하세요! Wavico 상담봇입니다. 어떤 도움이 필요하신가요?",
          isUser: false,
          timestamp: new Date()
        };
        setMessages([initialMessage]);
        
        // 초기 메시지 저장
        await saveMessage({
          text: initialMessage.text,
          isUser: false,
          conversationId
        });
      }
    } catch (error) {
      console.error('메시지를 불러오는 중 오류가 발생했습니다:', error);
      toast("메시지를 불러오는 데 실패했습니다", {
        description: "잠시 후 다시 시도해주세요",
      });
    }
  };

  // 새 대화 생성
  const createNewConversation = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert([{ title: '새 상담' }])
        .select();

      if (error) throw error;
      
      if (data && data.length > 0) {
        // 대화 목록에 새 대화 추가
        setConversations(prev => [{
          id: data[0].id,
          title: data[0].title || '새 상담'
        }, ...prev]);
        
        // 새 대화 선택
        setCurrentConversationId(data[0].id);
        
        // 초기 메시지 설정
        const initialMessage = {
          id: 'initial',
          text: "안녕하세요! Wavico 상담봇입니다. 어떤 도움이 필요하신가요?",
          isUser: false,
          timestamp: new Date()
        };
        setMessages([initialMessage]);
        
        // 초기 메시지 저장
        await saveMessage({
          text: initialMessage.text,
          isUser: false,
          conversationId: data[0].id
        });
      }
    } catch (error) {
      console.error('새 대화를 생성하는 중 오류가 발생했습니다:', error);
      toast("새 대화를 생성하는 데 실패했습니다", {
        description: "잠시 후 다시 시도해주세요",
      });
    }
  };

  // 메시지 저장
  const saveMessage = async ({ 
    text, 
    isUser, 
    conversationId = currentConversationId 
  }: { 
    text: string; 
    isUser: boolean; 
    conversationId?: string | null;
  }) => {
    if (!conversationId) return;

    try {
      const messageData = isUser
        ? { conversation_id: conversationId, user_input: text }
        : { conversation_id: conversationId, bot_response: text };

      const { error } = await supabase
        .from('chat_messages')
        .insert([messageData]);

      if (error) throw error;
    } catch (error) {
      console.error('메시지를 저장하는 중 오류가 발생했습니다:', error);
      toast("메시지 저장에 실패했습니다", {
        description: "잠시 후 다시 시도해주세요",
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: message,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    
    // 메시지 저장
    await saveMessage({
      text: message,
      isUser: true
    });
    
    setMessage("");

    // 봇 타이핑 시뮬레이션
    setIsTyping(true);

    // 봇 응답 시뮬레이션
    setTimeout(async () => {
      setIsTyping(false);

      const botResponses = [
        "더 자세한 내용은 어떤 것이 궁금하신가요?",
        "웹/앱 개발에 대해 더 알고싶으시면 서비스 소개 페이지를 확인해보세요!",
        "AI 솔루션에 관심이 있으신가요? 상담 신청을 통해 자세한 상담이 가능합니다.",
        "Wavico는 음성, 이미지, 언어를 아우르는 인공지능 기술을 제공합니다.",
        "프로젝트에 대해 더 자세히 알려주시면 맞춤형 솔루션을 제안드릴 수 있습니다.",
        "포트폴리오 페이지에서 Wavico의 성공 사례를 확인해보세요.",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      
      // 봇 응답 저장
      await saveMessage({
        text: randomResponse,
        isUser: false
      });
    }, 1500);
  };

  // 새 대화 버튼 클릭 핸들러
  const handleNewConversation = () => {
    createNewConversation();
  };

  // 대화 선택 핸들러
  const handleSelectConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar - Chat History */}
      <div className="w-64 bg-white border-r">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center text-gray-600">
            <History size={20} className="mr-2" />
            대화 내역
          </div>
          <Button variant="ghost" size="icon" className="text-gray-600" onClick={handleNewConversation}>
            <Plus size={20} />
          </Button>
        </div>
        <div className="p-2">
          {conversations.map((conv) => (
            <div 
              key={conv.id}
              className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${currentConversationId === conv.id ? 'bg-gray-100' : ''}`}
              onClick={() => handleSelectConversation(conv.id)}
            >
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-2 text-wavico-blue" />
                <span className="text-sm truncate">{conv.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold">실시간 상담</h2>
            <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-600 text-sm rounded">
              기본 상담원
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={typeof msg.id === 'number' ? msg.id : msg.id.toString()}
              className={`mb-4 max-w-[80%] ${
                msg.isUser ? "ml-auto" : "mr-auto"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  msg.isUser
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="mb-4 max-w-[80%] mr-auto">
              <div className="p-3 rounded-lg bg-white text-gray-800 rounded-bl-none flex space-x-1">
                <span className="animate-pulse">●</span>
                <span
                  className="animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                >
                  ●
                </span>
                <span
                  className="animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                >
                  ●
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white p-4 border-t">
          <div className="flex items-center">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              placeholder="메시지를 입력하세요..."
              className="flex-1 border border-gray-200 rounded-l-lg focus-visible:ring-purple-400"
            />
            <Button
              className="bg-purple-600 hover:bg-purple-700 rounded-l-none"
              onClick={handleSendMessage}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Stats */}
      <div className="w-72 bg-white border-l">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 10L12 14L16 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            상담 통계
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">총 상담 수</div>
            <div className="text-2xl font-semibold text-purple-600">{conversations.length}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">평균 만족도</div>
            <div className="text-2xl font-semibold text-purple-600">0.0%</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">긍정적 응답</div>
            <div className="text-2xl font-semibold text-purple-600">0</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">부정적 응답</div>
            <div className="text-2xl font-semibold text-purple-600">0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
