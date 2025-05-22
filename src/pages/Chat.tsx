
import { useEffect, useRef, useState } from "react";
import { Send, Paperclip, Smile, User } from "lucide-react";
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

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-220px)] flex flex-col">
          {/* Chat Header */}
          <div className="bg-wavico-blue text-white p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
              <span className="text-wavico-blue font-bold">W</span>
            </div>
            <div>
              <h2 className="font-bold">Wavico 상담 채팅</h2>
              <p className="text-sm text-blue-100">실시간 상담을 시작해보세요</p>
            </div>
          </div>

          {/* Chat Messages */}
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
                      ? "bg-wavico-blue text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <div
                  className={`text-xs text-gray-500 mt-1 ${
                    msg.isUser ? "text-right" : ""
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="mb-4 max-w-[80%] mr-auto">
                <div className="p-3 rounded-lg bg-white text-gray-800 rounded-bl-none flex space-x-1">
                  <span className="animate-pulse">●</span>
                  <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>●</span>
                  <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>●</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-3 bg-white">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-wavico-blue"
              >
                <Paperclip size={20} />
              </Button>
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                placeholder="메시지를 입력하세요..."
                className="flex-1 border border-gray-300 mx-2 focus-visible:ring-wavico-blue"
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-wavico-blue"
              >
                <Smile size={20} />
              </Button>
              <Button
                className="bg-wavico-blue hover:bg-wavico-darkblue ml-2"
                onClick={handleSendMessage}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-600">
          <p>
            상담원과의 채팅은 평일 오전 9시부터 오후 6시까지 가능합니다.
          </p>
          <p className="mt-2">
            그 외 시간에는 자동 응답 시스템으로 운영됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
