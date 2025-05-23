
import { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: "안녕하세요! Wavico 상담봇입니다. 무엇을 도와드릴까요?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // 위젯이 열릴 때 새 대화 생성 또는 최근 대화 불러오기
  useEffect(() => {
    if (isOpen) {
      loadOrCreateConversation();
    }
  }, [isOpen]);

  // 대화 생성 또는 불러오기
  const loadOrCreateConversation = async () => {
    try {
      // 가장 최근 대화 가져오기 시도
      const { data: recentConversation } = await supabase
        .from("chat_conversations")
        .select("id")
        .order("created_at", { ascending: false })
        .limit(1);

      if (recentConversation && recentConversation.length > 0) {
        // 최근 대화가 있으면 해당 대화 ID 설정
        setConversationId(recentConversation[0].id);
        
        // 대화 메시지 불러오기
        const { data: chatMessages } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("conversation_id", recentConversation[0].id)
          .order("timestamp", { ascending: true });

        if (chatMessages && chatMessages.length > 0) {
          // 메시지가 있으면 형식 변환 후 상태 업데이트
          const formattedMessages = chatMessages.map(msg => ({
            id: msg.id,
            text: msg.user_input || msg.bot_response || "",
            isUser: !!msg.user_input,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(formattedMessages);
        }
      } else {
        // 대화가 없으면 새 대화 생성
        createNewConversation();
      }
    } catch (error) {
      console.error("대화를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  // 새 대화 생성
  const createNewConversation = async () => {
    try {
      const { data, error } = await supabase
        .from("chat_conversations")
        .insert({ title: "새 상담" })
        .select();

      if (error) throw error;
      if (data && data.length > 0) {
        setConversationId(data[0].id);
        // 초기 메시지 저장
        saveMessage({
          text: "안녕하세요! Wavico 상담봇입니다. 무엇을 도와드릴까요?",
          isUser: false,
        });
      }
    } catch (error) {
      console.error("새 대화를 생성하는 중 오류가 발생했습니다:", error);
    }
  };

  // 메시지 저장
  const saveMessage = async (msg: { text: string; isUser: boolean }) => {
    if (!conversationId) return;

    try {
      const messageData = msg.isUser
        ? { conversation_id: conversationId, user_input: msg.text }
        : { conversation_id: conversationId, bot_response: msg.text };

      const { error } = await supabase.from("chat_messages").insert(messageData);

      if (error) throw error;
    } catch (error) {
      console.error("메시지를 저장하는 중 오류가 발생했습니다:", error);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    // 사용자 메시지 추가
    const userMessage = { 
      id: `user-${Date.now()}`,
      text: message, 
      isUser: true, 
      timestamp: new Date() 
    };
    setMessages([...messages, userMessage]);
    
    // 메시지 저장
    await saveMessage({
      text: message,
      isUser: true,
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
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: `bot-${Date.now()}`,
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
      // 봇 응답 저장
      await saveMessage({
        text: randomResponse,
        isUser: false,
      });
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-80 sm:w-96 h-96 flex flex-col animate-scale-in">
          <div className="bg-wavico-blue p-4 rounded-t-lg flex justify-between items-center">
            <span className="text-white font-medium">실시간 상담</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-wavico-darkblue rounded-full h-8 w-8 p-1"
              onClick={toggleChat}
            >
              <X size={18} />
            </Button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 max-w-[80%] ${
                  msg.isUser ? "ml-auto" : "mr-auto"
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    msg.isUser
                      ? "bg-wavico-blue text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4 max-w-[80%] mr-auto">
                <div className="p-3 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none flex space-x-1">
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
          </div>

          <div className="p-4 border-t flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              placeholder="메시지를 입력하세요..."
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-wavico-blue"
            />
            <Button
              className="bg-wavico-blue hover:bg-wavico-darkblue text-white rounded-l-none"
              onClick={handleSendMessage}
            >
              전송
            </Button>
          </div>
        </div>
      ) : (
        <Button
          className="bg-wavico-blue hover:bg-wavico-darkblue text-white rounded-full h-14 w-14 flex items-center justify-center shadow-lg"
          onClick={toggleChat}
        >
          <MessageSquare size={24} />
        </Button>
      )}
    </div>
  );
};

export default ChatWidget;
