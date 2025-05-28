import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { OptimizedImage } from "@/components/ui/optimized-image";

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
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const observerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (location.state?.selectedItemId) {
      const item = portfolioItems.find(
        (item) => item.id === location.state.selectedItemId
      );
      if (item) {
        setSelectedItem(item);
      }
    }
  }, [location]);

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

  const categories = [
    "All",
    "AI 모델링",
    "시각화 대시보드",
    "웹/모바일 앱 개발",
    "AI 챗봇",
    "AI 파이프라인 운영",
  ];

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "이상거래탐지 모니터링 시스템",
      category: "시각화 대시보드",
      image: "/images/portfolio/fraud-web.png",
      description:
        "Rule 기반과 ML 기반을 결합한 실시간 FDS 시스템. 거래 로그를 분석하여 이상 패턴을 탐지하고, 시각화 대시보드로 대응 지원.",
      client: "국내 금융 보안팀",
      technology: ["Python", "PyTorch", "LightGBM", "Azure", "Power BI"],
      challenge: "정상 거래와 유사한 이상 거래 탐지 및 실시간 대응 체계 구축",
      solution:
        "Isolation Forest 및 Rule 기반 로직을 통합한 하이브리드 탐지 시스템 구현",
      result: "탐지 정확도 92% 이상 달성, 운영 리스크 사전 대응율 30% 개선",
    },
    // {
    //   id: 2,
    //   title: "AI 음성 뉴스 및 맞춤형 콘텐츠 서비스",
    //   category: "AI 솔루션",
    //   image: "/images/portfolio/voice-news.jpg",
    //   description:
    //     "GPT와 TTS를 통합한 음성 뉴스 요약 챗봇. 사용자 맞춤형 뉴스 추천 및 스트리밍 제공.",
    //   client: "모바일 콘텐츠 플랫폼 스타트업",
    //   technology: ["Python", "GPT", "Whisper", "AWS Polly", "React Native"],
    //   challenge: "사용자 관심 기반 뉴스 요약과 음성 스트리밍을 자연스럽게 연결",
    //   solution:
    //     "멀티모달 구조로 GPT 요약 결과를 TTS로 전환하고, 개인화 키워드 필터링 도입",
    //   result: "일평균 청취율 60% 이상, 사용자 피드백 기반 추천 정확도 25% 향상",
    // },
    {
      id: 3,
      title: "LOCAT: 위치 기반 로컬 플랫폼",
      category: "웹/모바일 앱",
      image: "/images/portfolio/locat.png",
      description:
        "Flutter 기반 지도 연동 앱. 소셜 로그인, 실시간 위치 기반 탐색 및 사용자 인증 기능 구현.",
      client: "지역 상권 기반 플랫폼 기업",
      technology: ["Flutter", "Firebase", "Kakao Login", "Naver Maps API"],
      challenge: "안드로이드와 iOS 간 UI 통일성과 지도 기능 최적화",
      solution: "Flutter 기반 통합 개발 및 Naver Maps 커스텀 마커 기능 구현",
      result: "플랫폼 누적 사용자 1만 명 확보, 월간 사용자 재방문율 40% 기록",
    },
    {
      id: 4,
      title: "테니스장 예약 플랫폼 '테니버스'",
      category: "웹/모바일 앱",
      image: "/images/portfolio/tennis.png",
      description:
        "소규모 테니스 동호인을 위한 위치 기반 모바일 예약 플랫폼. 직관적인 UI/UX와 실시간 예약 기능 제공.",
      client: "스포츠 소모임 운영사",
      technology: ["Flutter", "Firebase", "Kakao Login", "예약 관리 API"],
      challenge: "비 IT 사용자도 쉽게 접근할 수 있는 UX와 예약 시스템 구성",
      solution: "최소 클릭 구조의 UX 설계 및 시간대 기반 실시간 예약 로직 구현",
      result: "출시 1개월 내 사용자 3천 명 유입, 예약 성공률 95% 이상 유지",
    },
    // {
    //   id: 5,
    //   title: "책 감성 분석 대시보드",
    //   category: "AI 솔루션",
    //   image: "/images/portfolio/book-sentiment.png",
    //   description:
    //     "책 문장 단위 감성 분류 모델과 대시보드를 통해 작품 감정 흐름을 시각화하고 인사이트 제공.",
    //   client: "콘텐츠 기획 및 출판 기업",
    //   technology: ["PyTorch", "Transformers", "React", "Chart.js"],
    //   challenge: "긴 문단의 감정을 문장 단위로 정확히 분해 및 시각화하는 문제",
    //   solution: "sLLM 기반 감정 분류기 개발 및 페이지 단위 감정 흐름 분석 구현",
    //   result: "콘텐츠 감정 곡선 분석 활용으로 기획 회의 활용도 3배 증가",
    // },
  ];

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      <Helmet>
        <title>포트폴리오 | Wavico - AI·웹·앱 개발 전문 기업</title>
        <meta
          name="description"
          content="Wavico가 성공적으로 완료한 프로젝트들을 소개합니다. AI, 웹, 앱 개발 분야의 다양한 레퍼런스를 확인하세요."
        />
        <meta
          name="keywords"
          content="포트폴리오,프로젝트,레퍼런스,AI개발사례,웹개발사례,앱개발사례"
        />
      </Helmet>

      {/* Page Header */}
      <section className="pt-40 pb-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">포트폴리오</h1>
          <p className="text-xl max-w-2xl">
            Wavico가 성공적으로 완료한 프로젝트들을 살펴보세요. 고객의 요구에
            맞춘 혁신적인 솔루션을 제공한 다양한 사례를 확인할 수 있습니다.
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
            {categories.map((category) => (
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
                className={`portfolio-item rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all ${
                  isVisible["portfolio-grid"] ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${item.id * 100}ms` }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                    priority={item.id <= 6}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/portfolio/default-portfolio.jpg";
                    }}
                  />
                  <div className="portfolio-overlay p-6">
                    <h3 className="text-white text-xl font-bold mb-2">
                      {item.title}
                    </h3>
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
              Wavico는 고객의 성공을 최우선으로 생각합니다. 실제 고객 사례를
              통해 Wavico가 어떻게 문제를 해결했는지 확인하세요.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-96 lg:h-auto relative">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster="/images/portfolio/fraud-web.png"
                >
                  <source src="/video/fraud.mp4" type="video/mp4" />
                  <source src="/video/fraud.webm" type="video/webm" />이
                  브라우저는 비디오 태그를 지원하지 않습니다.
                </video>
                <div
                  className="absolute inset-0 bg-wavico-blue/10 backdrop-blur-[1px]"
                  aria-hidden="true"
                />
              </div>
              <div className="p-8 lg:p-12">
                <span className="inline-block bg-wavico-lightblue text-wavico-blue px-3 py-1 text-sm rounded-full mb-4">
                  시각화 대시보드
                </span>
                <h3 className="text-2xl font-bold mb-4">
                  실시간 이상거래 탐지를 위한 AI 기반 FDS 시스템
                </h3>
                <p className="text-gray-600 mb-6">
                  금융 보안 강화를 위해 Wavico는 Rule 기반과 머신러닝 기반을
                  결합한 이상거래탐지(FDS) 시스템을 구축했습니다. 거래 로그,
                  디바이스 정보, 인증 기록 등을 종합 분석하여 실시간 탐지와
                  시각화를 가능하게 했습니다.
                </p>
                <div className="space-y-2 mb-6">
                  <p className="font-medium">도입 효과:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>이상거래 탐지 정확도 92% 이상 달성</li>
                    <li>리스크 대응 시간 30% 단축</li>
                    <li>복합 탐지 룰 기반 보안 정책 강화</li>
                  </ul>
                </div>

                <Button
                  asChild
                  className="bg-wavico-blue hover:bg-wavico-darkblue flex items-center"
                >
                  <Link to="/contact">
                    유사한 프로젝트 의뢰하기{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
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
            <div className="relative aspect-video">
              <OptimizedImage
                src={selectedItem.image}
                alt={selectedItem.title}
                width={1200}
                height={675}
                className="w-full h-full object-contain bg-gray-100"
                priority={true}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/portfolio/default-portfolio.jpg";
                }}
              />
              <button
                className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                onClick={() => setSelectedItem(null)}
              >
                ✕
              </button>
            </div>

            <div className="p-6 md:p-8">
              <span className="inline-block bg-wavico-lightblue text-wavico-blue px-3 py-1 text-sm rounded-full mb-4">
                {selectedItem.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {selectedItem.title}
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                {selectedItem.description}
              </p>

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
                    유사한 프로젝트 의뢰하기{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => setSelectedItem(null)}>
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
