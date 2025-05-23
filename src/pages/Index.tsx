import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "안녕하세요! 저는 Wavico의 AI 연구원 김선민입니다. 무엇을 도와드릴까요?",
      isUser: false,
      timestamp: new Date(),
      persona: {
        name: "김선민",
        role: "AI 연구원",
        avatar: "/avatars/sunmin.png",
      },
    },
  ]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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

  // Add ref to the object
  const addRef = (id: string) => (el: HTMLDivElement) => {
    observerRefs.current[id] = el;
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

      const availablePersonas = [
        {
          name: "김선민",
          role: "AI 연구원",
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
        availablePersonas[Math.floor(Math.random() * availablePersonas.length)];
      const response =
        persona.responses[Math.floor(Math.random() * persona.responses.length)];

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
            role: "AI 연구원",
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

  const bannerSlides = [
    {
      title: "누구나 쉽고 빠르게 이용하는",
      subtitle: "AI 음성·이미지·언어 서비스",
      description:
        "Wavico는 기획부터 배포까지 한 번에 해결하는 End-to-End AI 서비스를 제공합니다.",
      bgClass: "bg-gradient-to-r from-blue-500 to-purple-600",
    },
    {
      title: "언제 어디서든 접근 가능한",
      subtitle: "웹/앱 개발 서비스",
      description:
        "최신 기술과 트렌드를 반영한 웹사이트와 모바일 앱을 개발합니다.",
      bgClass: "bg-gradient-to-r from-cyan-500 to-blue-600",
    },
    {
      title: "데이터를 한눈에 파악하는",
      subtitle: "시각화 대시보드",
      description:
        "복잡한 데이터를 직관적으로 이해할 수 있는 시각화 솔루션을 제공합니다.",
      bgClass: "bg-gradient-to-r from-indigo-500 to-purple-600",
    },
  ];

  const services = [
    {
      title: "웹/앱 개발",
      description:
        "최신 기술과 트렌드를 반영한 웹사이트와 모바일 앱을 개발합니다.",
      icon: <Code className="w-10 h-10 text-wavico-blue" />,
      link: "/service",
    },
    {
      title: "AI 솔루션",
      description: "음성, 이미지, 언어를 아우르는 인공지능 기술을 제공합니다.",
      icon: <Image className="w-10 h-10 text-wavico-blue" />,
      link: "/service",
    },
    {
      title: "시각화 대시보드",
      description:
        "복잡한 데이터를 직관적으로 이해할 수 있는 시각화 솔루션을 제공합니다.",
      icon: <BarChart2 className="w-10 h-10 text-wavico-blue" />,
      link: "/service",
    },
    {
      title: "모바일 앱",
      description:
        "iOS와 Android에서 모두 사용 가능한 네이티브 및 크로스 플랫폼 앱을 개발합니다.",
      icon: <Smartphone className="w-10 h-10 text-wavico-blue" />,
      link: "/service",
    },
  ];

  return (
    <div className="overflow-hidden">
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
                <div className="max-w-3xl text-white animate-fade-in">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                    {slide.title}
                  </h1>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
                    {slide.subtitle}
                  </h2>
                  <p className="text-xl mb-8 max-w-xl">{slide.description}</p>
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
                  <Button variant="ghost" size="icon" className="text-gray-600">
                    <Plus size={20} />
                  </Button>
                </div>
                <div className="p-2">
                  {/* Chat history items would go here */}
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
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4">
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
                        onClick={() => imageInputRef.current?.click()}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Image size={18} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-gray-500 hover:text-gray-700"
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
                        placeholder="메시지를 입력하세요..."
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleSendMessage}
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

              {/* Right Sidebar - Team Info */}
              <div className="hidden lg:block w-72 bg-white/95 border-l">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">Wavico 팀 소개</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        김
                      </div>
                      <div>
                        <div className="font-medium">김선민</div>
                        <div className="text-sm text-gray-600">AI 연구원</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        조
                      </div>
                      <div>
                        <div className="font-medium">조용성</div>
                        <div className="text-sm text-gray-600">
                          솔루션 아키텍트
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        김
                      </div>
                      <div>
                        <div className="font-medium">김서령</div>
                        <div className="text-sm text-gray-600">
                          프로젝트 매니저
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Monitoring Stats */}
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">
                      실시간 모니터링
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Response Rate */}
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <CheckCircle size={16} className="text-blue-600" />
                          <span className="text-xs text-gray-500">응답률</span>
                        </div>
                        <div className="text-lg font-semibold text-blue-600">
                          {monitoringStats.responseRate}%
                        </div>
                        <div className="w-full bg-blue-200 h-1.5 rounded-full mt-1">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{
                              width: `${monitoringStats.responseRate}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Average Response Time */}
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Clock size={16} className="text-green-600" />
                          <span className="text-xs text-gray-500">
                            평균 응답
                          </span>
                        </div>
                        <div className="text-lg font-semibold text-green-600">
                          {monitoringStats.avgResponseTime}분
                        </div>
                        <div className="w-full bg-green-200 h-1.5 rounded-full mt-1">
                          <div
                            className="bg-green-600 h-1.5 rounded-full"
                            style={{
                              width: `${
                                (monitoringStats.avgResponseTime / 5) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Daily Chats */}
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <MessageCircle
                            size={16}
                            className="text-purple-600"
                          />
                          <span className="text-xs text-gray-500">
                            일일 상담
                          </span>
                        </div>
                        <div className="text-lg font-semibold text-purple-600">
                          {monitoringStats.dailyChats}건
                        </div>
                        <div className="w-full bg-purple-200 h-1.5 rounded-full mt-1">
                          <div
                            className="bg-purple-600 h-1.5 rounded-full"
                            style={{
                              width: `${
                                (monitoringStats.dailyChats / 200) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Satisfaction Rate */}
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Users size={16} className="text-orange-600" />
                          <span className="text-xs text-gray-500">만족도</span>
                        </div>
                        <div className="text-lg font-semibold text-orange-600">
                          {monitoringStats.satisfaction}%
                        </div>
                        <div className="w-full bg-orange-200 h-1.5 rounded-full mt-1">
                          <div
                            className="bg-orange-600 h-1.5 rounded-full"
                            style={{
                              width: `${monitoringStats.satisfaction}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      * 이 채팅은 데모용으로, 실제 상담을 원하시면 카카오톡
                      채널을 이용해주세요.
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Wavico와 함께 귀사의 비즈니스를 혁신적으로 변화시키는 AI 솔루션을
            만나보세요.
          </p>
          <Button
            size="lg"
            className="bg-white text-wavico-blue hover:bg-gray-100 hover:text-wavico-darkblue text-lg"
          >
            실시간 상담하기 <MessageCircle className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
