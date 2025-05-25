import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "이상거래탐지 모니터링 시스템",
    category: "시각화 대시보드",
    image: "/images/portfolio/fraud-detection.png",
    description:
      "Rule 기반과 ML 기반을 결합한 실시간 FDS 시스템. 거래 로그를 분석하여 이상 패턴을 탐지하고, 시각화 대시보드로 대응 지원.",
  },
  {
    id: 2,
    title: "AI 음성 뉴스 및 맞춤형 콘텐츠 서비스",
    category: "AI 솔루션",
    image: "/images/portfolio/voice-news.jpg",
    description:
      "GPT와 TTS를 통합한 음성 뉴스 요약 챗봇. 사용자 맞춤형 뉴스 추천 및 스트리밍 제공.",
  },
  {
    id: 3,
    title: "LOCAT: 위치 기반 로컬 플랫폼",
    category: "모바일 앱",
    image: "/images/portfolio/locat.png",
    description:
      "Flutter 기반 지도 연동 앱. 소셜 로그인, 실시간 위치 기반 탐색 및 사용자 인증 기능 구현.",
  },
  {
    id: 4,
    title: "테니스장 예약 플랫폼 '테니버스'",
    category: "모바일 앱",
    image: "/images/portfolio/tennis.png",
    description:
      "소규모 테니스 동호인을 위한 위치 기반 모바일 예약 플랫폼. 직관적인 UI/UX와 실시간 예약 기능 제공.",
  },
  {
    id: 5,
    title: "책 감성 분석 대시보드",
    category: "AI 솔루션",
    image: "/images/portfolio/book-sentiment.png",
    description:
      "책 문장 단위 감성 분류 모델과 대시보드를 통해 작품 감정 흐름을 시각화하고 인사이트 제공.",
  },
];

const PortfolioPreview = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "AI 솔루션",
    "시각화 대시보드",
    "웹 개발",
    "모바일 앱",
  ];

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full transition-all ${
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
        {filteredItems.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="portfolio-item group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <OptimizedImage
                src={item.image}
                alt={item.title}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/portfolio/default-portfolio.jpg";
                }}
                priority={item.id <= 3} // 첫 3개 이미지는 우선 로딩
              />
              <div className="portfolio-overlay p-6">
                <h3 className="text-white text-xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-white mb-4">{item.description}</p>
                <span className="bg-white/20 text-white text-sm py-1 px-3 rounded-full">
                  {item.category}
                </span>
                <Link
                  to="/portfolio"
                  state={{ selectedItemId: item.id }}
                  className="mt-4 inline-flex items-center text-white hover:underline"
                >
                  자세히 보기 <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPreview;
