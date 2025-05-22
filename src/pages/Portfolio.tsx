
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  client?: string;
  technology?: string[];
  challenge?: string;
  solution?: string;
  result?: string;
}

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
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

    return () => {
      observer.disconnect();
    };
  }, []);

  const addRef = (id: string) => (el: HTMLDivElement) => {
    observerRefs.current[id] = el;
  };

  const categories = ["All", "AI 솔루션", "시각화 대시보드", "웹 개발", "모바일 앱", "시스템 통합"];

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "AI 기반 자동 번역 시스템",
      category: "AI 솔루션",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      description: "다양한 언어를 실시간으로 번역하는 인공지능 시스템",
      client: "글로벌 교육 기업",
      technology: ["Python", "PyTorch", "React", "AWS"],
      challenge: "여러 언어 간 실시간 번역 시 높은 정확도 유지 및 대용량 처리",
      solution: "최신 딥러닝 모델과 자연어 처리 기술을 활용한 번역 엔진 개발",
      result: "99% 이상의 번역 정확도 달성 및 초당 500건 이상의 처리 속도 구현",
    },
    {
      id: 2,
      title: "시각 데이터 대시보드",
      category: "시각화 대시보드",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      description: "기업 데이터를 직관적으로 시각화한 대시보드",
      client: "국내 대기업 금융사",
      technology: ["React", "D3.js", "TypeScript", "GraphQL"],
      challenge: "대량의 금융 데이터를 실시간으로 처리하고 직관적으로 시각화하는 문제",
      solution: "최적화된 데이터 파이프라인과 맞춤형 시각화 컴포넌트 개발",
      result: "의사결정 시간 60% 단축 및 데이터 기반 인사이트 도출 능력 향상",
    },
    {
      id: 3,
      title: "모바일 뱅킹 앱",
      category: "모바일 앱",
      image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d",
      description: "사용자 경험을 극대화한 모바일 뱅킹 애플리케이션",
      client: "디지털 은행",
      technology: ["React Native", "Node.js", "Firebase", "Biometrics API"],
      challenge: "보안성을 유지하면서도 사용자 경험을 최적화하는 뱅킹 앱 개발",
      solution: "생체인식 기술과 AI 기반 개인화 서비스를 결합한 직관적인 UX 설계",
      result: "출시 3개월 만에 100만 다운로드 달성 및 사용자 만족도 92% 기록",
    },
    {
      id: 4,
      title: "기업용 웹 포털",
      category: "웹 개발",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166",
      description: "기업 내부 시스템을 통합한 웹 포털 서비스",
      client: "글로벌 제조업체",
      technology: ["Angular", "Java Spring Boot", "MySQL", "Docker"],
      challenge: "여러 레거시 시스템을 하나의 플랫폼으로 통합하는 과제",
      solution: "마이크로서비스 아키텍처와 API 게이트웨이를 활용한 통합 플랫폼 구축",
      result: "업무 효율성 40% 향상 및 시스템 관리 비용 30% 절감",
    },
    {
      id: 5,
      title: "음성 인식 비서 시스템",
      category: "AI 솔루션",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a",
      description: "자연어 처리 기술을 활용한 음성 인식 비서",
      client: "국내 전자기기 제조사",
      technology: ["TensorFlow", "Python", "WebSockets", "C++"],
      challenge: "다양한 악센트와 환경 소음에서도 정확한 음성 인식 구현",
      solution: "노이즈 캔슬링 알고리즘과 맥락 기반 음성 이해 모델 개발",
      result: "95% 이상의 인식 정확도 달성 및 대화 지속성 향상",
    },
    {
      id: 6,
      title: "이미지 분석 시스템",
      category: "AI 솔루션",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      description: "이미지 분석을 통한 객체 인식 및 분류 시스템",
      client: "보안 솔루션 기업",
      technology: ["PyTorch", "OpenCV", "CUDA", "AWS"],
      challenge: "실시간 영상에서 높은 정확도로 객체를 인식하고 분류하는 시스템 개발",
      solution: "최신 CNN 모델과 커스텀 알고리즘을 결합한 하이브리드 아키텍처 구현",
      result: "실시간 처리 속도 2배 향상 및 인식 정확도 98% 달성",
    },
    {
      id: 7,
      title: "스마트팩토리 통합 시스템",
      category: "시스템 통합",
      image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1",
      description: "제조 공정을 최적화하는 스마트팩토리 솔루션",
      client: "자동차 부품 제조사",
      technology: ["IoT", "MQTT", "Node-RED", "Python", "PostgreSQL"],
      challenge: "여러 생산 라인의 설비를 통합 모니터링하고 제어하는 시스템 구축",
      solution: "IoT 기기 연동 및 실시간 데이터 분석 플랫폼 개발",
      result: "생산성 35% 향상 및 불량률 20% 감소",
    },
    {
      id: 8,
      title: "실시간 협업 플랫폼",
      category: "웹 개발",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      description: "팀 협업을 위한 실시간 커뮤니케이션 플랫폼",
      client: "글로벌 IT 서비스 기업",
      technology: ["Vue.js", "WebRTC", "Socket.io", "MongoDB"],
      challenge: "지연 없는 실시간 협업과 대용량 파일 공유 기능 구현",
      solution: "P2P 기반 파일 전송 및 최적화된 실시간 통신 아키텍처 설계",
      result: "프로젝트 완료 시간 25% 단축 및 사용자 만족도 90% 이상 기록",
    },
    {
      id: 9,
      title: "헬스케어 모니터링 앱",
      category: "모바일 앱",
      image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
      description: "개인 건강 데이터를 관리하는 모바일 앱",
      client: "디지털 헬스케어 스타트업",
      technology: ["Flutter", "Firebase", "HealthKit", "Google Fit API"],
      challenge: "다양한 웨어러블 기기와의 연동 및 개인 건강 데이터 보안 확보",
      solution: "표준 건강 데이터 프로토콜 지원 및 앤드투앤드 암호화 구현",
      result: "출시 6개월 만에 50만 다운로드 달성 및 사용자 참여도 30% 증가",
    },
  ];

  const filteredItems = activeCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div>
      {/* Page Header */}
      <section className="pt-40 pb-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            포트폴리오
          </h1>
          <p className="text-xl max-w-2xl">
            Wavico가 성공적으로 완료한 프로젝트들을 살펴보세요.
            고객의 요구에 맞춘 혁신적인 솔루션을 제공한 다양한 사례를 확인할 수 있습니다.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section
        id="portfolio-grid"
        ref={addRef("portfolio-grid")}
        className={`py-24 transition-opacity duration-1000 ${
          isVisible["portfolio-grid"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full transition-all text-sm md:text-base ${
                  activeCategory === category
                    ? "bg-wavico-blue text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className={`portfolio-item rounded-lg overflow-hidden cursor-pointer shadow-md transition-all hover:shadow-lg ${
                  isVisible["portfolio-grid"] ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${item.id * 100}ms` }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-64">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="portfolio-overlay p-6">
                    <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white mb-4">{item.description}</p>
                    <span className="bg-white/20 text-white text-sm py-1 px-3 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.category}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">
                선택한 카테고리에 해당하는 프로젝트가 없습니다.
              </h3>
              <Button
                className="mt-4 bg-wavico-blue hover:bg-wavico-darkblue"
                onClick={() => setActiveCategory("All")}
              >
                모든 프로젝트 보기
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Case Study CTA */}
      <section
        id="case-study"
        ref={addRef("case-study")}
        className={`py-24 bg-gray-50 transition-opacity duration-1000 ${
          isVisible["case-study"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              고객이 선택한 이유
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wavico는 고객의 성공을 최우선으로 생각합니다.
              실제 고객 사례를 통해 Wavico가 어떻게 문제를 해결했는지 확인하세요.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-96 lg:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Case Study" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12">
                <span className="inline-block bg-wavico-lightblue text-wavico-blue px-3 py-1 text-sm rounded-full mb-4">
                  AI 솔루션
                </span>
                <h3 className="text-2xl font-bold mb-4">글로벌 교육 기업을 위한 AI 번역 시스템</h3>
                <p className="text-gray-600 mb-6">
                  여러 국가의 교육 콘텐츠를 실시간으로 번역해야 하는 글로벌 교육 기업을 위해
                  Wavico는 고성능 AI 번역 엔진을 개발했습니다. 이를 통해 99% 이상의 번역 정확도와
                  초당 500건 이상의 처리 속도를 구현했습니다.
                </p>
                <div className="space-y-2 mb-6">
                  <p className="font-medium">도입 효과:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>교육 컨텐츠 현지화 시간 80% 단축</li>
                    <li>15개국 언어 지원으로 시장 확대</li>
                    <li>학습자 만족도 25% 향상</li>
                  </ul>
                </div>
                <Button
                  asChild
                  className="bg-wavico-blue hover:bg-wavico-darkblue flex items-center"
                >
                  <Link to="/contact">
                    유사한 프로젝트 의뢰하기 <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="relative">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                className="w-full h-64 md:h-80 object-cover"
              />
              <button 
                className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center"
                onClick={() => setSelectedItem(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 md:p-8">
              <span className="inline-block bg-wavico-lightblue text-wavico-blue px-3 py-1 text-sm rounded-full mb-4">
                {selectedItem.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{selectedItem.title}</h2>
              <p className="text-gray-600 text-lg mb-8">{selectedItem.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {selectedItem.client && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">고객사</h3>
                    <p className="text-gray-600">{selectedItem.client}</p>
                  </div>
                )}
                
                {selectedItem.technology && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">사용 기술</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.technology.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-6 mb-8">
                {selectedItem.challenge && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">과제</h3>
                    <p className="text-gray-600">{selectedItem.challenge}</p>
                  </div>
                )}
                
                {selectedItem.solution && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">솔루션</h3>
                    <p className="text-gray-600">{selectedItem.solution}</p>
                  </div>
                )}
                
                {selectedItem.result && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">결과</h3>
                    <p className="text-gray-600">{selectedItem.result}</p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-wavico-blue hover:bg-wavico-darkblue"
                >
                  <Link to="/contact">
                    유사한 프로젝트 의뢰하기 <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedItem(null)}
                >
                  닫기
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section
        id="portfolio-cta"
        ref={addRef("portfolio-cta")}
        className={`py-24 bg-wavico-blue text-white transition-opacity duration-1000 ${
          isVisible["portfolio-cta"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            나만의 프로젝트를 시작해보세요
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Wavico의 전문가들과 함께 귀사의 비즈니스 문제를 해결할 수 있는
            최적의 솔루션을 찾아보세요.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-white text-wavico-blue hover:bg-gray-100 hover:text-wavico-darkblue text-lg"
          >
            <Link to="/contact">
              프로젝트 상담 신청 <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
