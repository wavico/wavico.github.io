import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    [
      {
        text: "안녕하세요! Wavico 상담봇입니다. 무엇을 도와드릴까요?",
        isUser: false,
      },
    ]
  );
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    // Add user message
    const userMessage = { text: message, isUser: true };
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
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages((prev) => [...prev, { text: randomResponse, isUser: false }]);
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
            {messages.map((msg, index) => (
              <div
                key={index}
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
