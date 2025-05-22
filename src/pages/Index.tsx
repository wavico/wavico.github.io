
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart2, Code, Image, MessageCircle, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ServiceCard from "@/components/ServiceCard";
import PortfolioPreview from "@/components/PortfolioPreview";

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
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

  const bannerSlides = [
    {
      title: "누구나 쉽고 빠르게 이용하는",
      subtitle: "AI 음성·이미지·언어 서비스",
      description: "Wavico는 기획부터 배포까지 한 번에 해결하는 End-to-End AI 서비스를 제공합니다.",
      bgClass: "bg-gradient-to-r from-blue-500 to-purple-600",
    },
    {
      title: "언제 어디서든 접근 가능한",
      subtitle: "웹/앱 개발 서비스",
      description: "최신 기술과 트렌드를 반영한 웹사이트와 모바일 앱을 개발합니다.",
      bgClass: "bg-gradient-to-r from-cyan-500 to-blue-600",
    },
    {
      title: "데이터를 한눈에 파악하는",
      subtitle: "시각화 대시보드",
      description: "복잡한 데이터를 직관적으로 이해할 수 있는 시각화 솔루션을 제공합니다.",
      bgClass: "bg-gradient-to-r from-indigo-500 to-purple-600",
    },
  ];

  const services = [
    {
      title: "웹/앱 개발",
      description: "최신 기술과 트렌드를 반영한 웹사이트와 모바일 앱을 개발합니다.",
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
      description: "복잡한 데이터를 직관적으로 이해할 수 있는 시각화 솔루션을 제공합니다.",
      icon: <BarChart2 className="w-10 h-10 text-wavico-blue" />,
      link: "/service",
    },
    {
      title: "모바일 앱",
      description: "iOS와 Android에서 모두 사용 가능한 네이티브 및 크로스 플랫폼 앱을 개발합니다.",
      icon: <Smartphone className="w-10 h-10 text-wavico-blue" />,
      link: "/service",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Banner */}
      <section className="relative h-screen">
        {bannerSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center ${
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
                <p className="text-xl mb-8 max-w-xl">
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
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              서비스 소개
            </h2>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              포트폴리오
            </h2>
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
            Wavico와 함께 귀사의 비즈니스를 혁신적으로 변화시키는 AI 솔루션을 만나보세요.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-white text-wavico-blue hover:bg-gray-100 hover:text-wavico-darkblue text-lg"
          >
            <Link to="/contact">
              무료 상담 신청 <MessageCircle className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
