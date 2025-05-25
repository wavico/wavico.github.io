import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

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

  const createNewConversation = async () => {
    try {
      const { data, error } = await supabase
        .from("chat_conversations")
        .insert([{ created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      setConversationId(data.id);
    } catch (error) {
      console.error("새 대화 생성 중 오류가 발생했습니다:", error);
    }
  };

  // 위젯이 열릴 때 새 대화 생성 또는 최근 대화 불러오기
  useEffect(() => {
    if (isOpen) {
      loadOrCreateConversation();
    }
  }, [isOpen]);

  // 대화 불러오기 또는 생성
  const loadOrCreateConversation = async () => {
    try {
      // 최근 대화가 있는지 확인
      const { data: conversations } = await supabase
        .from("chat_conversations")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (conversations && conversations.length > 0) {
        // 최근 대화가 있으면 해당 대화 불러오기
        setConversationId(conversations[0].id);
        const { data: messages } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("conversation_id", conversations[0].id)
          .order("created_at", { ascending: true });

        if (messages) {
          setMessages(
            messages.map((msg) => ({
              id: msg.id,
              text: msg.user_input || msg.bot_response,
              isUser: msg.user_input ? true : false,
              timestamp: new Date(msg.timestamp),
            }))
          );
        }
      } else {
        // 새 대화 생성
        createNewConversation();
      }
    } catch (error) {
      console.error("대화를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  // 메시지 저장
  const saveMessage = async (message: {
    text: string;
    isUser: boolean;
    conversationId?: string;
  }) => {
    try {
      await supabase.from("chat_messages").insert([
        {
          conversation_id: message.conversationId || conversationId,
          text: message.text,
          is_user: message.isUser,
        },
      ]);
    } catch (error) {
      console.error("메시지 저장 중 오류가 발생했습니다:", error);
    }
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
      const userMessage = {
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

      // Clear the file input
      event.target.value = "";

      handleBotResponse();
    } catch (error) {
      console.error("파일 업로드 중 오류가 발생했습니다:", error);
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

  return null; // 채팅 위젯 UI를 제거하고 null을 반환
};

export default ChatWidget;
