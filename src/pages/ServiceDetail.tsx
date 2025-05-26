import {
  Check,
  Code,
  Image as ImageIcon,
  BarChart2,
  Server,
  Smartphone,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";

const ServiceDetail = () => {
  const location = useLocation();
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const observerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const scrollTarget = location.state?.scrollTo;
    if (scrollTarget) {
      const element = document.querySelector(scrollTarget);
      if (element) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100); // 페이지 로드 후 더 짧은 대기 시간
      }
    }
  }, [location, isLoaded]);

  const services = [
    {
      title: "웹/모바일 앱 개발",
      icon: <Code className="w-12 h-12 text-wavico-blue" />,
      description:
        "사용자 경험을 최우선으로 고려한 최신 기술 기반의 웹사이트와 모바일 앱을 개발합니다.",
      features: [
        "반응형 웹사이트 구축",
        "네이티브 및 하이브리드 앱 개발",
        "API 설계 및 개발",
        "사용자 인터페이스/경험 최적화",
        "지속적 유지보수 및 업데이트",
      ],
      image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5",
      link: "#web-mobile-detail",
    },
    {
      title: "AI 솔루션",
      icon: <ImageIcon className="w-12 h-12 text-wavico-blue" />,
      description:
        "음성, 이미지, 언어를 아우르는 인공지능 기술을 활용한 맞춤형 AI 솔루션을 제공합니다.",
      features: [
        "자연어 처리 (NLP) 기술",
        "이미지 인식 및 분석",
        "음성 인식 및 합성",
        "머신러닝/딥러닝 모델 개발",
        "AI 기반 추천 시스템",
      ],
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
      link: "#ai-solution-detail",
    },
    {
      title: "시각화 대시보드",
      icon: <BarChart2 className="w-12 h-12 text-wavico-blue" />,
      description:
        "복잡한 데이터를 직관적으로 이해할 수 있는 대시보드와 시각화 솔루션을 제공합니다.",
      features: [
        "실시간 데이터 모니터링",
        "맞춤형 대시보드 설계",
        "다양한 차트 및 그래프 제공",
        "데이터 필터링 및 분석 도구",
        "다양한 디바이스 지원",
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      link: "#dashboard-detail",
    },
    {
      title: "시스템 통합",
      icon: <Server className="w-12 h-12 text-gray-400" />,
      description:
        "기존 시스템과 새로운 시스템을 효율적으로 통합하여 업무 효율을 극대화합니다.",
      features: [
        "ERP/CRM 시스템 통합",
        "레거시 시스템 마이그레이션",
        "클라우드 환경 구축 및 마이그레이션",
        "데이터 연동 및 동기화",
        "시스템 최적화 및 성능 향상",
      ],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      disabled: true,
      link: "#system-integration-detail",
    },
    {
      title: "모바일 앱",
      icon: <Smartphone className="w-12 h-12 text-wavico-blue" />,
      description:
        "iOS와 Android에서 모두 사용 가능한 네이티브 및 크로스 플랫폼 앱을 개발합니다.",
      features: [
        "iOS 및 Android 네이티브 앱",
        "Flutter, Flutter 등 크로스 플랫폼 개발",
        "푸시 알림 시스템 구현",
        "오프라인 기능 지원",
        "앱스토어 최적화 및 출시 지원",
      ],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
      link: "#mobile-detail",
    },
    {
      title: "AI 챗봇",
      icon: <MessageSquare className="w-12 h-12 text-wavico-blue" />,
      description:
        "자연어 처리 기술을 활용한 지능형 챗봇으로 고객 서비스를 혁신합니다.",
      features: [
        "24/7 고객 지원",
        "자연어 이해 및 대화 기능",
        "다국어 지원",
        "기존 시스템 연동",
        "지속적인 학습 및 개선",
      ],
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
      link: "#chatbot-detail",
    },
  ];
  const addRef = (id: string) => (el: HTMLDivElement) => {
    observerRefs.current[id] = el;
  };

  useEffect(() => {
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

    Object.values(observerRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Helmet>
        <title>서비스 소개 | Wavico - AI·웹·앱 개발 전문 기업</title>
        <meta
          name="description"
          content="Wavico의 주요 서비스인 웹/모바일 앱 개발, AI 솔루션, 시각화 대시보드, 모바일 앱, AI 챗봇 등의 상세 소개와 기술 스택을 확인하세요."
        />
        <meta
          name="keywords"
          content="웹개발,앱개발,AI솔루션,시각화대시보드,시스템통합,모바일앱,AI챗봇,MVP,린개발"
        />
        <meta
          property="og:title"
          content="서비스 소개 | Wavico - AI·웹·앱 개발 전문 기업"
        />
        <meta
          property="og:description"
          content="Wavico의 주요 서비스인 웹/모바일 앱 개발, AI 솔루션, 시각화 대시보드, 모바일 앱, AI 챗봇 등의 상세 소개와 기술 스택을 확인하세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wavico.co.kr/service-detail" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="canonical" href="https://wavico.co.kr/service-detail" />
      </Helmet>

      {/* Page Header */}
      <section className="pt-40 pb-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">서비스 소개</h1>
          <p className="text-xl max-w-2xl">
            Wavico의 주요 서비스를 자세히 소개합니다. 각 서비스의 특징과 주요
            기능을 확인하실 수 있습니다.
          </p>
        </div>
      </section>

      {/* Featured Service */}
      <section
        id="featured-service"
        ref={addRef("featured-service")}
        className={`py-24 bg-gray-50 transition-opacity duration-1000 ${
          isVisible["featured-service"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">대표 서비스</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wavico의 주요 서비스를 확인하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl">
              <img
                src={services[activeService].image}
                alt={services[activeService].title}
                className="object-cover w-full h-full"
                loading="lazy"
                width={600}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {services[activeService].title}
                </h3>
                <p className="text-white text-lg mb-4">
                  {services[activeService].description}
                </p>
                <div className="flex space-x-2">
                  {services.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeService === idx ? "bg-white w-6" : "bg-white/50"
                      }`}
                      onClick={() => setActiveService(idx)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">주요 기능</h3>
              <ul className="space-y-4">
                {services[activeService].features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center bg-wavico-lightblue p-4 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-wavico-blue rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-gray-800">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  size="lg"
                  asChild
                  className="bg-wavico-blue hover:bg-wavico-darkblue"
                >
                  <Link to="/contact">
                    상담 신청하기 <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">모든 서비스</h2>
            <p className="text-xl text-gray-600  mx-auto">
              귀사의 비즈니스에 필요한 서비스를 찾아보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <ServiceCard
                key={idx}
                service={service}
                delay={idx * 100}
                isVisible={isVisible["services"]}
                isServiceDetailPage={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              기술 스택 및 프레임워크
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wavico가 보유한 핵심 기술과 전문성을 소개합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-xl mb-4 text-wavico-blue">
                AI & 머신러닝
              </h4>
              <p className="text-gray-600">
                TensorFlow, PyTorch, Scikit-learn, OpenCV, Ollama, LangChain
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-xl mb-4 text-wavico-blue">
                백엔드 & 인프라
              </h4>
              <p className="text-gray-600">
                FastAPI, Kafka, Grafana, Prometheus, Docker, Kubernetes
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-xl mb-4 text-wavico-blue">
                프론트엔드 & 웹
              </h4>
              <p className="text-gray-600">
                Flutter, React, Next.js, WebRTC, TypeScript, TailwindCSS
              </p>
            </div>
          </div>
        </div>
        <div className="py-24 max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col gap-24">
            {/* 웹/모바일 앱 개발 */}
            <div
              id="web-mobile-detail"
              className="flex flex-col md:flex-row items-center gap-12"
            >
              <div className="w-full">
                <h3 className="text-2xl font-bold mb-6 text-wavico-blue">
                  웹/모바일 앱 개발
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    최신 기술을 활용한 웹과 모바일 앱 개발 서비스를 제공합니다.
                    Flutter를 기반으로 한 크로스 플랫폼 앱 개발부터 회원 관리,
                    결제 시스템까지 통합적인 솔루션을 구축합니다.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Flutter 기반 크로스 플랫폼 앱 개발</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>
                        회원 관리 시스템 (회원가입, 로그인, 마이페이지)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>결제 시스템 연동 (Stripe, PayPal)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>실시간 채팅/음성 통화 기능</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Button
                    asChild
                    variant="outline"
                    className="bg-white hover:bg-gray-50 border-wavico-blue text-wavico-blue hover:text-wavico-darkblue"
                  >
                    <Link to="/portfolio?category=web-mobile">
                      포트폴리오 보기 <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* AI 솔루션 */}
            <div
              id="ai-solution-detail"
              className="flex flex-col md:flex-row items-center gap-12"
            >
              <div className="w-full">
                <h3 className="text-2xl font-bold mb-6 text-wavico-blue">
                  AI 솔루션
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    최첨단 AI 기술을 활용하여 이상 거래 탐지, 실시간 딥페이크
                    감지, 문서 인식 등 다양한 비즈니스 문제를 해결합니다. 맞춤형
                    AI 모델 개발을 통해 업무 효율성을 극대화합니다.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>이상 거래 탐지 시스템 (FDS) 구축</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>실시간 딥페이크 탐지 시스템</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>부동산 문서 OCR 및 데이터 추출</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>스켈레톤 기반 동작 인식 시스템</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Button
                    asChild
                    variant="outline"
                    className="bg-white hover:bg-gray-50 border-wavico-blue text-wavico-blue hover:text-wavico-darkblue"
                  >
                    <Link to="/portfolio?category=ai-solution">
                      포트폴리오 보기 <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* 시각화 대시보드 */}
            <div
              id="dashboard-detail"
              className="flex flex-col md:flex-row items-center gap-12"
            >
              <div className="w-full">
                <h3 className="text-2xl font-bold mb-6 text-wavico-blue">
                  시각화 대시보드
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Grafana를 활용한 실시간 모니터링 시스템과 커스텀 대시보드를
                    구축합니다. 복잡한 데이터를 직관적으로 시각화하여 효율적인
                    의사결정을 지원합니다.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Grafana 기반 실시간 AI 모델 모니터링</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>커스텀 대시보드 및 알림 시스템</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>실시간 데이터 분석 및 시각화</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>관리자용 통계 및 모니터링 시스템</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Button
                    asChild
                    variant="outline"
                    className="bg-white hover:bg-gray-50 border-wavico-blue text-wavico-blue hover:text-wavico-darkblue"
                  >
                    <Link to="/portfolio?category=dashboard">
                      포트폴리오 보기 <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* 모바일 앱 */}
            <div
              id="mobile-detail"
              className="flex flex-col md:flex-row items-center gap-12"
            >
              <div className="w-full">
                <h3 className="text-2xl font-bold mb-6 text-wavico-blue">
                  모바일 앱
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    iOS와 Android 플랫폼에 최적화된 네이티브 앱을 개발합니다.
                    WebRTC 기술을 활용한 실시간 영상 처리, 푸시 알림 등 다양한
                    모바일 기능을 구현합니다.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>iOS 및 Android 네이티브 앱 개발</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>WebRTC 기반 실시간 영상 처리</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>푸시 알림 및 실시간 메시징</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>앱스토어 최적화 및 배포 지원</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Button
                    asChild
                    variant="outline"
                    className="bg-white hover:bg-gray-50 border-wavico-blue text-wavico-blue hover:text-wavico-darkblue"
                  >
                    <Link to="/portfolio?category=mobile">
                      포트폴리오 보기 <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* AI 챗봇 */}
            <div
              id="chatbot-detail"
              className="flex flex-col md:flex-row items-center gap-12"
            >
              <div className="w-full">
                <h3 className="text-2xl font-bold mb-6 text-wavico-blue">
                  AI 챗봇
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Ollama와 ExaOne을 활용한 최신 LLM 기술 기반의 챗봇을
                    개발합니다. RAG 기술을 통해 기업 특화 지식을 갖춘 지능형
                    상담 시스템을 구축합니다.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Ollama 기반 커스텀 LLM 모델 개발</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>RAG 기반 지식 검색 시스템</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>ExaOne 기반 AI 응답 생성</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>24/7 자동 응답 및 고객 지원</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Button
                    asChild
                    variant="outline"
                    className="bg-white hover:bg-gray-50 border-wavico-blue text-wavico-blue hover:text-wavico-darkblue"
                  >
                    <Link to="/portfolio?category=chatbot">
                      포트폴리오 보기 <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {services.map((service, idx) => (
        <section
          key={idx}
          id={service.title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/\//g, "-")}
          ref={addRef(service.title)}
          className={`py-24 ${
            idx % 2 === 0 ? "bg-white" : "bg-gray-50"
          } transition-opacity duration-1000 ${
            isVisible[service.title] ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`${idx % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
                <div className="flex items-center mb-6">
                  {service.icon}
                  <h2 className="text-3xl font-bold ml-4">{service.title}</h2>
                </div>
                <p className="text-xl text-gray-600 mb-8">
                  {service.description}
                </p>
                <ul className="space-y-4">
                  {service.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start">
                      <Check className="w-6 h-6 text-wavico-blue mt-1 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${idx % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    width={600}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))} */}
    </div>
  );
};

export default ServiceDetail;
