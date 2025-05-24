import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Code,
  Image,
  BarChart2,
  Smartphone,
  Server,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Service = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [activeService, setActiveService] = useState<number>(0);
  const observerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

    // Auto-rotate featured service
    const interval = setInterval(() => {
      setActiveService((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const addRef = (id: string) => (el: HTMLDivElement) => {
    observerRefs.current[id] = el;
  };

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
    },
    {
      title: "AI 솔루션",
      icon: <Image className="w-12 h-12 text-wavico-blue" />,
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
    },
    {
      title: "시스템 통합",
      icon: <Server className="w-12 h-12 text-wavico-blue" />,
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
    },
    {
      title: "모바일 앱",
      icon: <Smartphone className="w-12 h-12 text-wavico-blue" />,
      description:
        "iOS와 Android에서 모두 사용 가능한 네이티브 및 크로스 플랫폼 앱을 개발합니다.",
      features: [
        "iOS 및 Android 네이티브 앱",
        "React Native, Flutter 등 크로스 플랫폼 개발",
        "푸시 알림 시스템 구현",
        "오프라인 기능 지원",
        "앱스토어 최적화 및 출시 지원",
      ],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
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
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="pt-40 pb-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            무엇을 제공하나요?
          </h1>
          <p className="text-xl max-w-2xl">
            Wavico는 음성·이미지·언어를 아우르는 인공지능 기술을 바탕으로 다양한
            서비스를 제공합니다. 여러분의 비즈니스에 필요한 맞춤형 솔루션을
            찾아보세요.
          </p>
        </div>
      </section>

      {/* Featured Service */}
      <section
        id="featured-service"
        ref={addRef("featured-service")}
        className={`py-24 transition-opacity duration-1000 ${
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
            <div
              className="relative h-[400px] overflow-hidden rounded-lg shadow-xl"
              style={{
                backgroundImage: `url(${services[activeService].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
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

      {/* All Services */}
      <section
        id="all-services"
        ref={addRef("all-services")}
        className={`py-24 bg-gray-50 transition-opacity duration-1000 ${
          isVisible["all-services"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">모든 서비스</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              귀사의 비즈니스에 필요한 서비스를 찾아보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all group ${
                  isVisible["all-services"] ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="mb-6 text-wavico-blue">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-wavico-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link
                  to="/contact"
                  className="text-wavico-blue font-medium flex items-center group-hover:text-wavico-darkblue"
                >
                  자세히 보기
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section
        id="process"
        ref={addRef("process")}
        className={`py-24 transition-opacity duration-1000 ${
          isVisible["process"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              프로젝트 진행 과정
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wavico는 체계적인 프로세스로 프로젝트를 진행합니다.
            </p>
          </div>

          <div className="relative">
            {/* Process timeline */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-wavico-blue"></div>

            {[
              {
                title: "요구사항 분석",
                description:
                  "고객의 비즈니스 요구사항을 정확히 파악하고 분석합니다.",
              },
              {
                title: "기획 및 설계",
                description:
                  "요구사항을 바탕으로 최적의 솔루션을 기획하고 설계합니다.",
              },
              {
                title: "개발 및 구현",
                description:
                  "최신 기술과 방법론을 적용하여 솔루션을 개발합니다.",
              },
              {
                title: "테스트 및 검증",
                description:
                  "품질 보증을 위한 철저한 테스트와 검증 과정을 거칩니다.",
              },
              {
                title: "배포 및 운영",
                description:
                  "개발된 솔루션을 안정적으로 배포하고 운영 지원을 제공합니다.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`relative md:flex items-center mb-16 ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } ${isVisible["process"] ? "animate-fade-in" : "opacity-0"}`}
                style={{ animationDelay: `${idx * 200}ms` }}
              >
                <div
                  className={`md:w-5/12 ${
                    idx % 2 === 0
                      ? "md:text-right md:pr-12"
                      : "md:text-left md:pl-12"
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-2">
                    {idx + 1}. {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {/* Timeline node */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div className="w-10 h-10 bg-wavico-blue rounded-full text-white flex items-center justify-center font-bold z-10">
                    {idx + 1}
                  </div>
                </div>

                <div className="md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="cta"
        ref={addRef("cta")}
        className={`py-24 bg-wavico-blue text-white transition-opacity duration-1000 ${
          isVisible["cta"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            프로젝트를 시작해볼까요?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Wavico와 함께 혁신적인 솔루션으로 비즈니스를 성장시키세요. 전문가의
            상담을 통해 최적의 서비스를 제안받을 수 있습니다.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-white text-wavico-blue hover:bg-gray-100 hover:text-wavico-darkblue text-lg"
          >
            <Link to="/contact">
              무료 상담 신청 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Service;
