import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Helmet } from "react-helmet-async";
import { OptimizedImage } from "@/components/ui/optimized-image";
import styles from "./Portfolio.module.css";

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
  background?: {
    problems?: string[];
    goals?: string[];
    keyPoints?: string[];
  };
  achievements?: string[];
  keyFeatures?: string[];
  timeline?: {
    phase: string;
    date: string;
    details: string[];
  }[];
  details?: {
    introduction?: string;
    target?: string;
    developmentScope?: {
      areas?: string[];
      environment?: string[];
    };
    mainTasks?: string[];
    focusPoints?: string[];
  };
  carouselImages?: string[];
}

const locatImages = [
  "/images/portfolio/locat/1.png",
  "/images/portfolio/locat/2.png",
  "/images/portfolio/locat/3.png",
  "/images/portfolio/locat/4.png",
];

const tenniverseImages = [
  "/images/portfolio/tennis/1.png",
  "/images/portfolio/tennis/2.png",
  "/images/portfolio/tennis/3.png",
  "/images/portfolio/tennis/4.png",
];

const CenteredCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [imageRatio, setImageRatio] = useState(0.75); // 기본 비율 설정

  const prev = () => {
    setCenterIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const next = () => {
    setCenterIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // const getVisibleItems = () => {
  //   const visible = [];
  //   for (let i = -2; i <= 2; i++) {
  //     visible.push(images[(centerIndex + i + images.length) % images.length]);
  //   }
  //   return visible;
  // };

  const getVisibleItems = () => {
    const maxItems = window.innerWidth < 768 ? 1 : 5; // 모바일은 1장
    const range = Math.floor(maxItems / 2);
    const visible = [];

    for (let i = -range; i <= range; i++) {
      const index = (centerIndex + i + images.length) % images.length;
      visible.push({ index, src: images[index], position: i });
    }
    return visible;
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const ratio = img.naturalWidth / img.naturalHeight;
    setImageRatio(ratio);
  };

  const cardHeight = 550;
  const cardWidth = Math.round(cardHeight * imageRatio);

  return (
    <div className={styles["carousel-container"]}>
      <button onClick={prev} className={styles["nav-button"]}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <div className={styles.carousel}>
        {getVisibleItems().map(({ index, src, position }) => {
          const scale = 1 - Math.abs(position) * 0.2;
          const zIndex = 5 - Math.abs(position);
          const translateX = position * 80;

          return (
            <div
              key={`${src}-${centerIndex}`}
              className={styles["carousel-item"]}
              style={{
                transform: `translateX(${translateX}%) scale(${scale})`,
                zIndex,
                opacity: scale,
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                left: "50%",
                marginLeft: `-${cardWidth / 2}px`,
                transformOrigin: "center center",
                position: "absolute", // 꼭 필요
              }}
            >
              <OptimizedImage
                src={src}
                alt={`Carousel image ${index + 1}`}
                width={cardWidth}
                height={cardHeight}
                className="block h-full w-auto object-contain"
                priority={true}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/portfolio/default-portfolio.jpg";
                }}
                onLoad={handleImageLoad}
                style={{
                  margin: 0,
                  display: "block",
                }}
              />
            </div>
          );
        })}
      </div>
      <button onClick={next} className={styles["nav-button"]}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

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
        "송금 서비스 사용자들을 대상으로, 실시간 거래 데이터를 분석하여 이상 거래를 조기에 탐지하는 AI 기반 FDS(Fraud Detection System).",
      client: "금융사 보안팀, 핀테크 서비스 운영사",
      technology: [
        "Python",
        "PyTorch",
        "LightGBM",
        "Scikit-learn",
        "Power BI",
        "Databricks",
        "Azure Cloud",
      ],
      details: {
        introduction:
          "AI 기반 금융 보안 서비스는 송금 서비스 사용자들을 대상으로, 실시간 거래 데이터를 분석하여 이상 거래를 조기에 탐지하는 AI 기반 FDS 시스템입니다.",
        target:
          "금융사 보안팀, 핀테크 서비스 운영사 등 B2B 금융 보안 솔루션 수요 기업",
        developmentScope: {
          areas: [
            "백엔드 데이터 파이프라인 및 이상 탐지 모델링",
            "Rule-based + 머신러닝 모델 개발 및 통합",
            "이상 거래 시각화 대시보드 구성",
          ],
          environment: [
            "Python, PyTorch, LightGBM, Scikit-learn",
            "Power BI (리스크 분석용 대시보드 시각화)",
            "Databricks, Azure Cloud (데이터 파이프라인 및 ML 운영환경)",
          ],
        },
        mainTasks: [
          "실시간 이상 거래 탐지 시스템 구축",
          "Rule-based 탐지 로직 구성 및 시각화",
          "ML 기반 이상거래 확률 예측 모델 개발",
          "이상거래 모니터링 대시보드 개발",
        ],
        focusPoints: [
          "Rule 기반과 머신러닝 기반의 하이브리드 접근 방식 구현",
          "실시간 대응이 가능한 데이터 처리 및 시각화 구조 설계",
          "정상거래와 유사한 비정상 패턴 탐지에 집중",
        ],
      },
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
      id: 4,
      title: "테니스장 예약 플랫폼 '테니버스'",
      category: "웹/모바일 앱",
      image: "/images/portfolio/tennis2.png",
      description:
        "소규모 테니스 동호인을 위한 위치 기반 모바일 예약 플랫폼. 직관적인 UI/UX와 실시간 예약 기능 제공.",
      client: "스포츠 소모임 운영사",
      technology: ["Flutter", "Firebase", "Kakao Login", "예약 관리 API"],
      background: {
        problems: [
          "소규모 테니스 동호회는 공공/사설 테니스장 예약 시스템이 제각각이라 일정 조율과 예약 과정이 불편",
          "테니스장 가용 정보를 한눈에 보기 어려워, 중복된 시간대 예약 시도나 시간 낭비 발생",
          "단체 카톡방 또는 수기로 예약 현황을 관리하는 경우가 많아, 구성원 간 커뮤니케이션 누락 및 혼선 발생",
          "모바일 앱 기반 간편 서비스가 부족하여, 비IT 사용자들이 접근하기 어려움",
        ],
        goals: [
          "테니스장 예약을 손쉽게 할 수 있는 모바일 중심 예약 플랫폼 구축",
          "동호회 구성원이 함께 사용할 수 있는 공동 예약 및 알림 기능 제공",
          "소셜 로그인, 캘린더 기반 UI, 실시간 예약 현황 확인 등 사용자 친화적 기능 구현",
          "Flutter 기반 크로스플랫폼 앱으로 Android/iOS 동시 지원",
        ],
        keyPoints: [
          "UI/UX의 직관성 강화: 연령대가 다양한 사용자를 위한 쉽고 빠른 인터페이스",
          "예약 기능의 실시간성 확보: Firestore를 기반으로 한 실시간 데이터 반영",
          "알림 기능 및 일정 공유: 푸시 알림 및 카카오톡/네이버 기반 소셜 연동",
          "데이터의 일관성 유지: 예약 정보가 중복되거나 누락되지 않도록 백엔드와 프론트간 동기화 철저",
        ],
      },
      achievements: [
        "기존 수기 예약 방식 대비 일정 조율 시간 50% 감소 (1시간 → 30분)",
        "서울 및 수도권 테니스장 50여 곳 DB 연동 테스트 완료",
        "사용자 만족도 4.6점 / 5.0점 (피드백 설문 80건 기준)",
      ],
      keyFeatures: [
        "실시간 테니스장 예약: 원하는 날짜·시간대에 가용한 테니스장을 조회하고, 실시간으로 예약 가능 여부 확인 및 신청",
        "예약 충돌 방지: 이미 예약된 시간대는 자동 비활성화되어 중복 신청 방지, 실시간 Firestore 연동",
        "푸시 알림 및 예약 알림: 예약 완료, 변경, 취소 시 사용자에게 즉시 알림 전송",
        "마이 페이지 내 일정 관리: 동호회 일정을 시각화하여 한눈에 확인하고, 구성원 간 일정 조율 가능",
      ],
      timeline: [
        {
          phase: "기획 및 요구사항 정의",
          date: "2023.03",
          details: [
            "사용자 페르소나 설정",
            "동호회 운영 패턴 분석",
            "핵심 기능 정의 및 로드맵 수립",
          ],
        },
        {
          phase: "UI/UX 디자인",
          date: "2023.03",
          details: [
            "모바일 중심의 직관적인 인터페이스 설계",
            "캘린더 및 예약 흐름 와이어프레임 제작",
          ],
        },
        {
          phase: "프론트엔드/서버리스 백엔드 개발",
          date: "2023.04",
          details: [
            "Flutter 기반 모바일 UI 구현",
            "기본 네비게이션 구조 및 페이지 개발",
            "Firebase 기반 예약/유저 정보 저장 구조 구축",
            "실시간 동기화 로직 개발",
          ],
        },
        {
          phase: "기능 통합 및 테스트",
          date: "2023.04",
          details: [
            "전체 기능 통합 후 QA 테스트 진행",
            "예약 충돌 검증",
            "사용자 피드백 수렴 및 수정",
          ],
        },
        {
          phase: "MVP 런칭",
          date: "2023.06",
          details: [
            "Android/iOS 스토어 비공개 배포",
            "초기 사용자 대상 베타 테스트 및 개선사항 반영",
          ],
        },
      ],
      details: {
        introduction:
          "테니버스는 테니스를 즐기는 개인 또는 소규모 동호회 사용자를 위해, 간편한 로그인과 직관적인 UI로 근처 테니스장 예약을 손쉽게 할 수 있는 모바일 예약 서비스입니다.",
        target: "테니스 초보자 및 동호회 사용자, 100인 이하 소모임 사용자",
        developmentScope: {
          areas: [
            "모바일 앱 전체 UI/UX 및 예약 기능 개발",
            "소셜 로그인(Kakao, Naver 등) 연동",
            "예약 정보 저장 및 사용자 인증 백엔드 연동",
          ],
          environment: [
            "Framework: Flutter (Android, iOS 동시 지원)",
            "Backend: Firebase Authentication, Firestore",
            "API: 소셜 로그인 API, 예약 시간대 관리 모듈",
          ],
        },
        mainTasks: [
          "간편 회원가입 및 로그인: 카카오/네이버 기반 소셜 로그인 및 사용자 정보 저장",
          "테니스장 리스트 및 예약 페이지 구성: 위치 기반 테니스장 리스트 노출",
          "원하는 시간 선택 후 즉시 예약 가능",
          "예약 내역 및 알림 기능: 사용자별 예약 내역 확인",
          "예약 시간 임박 시 푸시 알림 제공",
        ],
        focusPoints: [
          "간단하고 직관적인 사용자 경험(UX): 스포츠에 익숙하지 않은 사용자도 손쉽게 접근할 수 있도록 예약 프로세스를 최소화",
          "소셜 로그인 연동의 매끄러운 경험 제공: 다양한 로그인 옵션 제공으로 진입 장벽 완화",
          "실제 예약 서비스와 연계 가능한 구조 설계: 예약 시간대, 이용 가능 여부 등을 실시간으로 관리할 수 있는 확장성 고려한 구조",
        ],
      },
    },
    {
      id: 5,
      title: "책 감성 분석 대시보드",
      category: "AI 솔루션",
      image: "/images/portfolio/book/book.png",
      description:
        "책 문장 단위 감성 분류 모델과 대시보드를 통해 작품 감정 흐름을 시각화하고 인사이트 제공.",
      client: "콘텐츠 기획 및 출판 기업",
      technology: ["PyTorch", "Transformers", "React", "Chart.js"],
      challenge: "긴 문단의 감정을 문장 단위로 정확히 분해 및 시각화하는 문제",
      solution: "sLLM 기반 감정 분류기 개발 및 페이지 단위 감정 흐름 분석 구현",
      result: "콘텐츠 감정 곡선 분석 활용으로 기획 회의 활용도 3배 증가",
      background: {
        problems: [
          "책 전체의 감정 흐름을 체계적으로 분석할 수단 부재",
          "긴 문단 내 복합 감정이 혼재되어 있어 단일 점수로 분석하기 어려움",
          "감정 기반 추천 및 큐레이션 인사이트 부족",
        ],
        goals: [
          "문장 단위 감정 분석 자동화 파이프라인 구축",
          "시각적 감정 곡선 및 키워드 클라우드 구현",
          "사용자 업로드 기반 실시간 분석 제공",
        ],
        keyPoints: [
          "경량 모델(distilBERT)과 대형 모델(Gemma) 성능 비교 분석",
          "감정 흐름 기반 인사이트 제공 (페이지별 감정 변화)",
          "웹 기반 시각화 인터페이스로 사용자 접근성 확보",
        ],
      },
      achievements: [
        "감정 추정 정확도 향상 (Gemma 기준 기존 대비 +8%)",
        "시각적 감정 곡선 시연 후 기획자 활용도 3배 증가",
        "프로토타입 공개 이후 GitHub 300+ 다운로드 달성",
      ],
      keyFeatures: [
        "문단 → 문장 분해 및 감정 자동 라벨링",
        "Gemma / DistilBERT 기반 감정 분류 비교",
        "작품 전체 감정 곡선 및 흐름 시각화",
        "감정 키워드 클라우드 및 통계 제공",
        "책 업로드 후 실시간 분석 및 결과 확인",
      ],
      timeline: [
        {
          phase: "기획 및 데이터 수집",
          date: "2024.01",
          details: ["문장 감정 분석 니즈 조사 및 모델 후보 선정"],
        },
        {
          phase: "모델 개발 및 파인튜닝",
          date: "2024.02",
          details: [
            "Gemma-2B-IT 및 DistilBERT 기반 감정 분석 모델 개발",
            "Huggingface 기반 fine-tuning 및 라벨링 자동화",
          ],
        },
        {
          phase: "대시보드 및 시각화 구현",
          date: "2024.03",
          details: [
            "React 기반 감정 흐름 차트, 키워드 클라우드 구현",
            "Chart.js 및 Plotly 연동",
          ],
        },
        {
          phase: "테스트 및 배포",
          date: "2024.04",
          details: [
            "GitHub Pages 배포",
            "출판사 및 콘텐츠 기획자 대상 시연 및 피드백 반영",
          ],
        },
      ],
      details: {
        introduction:
          "책 감성 분석 대시보드는 문장을 문단 단위로 분해한 뒤, 대형 언어 모델(Gemma)을 활용해 감정을 자동 분류하고 이를 시각적으로 분석할 수 있는 도구입니다.",
        developmentScope: {
          areas: [
            "sLLM 기반 감정 분류 모델 설계 및 성능 비교",
            "책 문장 전처리 및 감정 자동 라벨링 파이프라인 구현",
            "Frontend 대시보드 개발 및 감정 시각화 인터페이스 설계",
          ],
          environment: [
            "Model: Gemma-2B-IT, DistilBERT",
            "Framework: PyTorch, Huggingface Transformers",
            "Frontend: React + Chart.js",
            "Deployment: GitHub Pages",
          ],
        },
      },
    },

    {
      id: 2,
      title: "LOCAT: 위치 기반 로컬 플랫폼",
      category: "웹/모바일 앱",
      image: "/images/portfolio/locat2.png",
      description: "영상 제작자와 장소 제공자를 연결하는 촬영 장소 매칭 플랫폼",
      client: "지역 상권 기반 플랫폼 기업",
      technology: [
        "Flutter",
        "Firebase",
        "Kakao Login",
        "Naver Maps API",
        "Supabase",
      ],
      background: {
        problems: [
          "로케이션 장소 정보가 SNS/카페/개인 연락망 등 여러 채널에 분산되어 있어 확인이 불편함",
          "장소 정보(면적, 소음, 주차 등)가 표준화되지 않아 정확한 비교·선택이 어려움",
          "촬영 가능 여부, 예약 일정, 주차 가능 여부 등 현장 확인 필수",
          "제작사/감독/PD 간 장소 공유 및 피드백 체계 부재",
        ],
        goals: [
          "촬영 장소 통합 관리 플랫폼 구축",
          "촬영 조건 기반 검색 기능",
          "리얼 후기 및 의견 공유 기능",
          "지도 기반 탐색",
        ],
        keyPoints: [
          "촬영 적합성 중심 정보 설계",
          "사용자 피드백 중심 인터페이스",
          "모바일 기반의 빠른 예약 의사결정 유도",
          "위치 기반 확장 가능성 확보",
        ],
      },
      achievements: [
        "로케이션 탐색 시간 60% 단축",
        "장소 등록 수 300건 이상 확보",
        "작품 기반 장소 검색 기능 도입",
      ],
      keyFeatures: [
        "촬영 장소 조건 기반 검색",
        "지도 기반 로케이션 탐색",
        "장소 상세 정보 표준화 제공",
        "사용자 후기 및 피드백 작성",
        "장소 찜 및 비교 기능",
      ],
      timeline: [
        {
          phase: "시장조사 및 사용자 인터뷰",
          date: "2024.02",
          details: ["방송국 PD, 유튜브 촬영팀, 스튜디오 운영자 등 12명 인터뷰"],
        },
        {
          phase: "UX 기획 및 화면 설계",
          date: "2024.02",
          details: [
            "장소 정보 구조 표준화",
            "사용자 시나리오 기반 화면 흐름 설계",
          ],
        },
        {
          phase: "기술 개발",
          date: "2024.03",
          details: [
            "Flutter 기반 하이브리드 앱 개발",
            "Google Maps API 연동",
            "Firebase + Supabase 구축",
          ],
        },
        {
          phase: "베타 테스트",
          date: "2024.04",
          details: ["영상 촬영팀 5개 팀 대상 2주간 사전 사용"],
        },
      ],
      details: {
        introduction:
          "LOCAT은 영상 제작자와 장소 제공자를 연결하는 촬영 장소 매칭 플랫폼입니다.",
        developmentScope: {
          areas: [
            "전체 모바일 앱 UI/UX 설계 및 개발",
            "카카오, 네이버, 구글 소셜 로그인 연동",
            "Naver Maps API를 활용한 지도 기반 기능 구현",
            "Firebase 기반 사용자 인증, 데이터 저장, 실시간 동기화",
          ],
          environment: [
            "Framework: Flutter (Android & iOS 동시 지원)",
            "API/SDK: Kakao, Naver, Google Login API / Naver Maps API",
            "Backend: Firebase Authentication, Firestore",
          ],
        },
      },
    },
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
          content="Wavico의 주요 프로젝트: 이상거래탐지 시스템, 책 감성 분석 대시보드, 테니스장 예약 플랫폼 등 다양한 AI 솔루션과 웹/앱 개발 포트폴리오를 소개합니다."
        />
        <meta
          name="keywords"
          content="포트폴리오,AI프로젝트,웹개발,앱개발,이상거래탐지,감성분석,테니스장예약,AI솔루션"
        />
        <meta
          property="og:title"
          content="포트폴리오 | Wavico - AI·웹·앱 개발 전문 기업"
        />
        <meta
          property="og:description"
          content="Wavico의 주요 프로젝트: 이상거래탐지 시스템, 책 감성 분석 대시보드, 테니스장 예약 플랫폼 등 다양한 AI 솔루션과 웹/앱 개발 포트폴리오를 소개합니다."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wavico.co.kr/portfolio" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="canonical" href="https://wavico.co.kr/portfolio" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="Korean" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Wavico" />
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
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedItem(null);
            }
          }}
        >
          <div
            className={`bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden animate-scale-in ${styles["modal-content"]}`}
          >
            <div className="relative w-full">
              {selectedItem.id === 2 || selectedItem.id === 4 ? (
                <CenteredCarousel
                  images={
                    selectedItem.id === 2 ? locatImages : tenniverseImages
                  }
                />
              ) : (
                <div className="relative aspect-video overflow-hidden">
                  <OptimizedImage
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                    priority={true}
                  />
                  {selectedItem.id === 5 && (
                    <a
                      href="https://paper-prism.github.io/paper-prism/#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-wavico-blue hover:bg-wavico-darkblue text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg flex items-center"
                    >
                      데모 체험하기
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  )}
                  {selectedItem.id === 1 && (
                    <a
                      href="https://www.wavico.kr/voice-monitor/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-wavico-blue hover:bg-wavico-darkblue text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg flex items-center"
                    >
                      데모 체험하기
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  )}
                </div>
              )}
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

              {selectedItem.details?.introduction && (
                <p className="text-gray-600 text-lg mb-8">
                  {selectedItem.details.introduction}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {selectedItem.client && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">고객사</h3>
                    <p className="text-gray-600">{selectedItem.client}</p>
                  </div>
                )}

                {selectedItem.details?.target && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">타겟</h3>
                    <p className="text-gray-600">
                      {selectedItem.details.target}
                    </p>
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

              {selectedItem.background && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">프로젝트 배경</h3>

                  {selectedItem.background.problems && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold mb-2">문제점</h4>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        {selectedItem.background.problems.map(
                          (problem, idx) => (
                            <li key={idx}>{problem}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {selectedItem.background.goals && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold mb-2">
                        프로젝트 목표
                      </h4>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        {selectedItem.background.goals.map((goal, idx) => (
                          <li key={idx}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedItem.background.keyPoints && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold mb-2">주안점</h4>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        {selectedItem.background.keyPoints.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {selectedItem.achievements && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">프로젝트 성과</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {selectedItem.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.keyFeatures && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">핵심 기능</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {selectedItem.keyFeatures.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.timeline && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">진행 단계</h3>
                  <div className="space-y-4">
                    {selectedItem.timeline.map((phase, idx) => (
                      <div
                        key={idx}
                        className="border-l-2 border-wavico-blue pl-4"
                      >
                        <h4 className="text-lg font-semibold">{phase.phase}</h4>
                        <p className="text-sm text-gray-500 mb-2">
                          {phase.date}
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          {phase.details.map((detail, detailIdx) => (
                            <li key={detailIdx}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedItem.details?.developmentScope && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">작업 범위</h3>

                  {selectedItem.details.developmentScope.areas && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold mb-2">
                        개발 참여 영역
                      </h4>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        {selectedItem.details.developmentScope.areas.map(
                          (area, idx) => (
                            <li key={idx}>{area}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {selectedItem.details.developmentScope.environment && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2">지원 환경</h4>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        {selectedItem.details.developmentScope.environment.map(
                          (env, idx) => (
                            <li key={idx}>{env}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {selectedItem.details?.mainTasks && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">주요 업무</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {selectedItem.details.mainTasks.map((task, idx) => (
                      <li key={idx}>{task}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.details?.focusPoints && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">주안점</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {selectedItem.details.focusPoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

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
