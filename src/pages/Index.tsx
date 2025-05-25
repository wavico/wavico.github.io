import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  BarChart2,
  Code,
  Image,
  MessageCircle,
  Smartphone,
  History,
  Plus,
  Send,
  Paperclip,
  Clock,
  Users,
  CheckCircle,
  Trash2,
  Server,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ServiceCard from "@/components/ServiceCard";
import PortfolioPreview from "@/components/PortfolioPreview";
import LocationSection from "@/components/company/LocationSection";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  attachments?: {
    type: "image" | "file";
    url: string;
    name: string;
  }[];
  persona?: {
    name: string;
    role: string;
    avatar: string;
  };
}

interface MonitoringStats {
  responseRate: number;
  avgResponseTime: number;
  dailyChats: number;
  satisfaction: number;
}

interface ChatSession {
  id: string;
  name: string;
  messages: Message[];
  timestamp: Date;
}

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [usageInfo, setUsageInfo] = useState<{
    remainingCount: number;
    totalCount: number;
  } | null>(null);
  const [usageError, setUsageError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const observerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [monitoringStats] = useState<MonitoringStats>({
    responseRate: 98.5,
    avgResponseTime: 2.3,
    dailyChats: 142,
    satisfaction: 95,
  });

  useEffect(() => {
    // Load chat sessions from localStorage
    const loadChatSessions = () => {
      const savedSessions = localStorage.getItem("chatSessions");
      if (savedSessions) {
        const sessions = JSON.parse(savedSessions);
        setChatSessions(
          sessions.map((session: ChatSession) => ({
            ...session,
            timestamp: new Date(session.timestamp),
          }))
        );

        // Set active chat if exists
        const lastActiveId = localStorage.getItem("activeChatId");
        if (
          lastActiveId &&
          sessions.find((s: ChatSession) => s.id === lastActiveId)
        ) {
          setActiveChatId(lastActiveId);
          const activeSession = sessions.find(
            (s: ChatSession) => s.id === lastActiveId
          );
          setMessages(activeSession.messages);
        } else if (sessions.length > 0) {
          setActiveChatId(sessions[0].id);
          setMessages(sessions[0].messages);
        } else {
          createNewChat();
        }
      } else {
        createNewChat();
      }
    };

    loadChatSessions();

    // Banner slider
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);

    // Intersection Observer setup
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all sections
    Object.values(observerRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // Save chat sessions to localStorage whenever they change
  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem("chatSessions", JSON.stringify(chatSessions));
      localStorage.setItem("activeChatId", activeChatId);
    }
  }, [chatSessions, activeChatId]);

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      name: `새 대화 ${chatSessions.length + 1}`,
      messages: [
        {
          id: 1,
          text: "안녕하세요! 저는 Wavico의 AI 비서 웨비코봇입니다. 무엇을 도와드릴까요?",
          isUser: false,
          timestamp: new Date(),
          persona: {
            name: "웨비코봇",
            role: "AI 비서",
            avatar: "/avatars/sunmin.png",
          },
        },
      ],
      timestamp: new Date(),
    };

    setChatSessions((prev) => [...prev, newSession]);
    setActiveChatId(newSession.id);
    setMessages(newSession.messages);
  };

  // Add ref to the object
  const addRef = (id: string) => (el: HTMLDivElement) => {
    observerRefs.current[id] = el;
  };

  // 사용량 정보 조회
  const checkUsage = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/usage-info");
      const data = await response.json();
      setUsageInfo(data);
      setUsageError(null);
    } catch (error) {
      console.error("사용량 조회 실패:", error);
      setUsageError("사용량 정보를 조회할 수 없습니다.");
    }
  };

  // 컴포넌트 마운트 시 사용량 정보 조회
  useEffect(() => {
    checkUsage();
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    try {
      // 메시지 전송 전 사용량 체크
      const response = await fetch("http://localhost:3001/api/check-usage", {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        setUsageError(data.error);
        return;
      }

      setUsageInfo(data);
      setUsageError(null);

      // 기존 메시지 전송 로직
      const userMessage: Message = {
        id: messages.length + 1,
        text: message,
        isUser: true,
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      setChatSessions((prev) =>
        prev.map((session) =>
          session.id === activeChatId
            ? { ...session, messages: updatedMessages, timestamp: new Date() }
            : session
        )
      );

      setMessage("");
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const availablePersonas = [
          {
            name: "웨비코봇",
            role: "AI 비서",
            avatar: "/avatars/sunmin.png",
            responses: [
              "AI 기술에 대해 궁금하신 점이 있으시다면 자세히 설명해드릴 수 있습니다.",
              "저희 연구팀이 개발한 최신 AI 모델에 대해 소개해드릴까요?",
              "음성, 이미지, 자연어 처리 중 어떤 분야에 관심이 있으신가요?",
            ],
          },
          {
            name: "웨비코봇",
            role: "AI 비서",
            avatar: "/avatars/yongsung.png",
            responses: [
              "귀사의 비즈니스에 맞는 최적의 AI 솔루션을 제안해드릴 수 있습니다.",
              "기존 시스템과의 통합 방안에 대해 논의해보시겠어요?",
              "구체적인 요구사항을 말씀해 주시면 맞춤형 솔루션을 설계해드리겠습니다.",
            ],
          },
          {
            name: "웨비코봇",
            role: "AI 비서",
            avatar: "/avatars/seoryeong.png",
            responses: [
              "프로젝트 일정과 범위에 대해 상담해드릴 수 있습니다.",
              "유사 프로젝트 진행 사례를 공유해드릴까요?",
              "예산과 일정에 맞는 최적의 프로젝트 계획을 수립해드리겠습니다.",
            ],
          },
        ];

        const persona =
          availablePersonas[
            Math.floor(Math.random() * availablePersonas.length)
          ];
        const response =
          persona.responses[
            Math.floor(Math.random() * persona.responses.length)
          ];

        const botMessage = {
          id: updatedMessages.length + 1,
          text: response,
          isUser: false,
          timestamp: new Date(),
          persona: {
            name: persona.name,
            role: persona.role,
            avatar: persona.avatar,
          },
        };

        const finalMessages = [...updatedMessages, botMessage];
        setMessages(finalMessages);

        setChatSessions((prev) =>
          prev.map((session) =>
            session.id === activeChatId
              ? { ...session, messages: finalMessages, timestamp: new Date() }
              : session
          )
        );
      }, 1000);
    } catch (error) {
      console.error("메시지 전송 실패:", error);
      setUsageError("메시지를 전송할 수 없습니다.");
    }
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
        id: messages.length + 1,
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

      // Simulate bot typing
      setIsTyping(true);

      // Simulate bot response after delay
      setTimeout(() => {
        setIsTyping(false);

        const availablePersonas = [
          {
            name: "김선민",
            role: "AI PM",
            avatar: "/avatars/sunmin.png",
            responses: [
              "AI 기술에 대해 궁금하신 점이 있으시다면 자세히 설명해드릴 수 있습니다.",
              "저희 연구팀이 개발한 최신 AI 모델에 대해 소개해드릴까요?",
              "음성, 이미지, 자연어 처리 중 어떤 분야에 관심이 있으신가요?",
            ],
          },
          {
            name: "조용성",
            role: "솔루션 아키텍트",
            avatar: "/avatars/yongsung.png",
            responses: [
              "귀사의 비즈니스에 맞는 최적의 AI 솔루션을 제안해드릴 수 있습니다.",
              "기존 시스템과의 통합 방안에 대해 논의해보시겠어요?",
              "구체적인 요구사항을 말씀해 주시면 맞춤형 솔루션을 설계해드리겠습니다.",
            ],
          },
          {
            name: "김서령",
            role: "프로젝트 매니저",
            avatar: "/avatars/seoryeong.png",
            responses: [
              "프로젝트 일정과 범위에 대해 상담해드릴 수 있습니다.",
              "유사 프로젝트 진행 사례를 공유해드릴까요?",
              "예산과 일정에 맞는 최적의 프로젝트 계획을 수립해드리겠습니다.",
            ],
          },
        ];

        const persona =
          availablePersonas[
            Math.floor(Math.random() * availablePersonas.length)
          ];
        const response =
          persona.responses[
            Math.floor(Math.random() * persona.responses.length)
          ];

        const botMessage = {
          id: messages.length + 2,
          text: response,
          isUser: false,
          timestamp: new Date(),
          persona: {
            name: persona.name,
            role: persona.role,
            avatar: persona.avatar,
          },
        };

        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    } catch (error) {
      console.error("파일 업로드 중 오류가 발생했습니다:", error);
      toast({
        title: "오류",
        description: "파일 업로드에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지

    // 현재 활성화된 세션을 삭제하는 경우
    if (sessionId === activeChatId) {
      const remainingSessions = chatSessions.filter((s) => s.id !== sessionId);
      if (remainingSessions.length > 0) {
        // 다른 세션이 있으면 가장 최근 세션을 활성화
        const nextSession = remainingSessions[0];
        setActiveChatId(nextSession.id);
        setMessages(nextSession.messages);
      } else {
        // 다른 세션이 없으면 새 세션 생성
        createNewChat();
      }
    }

    // 세션 목록에서 삭제
    setChatSessions((prev) =>
      prev.filter((session) => session.id !== sessionId)
    );
  };

  const bannerSlides = [
    {
      title: "누구나 쉽고 빠르게 이용하는",
      subtitle: "AI 음성·이미지·언어 서비스",
      description:
        "Wavico는 기획부터 배포까지 End-to-End AI 서비스를 제공합니다.",
      bgClass: "bg-gradient-to-r from-blue-500 to-purple-600",
    },
    {
      title: "최소 기능 제품 기반 린 개발",
      subtitle: "웹/앱 개발 서비스",
      description: "빠르게 소통하고 고객 피드백으로 개선하는 린 개발 팀입니다.",
      bgClass: "bg-gradient-to-r from-cyan-500 to-blue-600",
    },
    {
      title: "투명한 분석과 인사이트 전달을 위한",
      subtitle: "시각화 대시보드",
      description: "의미를 설명하고 해석할 수 있는 시각화 솔루션을 제공합니다.",
      bgClass: "bg-gradient-to-r from-indigo-500 to-purple-600",
    },
  ];

  const services = [
    {
      title: "웹/모바일 앱 개발",
      description:
        "사용자 경험을 최우선으로 고려한 최신 기술 기반의 웹사이트와 모바일 앱을 개발합니다.",
      icon: <Code className="w-12 h-12 text-wavico-blue" />,
      link: "#web-mobile-detail",
    },
    {
      title: "AI 솔루션",
      description:
        "음성, 이미지, 언어를 아우르는 인공지능 기술을 활용한 맞춤형 AI 솔루션을 제공합니다.",
      icon: <Image className="w-12 h-12 text-wavico-blue" />,
      link: "#ai-solution-detail",
    },
    {
      title: "시각화 대시보드",
      description:
        "복잡한 데이터를 직관적으로 이해할 수 있는 대시보드와 시각화 솔루션을 제공합니다.",
      icon: <BarChart2 className="w-12 h-12 text-wavico-blue" />,
      link: "#dashboard-detail",
    },
    {
      title: "모바일 앱",
      description:
        "iOS와 Android에서 모두 사용 가능한 네이티브 및 크로스 플랫폼 앱을 개발합니다.",
      icon: <Smartphone className="w-12 h-12 text-wavico-blue" />,
      link: "#mobile-detail",
    },
  ];

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>
          Wavico - 음성·이미지·언어를 아우르는 인공지능 기술 전문 기업
        </title>
        <meta
          name="description"
          content="Wavico는 음성·이미지·언어를 아우르는 인공지능 기술을 바탕으로, 기획부터 배포까지 한 번에 해결하는 End-to-End AI 서비스를 제공합니다."
        />
        <meta
          name="keywords"
          content="AI,인공지능,웹개발,앱개발,음성인식,이미지처리,자연어처리,MVP"
        />
      </Helmet>

      {/* Hero Banner with Chat Section */}
      <div className="relative">
        <section className="relative h-[120vh]">
          {bannerSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-start pt-32 ${
                activeSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0"
              } ${slide.bgClass}`}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className=" text-white animate-fade-in">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 break-keep">
                    {slide.title}
                  </h1>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 break-keep">
                    {slide.subtitle}
                  </h2>
                  <p className="text-xl mb-8 max-w-xl break-keep whitespace-pre-line">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      asChild
                      className="bg-white text-blue-600 hover:bg-blue-50 text-lg"
                    >
                      <Link to="/contact">상담 신청하기</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                      className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600 text-lg"
                    >
                      <Link to="/portfolio">포트폴리오 보기</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Banner pagination */}
              <div className="absolute top-[85vh] left-1/2 transform -translate-x-1/2 flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeSlide === i ? "bg-white w-8" : "bg-white/50"
                    }`}
                    onClick={() => setActiveSlide(i)}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Chat Section */}
        <section
          id="chat"
          ref={addRef("chat")}
          className={`relative z-20 -mt-[40vh] mb-24 transition-opacity duration-1000 ease-in-out ${
            isVisible["chat"] ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="flex flex-col lg:flex-row h-[600px] md:h-[700px] lg:h-[600px] bg-white/95 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl">
              {/* Left Sidebar - Chat History */}
              <div className="hidden lg:block w-64 bg-white/95 border-r">
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center text-gray-600">
                    <History size={20} className="mr-2" />
                    대화 내역
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600"
                    onClick={createNewChat}
                  >
                    <Plus size={20} />
                  </Button>
                </div>
                <div className="p-2">
                  {chatSessions
                    .sort(
                      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
                    )
                    .map((session) => (
                      <div
                        key={session.id}
                        className={`p-3 rounded-lg cursor-pointer mb-2 group ${
                          session.id === activeChatId
                            ? "bg-blue-50 text-blue-600"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          setActiveChatId(session.id);
                          setMessages(session.messages);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-1 min-w-0">
                            <MessageCircle
                              size={16}
                              className="mr-2 flex-shrink-0"
                            />
                            <span className="text-sm font-medium truncate">
                              {session.name}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-6 h-6 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                            onClick={(e) => handleDeleteSession(session.id, e)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(session.timestamp).toLocaleDateString(
                            "ko-KR",
                            {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Main Chat Area */}
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white/95 p-4 border-b flex justify-between items-center">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden mr-2 text-gray-600"
                    >
                      <History size={20} />
                    </Button>
                    <h2 className="text-lg font-semibold">
                      AI 솔루션 데모 체험
                    </h2>
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded">
                      Wavico 팀
                    </span>
                  </div>
                  {usageInfo && (
                    <div className="text-sm text-gray-600">
                      남은 횟수: {usageInfo.remainingCount}/10
                    </div>
                  )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-white">
                  {usageError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
                      {usageError}
                    </div>
                  )}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-4 flex ${
                        msg.isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!msg.isUser && msg.persona && (
                        <div className="flex items-start mr-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium">
                            {msg.persona.name[0]}
                          </div>
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] ${
                          msg.isUser ? "ml-auto" : "mr-auto"
                        }`}
                      >
                        {!msg.isUser && msg.persona && (
                          <div className="mb-1 text-sm text-gray-600">
                            {msg.persona.name} · {msg.persona.role}
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-lg ${
                            msg.isUser
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                          }`}
                        >
                          {msg.text}
                          {msg.attachments &&
                            msg.attachments.map((attachment, index) => (
                              <div key={index} className="mt-2">
                                {attachment.type === "image" ? (
                                  <img
                                    src={attachment.url}
                                    alt="Uploaded"
                                    className="max-w-full rounded-lg"
                                  />
                                ) : (
                                  <a
                                    href={attachment.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-sm text-blue-100 hover:text-blue-200"
                                  >
                                    <Paperclip size={16} />
                                    <span>{attachment.name}</span>
                                  </a>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium mr-2">
                        W
                      </div>
                      <div className="max-w-[80%] mr-auto">
                        <div className="p-3 rounded-lg bg-white text-gray-800 rounded-bl-none shadow-sm flex space-x-1">
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
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t">
                  <div className="flex flex-col space-y-2">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-gray-500 hover:text-gray-700"
                        disabled={!!usageError}
                      >
                        <Paperclip size={18} />
                      </Button>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") handleSendMessage();
                        }}
                        placeholder={usageError || "메시지를 입력하세요..."}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        disabled={!!usageError}
                      />
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleSendMessage}
                        disabled={!!usageError}
                      >
                        <Send size={18} />
                      </Button>
                    </div>
                    {/* Hidden file inputs */}
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "image")}
                      className="hidden"
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={(e) => handleFileUpload(e, "file")}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Monitoring Stats */}
              <div className="hidden lg:block w-72 bg-white/95 border-l">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">
                    실시간 모니터링 지표
                  </h3>
                </div>
                <div className="p-4">
                  {/* 긍정적 지표 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <svg className="w-full" viewBox="0 0 100 60">
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="126"
                          strokeDashoffset={126 - (126 * 98.5) / 100}
                        />
                        <text
                          x="50"
                          y="45"
                          textAnchor="middle"
                          className="text-lg font-bold"
                          fill="#3b82f6"
                        >
                          98.5%
                        </text>
                      </svg>
                      <div className="text-center mt-2 text-sm text-gray-600">
                        관련성
                      </div>
                    </div>
                    <div className="relative">
                      <svg className="w-full" viewBox="0 0 100 60">
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="126"
                          strokeDashoffset={126 - (126 * 97.2) / 100}
                        />
                        <text
                          x="50"
                          y="45"
                          textAnchor="middle"
                          className="text-lg font-bold"
                          fill="#3b82f6"
                        >
                          97.2%
                        </text>
                      </svg>
                      <div className="text-center mt-2 text-sm text-gray-600">
                        사실성
                      </div>
                    </div>
                    <div className="relative">
                      <svg className="w-full" viewBox="0 0 100 60">
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="126"
                          strokeDashoffset={126 - (126 * 96.8) / 100}
                        />
                        <text
                          x="50"
                          y="45"
                          textAnchor="middle"
                          className="text-lg font-bold"
                          fill="#3b82f6"
                        >
                          96.8%
                        </text>
                      </svg>
                      <div className="text-center mt-2 text-sm text-gray-600">
                        명확성
                      </div>
                    </div>
                    <div className="relative">
                      <svg className="w-full" viewBox="0 0 100 60">
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="126"
                          strokeDashoffset={126 - (126 * 95.8) / 100}
                        />
                        <text
                          x="50"
                          y="45"
                          textAnchor="middle"
                          className="text-lg font-bold"
                          fill="#3b82f6"
                        >
                          95.8%
                        </text>
                      </svg>
                      <div className="text-center mt-2 text-sm text-gray-600">
                        응답 만족도
                      </div>
                    </div>
                  </div>

                  {/* 구분선 */}
                  <div className="border-t border-gray-200 my-4"></div>

                  {/* 부정적 지표 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <svg className="w-full" viewBox="0 0 100 60">
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="126"
                          strokeDashoffset={126 - (126 * 0.02) / 100}
                        />
                        <text
                          x="50"
                          y="45"
                          textAnchor="middle"
                          className="text-lg font-bold"
                          fill="#ef4444"
                        >
                          0.02%
                        </text>
                      </svg>
                      <div className="text-center mt-2 text-sm text-gray-600">
                        해악성
                      </div>
                    </div>
                    <div className="relative">
                      <svg className="w-full" viewBox="0 0 100 60">
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="126"
                          strokeDashoffset={126 - (126 * 0.01) / 100}
                        />
                        <text
                          x="50"
                          y="45"
                          textAnchor="middle"
                          className="text-lg font-bold"
                          fill="#ef4444"
                        >
                          0.01%
                        </text>
                      </svg>
                      <div className="text-center mt-2 text-sm text-gray-600">
                        차별성
                      </div>
                    </div>
                    <div className="relative">
                      <svg className="w-full" viewBox="0 0 100 60">
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="126"
                          strokeDashoffset={126 - (126 * 0.01) / 100}
                        />
                        <text
                          x="50"
                          y="45"
                          textAnchor="middle"
                          className="text-lg font-bold"
                          fill="#ef4444"
                        >
                          0.01%
                        </text>
                      </svg>
                      <div className="text-center mt-2 text-sm text-gray-600">
                        착취성
                      </div>
                    </div>
                    <div className="relative">
                      <svg className="w-full" viewBox="0 0 100 60">
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 50 A40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="126"
                          strokeDashoffset="126"
                        />
                        <text
                          x="50"
                          y="45"
                          textAnchor="middle"
                          className="text-lg font-bold"
                          fill="#ef4444"
                        >
                          0%
                        </text>
                      </svg>
                      <div className="text-center mt-2 text-sm text-gray-600">
                        위험 발언
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Services Section */}
      <section
        id="services"
        ref={addRef("services")}
        className={`py-24 bg-gray-50 transition-opacity duration-1000 ease-in-out ${
          isVisible["services"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">서비스 소개</h2>
            <p className="text-xl text-gray-600  mx-auto">
              Wavico는 음성, 이미지, 언어를 아우르는 인공지능 기술을 바탕으로
              다양한 서비스를 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <ServiceCard
                key={idx}
                service={service}
                delay={idx * 100}
                isVisible={isVisible["services"]}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Portfolio Preview Section */}
      <section
        id="portfolio-preview"
        ref={addRef("portfolio-preview")}
        className={`py-24 transition-opacity duration-1000 ease-in-out ${
          isVisible["portfolio-preview"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">포트폴리오</h2>
            <p className="text-xl text-gray-600  mx-auto">
              Wavico가 성공적으로 완료한 프로젝트들을 살펴보세요.
            </p>
          </div>

          <PortfolioPreview />

          <div className="text-center mt-12">
            <Button
              size="lg"
              asChild
              className="bg-wavico-blue hover:bg-wavico-darkblue"
            >
              <Link to="/portfolio">
                포트폴리오 더 보기 <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      <section
        id="cta"
        ref={addRef("cta")}
        className={`py-24 bg-wavico-blue text-white transition-opacity duration-1000 ease-in-out ${
          isVisible["cta"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            지금 상담해보세요
          </h2>
          <p className="text-xl  mx-auto mb-8">
            Wavico와 함께 귀사의 비즈니스를 혁신적으로 변화시키는 AI 솔루션을
            만나보세요.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-white text-wavico-blue hover:bg-gray-100 hover:text-wavico-darkblue text-lg"
          >
            <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
              실시간 상담하기 <MessageCircle className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
