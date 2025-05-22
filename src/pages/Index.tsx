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

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const observerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

      const botResponses = [
        "더 자세한 내용은 어떤 것이 궁금하신가요?",
        "웹/앱 개발에 대해 더 알고싶으시면 서비스 소개 페이지를 확인해보세요!",
        "AI 솔루션에 관심이 있으신가요? 상담 신청을 통해 자세한 상담이 가능합니다.",
        "Wavico는 음성, 이미지, 언어를 아우르는 인공지능 기술을 제공합니다.",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 2,
          text: randomResponse,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }, 1000);
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
              <div className="flex-1 flex flex-col min-w-0">
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
                    <h2 className="text-lg font-semibold">실시간 상담</h2>
                    <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-600 text-sm rounded">
                      기본 상담원
                    </span>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-white/80">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-4 max-w-[85%] sm:max-w-[80%] ${
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
                    <div className="mb-4 max-w-[85%] sm:max-w-[80%] mr-auto">
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
                <div className="bg-white/95 p-3 sm:p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                      }}
                      placeholder="메시지를 입력하세요..."
                      className="flex-1 border border-gray-200 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus-visible:ring-purple-400"
                    />
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 rounded-lg sm:rounded-l-none"
                      onClick={handleSendMessage}
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Stats */}
              <div className="hidden lg:block w-72 bg-white/95 border-l">
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
                  <div className="bg-white/80 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">총 상담 수</div>
                    <div className="text-2xl font-semibold text-purple-600">
                      0
                    </div>
                  </div>
                  <div className="bg-white/80 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      평균 만족도
                    </div>
                    <div className="text-2xl font-semibold text-purple-600">
                      0.0%
                    </div>
                  </div>
                  <div className="bg-white/80 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      긍정적 응답
                    </div>
                    <div className="text-2xl font-semibold text-purple-600">
                      0
                    </div>
                  </div>
                  <div className="bg-white/80 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      부정적 응답
                    </div>
                    <div className="text-2xl font-semibold text-purple-600">
                      0
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
