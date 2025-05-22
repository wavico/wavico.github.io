
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

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
    title: "AI 기반 자동 번역 시스템",
    category: "AI 솔루션",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    description: "다양한 언어를 실시간으로 번역하는 인공지능 시스템",
  },
  {
    id: 2,
    title: "시각 데이터 대시보드",
    category: "시각화 대시보드",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    description: "기업 데이터를 직관적으로 시각화한 대시보드",
  },
  {
    id: 3,
    title: "모바일 뱅킹 앱",
    category: "모바일 앱",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d",
    description: "사용자 경험을 극대화한 모바일 뱅킹 애플리케이션",
  },
  {
    id: 4,
    title: "기업용 웹 포털",
    category: "웹 개발",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166",
    description: "기업 내부 시스템을 통합한 웹 포털 서비스",
  },
  {
    id: 5,
    title: "음성 인식 비서 시스템",
    category: "AI 솔루션",
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a",
    description: "자연어 처리 기술을 활용한 음성 인식 비서",
  },
  {
    id: 6,
    title: "이미지 분석 시스템",
    category: "AI 솔루션",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "이미지 분석을 통한 객체 인식 및 분류 시스템",
  },
];

const PortfolioPreview = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "AI 솔루션", "시각화 대시보드", "웹 개발", "모바일 앱"];

  const filteredItems = activeCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map(category => (
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
          <div key={item.id} className="portfolio-item group rounded-lg overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="portfolio-overlay p-6">
              <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-white mb-4">{item.description}</p>
              <span className="bg-white/20 text-white text-sm py-1 px-3 rounded-full">
                {item.category}
              </span>
              <Link
                to={`/portfolio/${item.id}`}
                className="mt-4 inline-flex items-center text-white hover:underline"
              >
                자세히 보기 <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPreview;
