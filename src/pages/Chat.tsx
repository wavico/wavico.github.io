import { useEffect, useRef, useState } from "react";
import { Send, History, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "안녕하세요! Wavico 상담봇입니다. 어떤 도움이 필요하신가요?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: message,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setMessage("");

    // Simulate bot typing
    setIsTyping(true);

    // Simulate bot response after delay
    setTimeout(() => {
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
        id: messages.length + 2,
        text: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
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
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Plus size={20} />
          </Button>
        </div>
        <div className="p-2">{/* Chat history items would go here */}</div>
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
              key={msg.id}
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
            <div className="text-2xl font-semibold text-purple-600">0</div>
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
