import { useEffect, useRef, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState({});
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

    return () => observer.disconnect();
  }, []);

  const addRef = (id: string) => (el: HTMLDivElement) => {
    observerRefs.current[id] = el;
  };

  const history = [
    {
      year: 2025,
      title: "글로벌 AI 솔루션 기업으로 도약",
      description: "해외 지사 설립 및 글로벌 서비스 확장",
      achievements: [
        "미국 실리콘밸리 지사 설립",
        "AI 음성 인식 기술 글로벌 특허 획득",
        "연간 매출 1000억 달성",
      ],
    },
    {
      year: 2024,
      title: "AI 기술 혁신 가속화",
      description: "차세대 AI 기술 개발 및 서비스 고도화",
      achievements: [
        "자체 개발 LLM 모델 출시",
        "AI 이미지 생성 서비스 베타 런칭",
        "기업가치 5000억 달성",
      ],
    },
    {
      year: 2023,
      title: "서비스 다각화 및 성장",
      description: "AI 서비스 영역 확장 및 사업 성장",
      achievements: [
        "AI 음성합성 서비스 출시",
        "대기업 10개사 솔루션 공급",
        "Series B 투자 유치",
      ],
    },
    {
      year: 2022,
      title: "기술력 인정 및 도약",
      description: "핵심 기술 개발 및 시장 진입",
      achievements: [
        "AI 챗봇 서비스 정식 출시",
        "정부 혁신 기업 선정",
        "Series A 투자 유치",
      ],
    },
    {
      year: 2021,
      title: "회사 설립",
      description: "Wavico 설립 및 초기 서비스 개발",
      achievements: ["법인 설립", "AI 연구소 설립", "시드 투자 유치"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 연혁 섹션 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">회사 연혁</h2>
            <p className="text-xl text-gray-600">
              혁신적인 AI 기술로 미래를 만들어가는 Wavico의 여정입니다.
            </p>
          </div>

          <div className="relative">
            {/* 중앙 타임라인 선 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-purple-200" />

            {/* 연혁 아이템들 */}
            {history.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={item.year}
                  id={`history-${item.year}`}
                  ref={addRef(`history-${item.year}`)}
                  className={`relative flex items-center mb-24 ${
                    isLeft ? "justify-start" : "justify-end"
                  } ${
                    isVisible[`history-${item.year}`]
                      ? "opacity-100 translate-x-0"
                      : `opacity-0 ${
                          isLeft ? "-translate-x-full" : "translate-x-full"
                        }`
                  } transition-all duration-1000 ease-out`}
                >
                  {/* 연도 마커 */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-purple-600 rounded-full border-4 border-white z-10" />

                  {/* 컨텐츠 박스 */}
                  <div className={`w-5/12 ${isLeft ? "pr-12" : "pl-12"}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="flex items-center mb-4">
                        <span className="text-3xl font-bold text-purple-600">
                          {item.year}
                        </span>
                        <h3 className="text-xl font-semibold ml-4">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <ul className="space-y-2">
                        {item.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-center text-gray-700"
                          >
                            <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
