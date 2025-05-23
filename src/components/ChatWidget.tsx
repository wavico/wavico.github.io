import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Image, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  attachments?: {
    type: "image" | "file";
    url: string;
    name: string;
  }[];
}

const KAKAO_CHANNEL_URL = "http://pf.kakao.com/_xbqZSn/chat";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
          const formattedMessages = chatMessages.map((msg) => ({
            id: msg.id,
            text: msg.user_input || msg.bot_response || "",
            isUser: !!msg.user_input,
            timestamp: new Date(msg.timestamp),
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

      const { error } = await supabase
        .from("chat_messages")
        .insert(messageData);

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
      timestamp: new Date(),
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
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // 봇 응답 저장
      await saveMessage({
        text: randomResponse,
        isUser: false,
      });
    }, 1000);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "file"
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    try {
      // Upload file to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("chat-attachments")
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("chat-attachments").getPublicUrl(fileName);

      // Add message with attachment
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        text: type === "image" ? "이미지를 보냈습니다." : "파일을 보냈습니다.",
        isUser: true,
        timestamp: new Date(),
        attachments: [
          {
            type,
            url: publicUrl,
            name: file.name,
          },
        ],
      };

      setMessages([...messages, userMessage]);
      await saveMessage(userMessage);

      // Clear the file input
      event.target.value = "";

      // Trigger bot response
      handleBotResponse();
    } catch (error) {
      console.error("파일 업로드 중 오류가 발생했습니다:", error);
      toast({
        title: "오류",
        description: "파일 업로드에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleBotResponse = async () => {
    setIsTyping(true);
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
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      await saveMessage(botMessage);
    }, 1000);
  };

  const handleKakaoChat = () => {
    window.open(KAKAO_CHANNEL_URL, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        className="bg-[#FEE500] hover:bg-[#FEE500]/90 text-black rounded-full h-14 w-14 flex items-center justify-center shadow-lg"
        onClick={handleKakaoChat}
      >
        <svg
          width="24"
          height="22"
          viewBox="0 0 24 22"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 0C5.37 0 0 4.27 0 9.55C0 12.99 2.24 16.01 5.63 17.84L4.27 22L9.37 18.93C10.22 19.08 11.1 19.16 12 19.16C18.63 19.16 24 14.89 24 9.61C24 4.33 18.63 0 12 0Z"
          />
        </svg>
      </Button>
    </div>
  );
};

export default ChatWidget;
