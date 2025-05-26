import React from "react";

interface CompanyHistoryProps {
  isVisible: boolean;
  addRef: (id: string) => (el: HTMLDivElement) => void;
}

const CompanyHistory = ({ isVisible, addRef }: CompanyHistoryProps) => {
  const history = [
    {
      year: 2025,
      title: "Wavico 법인 설립의 해",
      description: "AI 기술 기반의 새로운 도약",
      achievements: [
        "Wavico 법인 사업자 설립 예정",
        "이상거래탐지 모니터링 시스템 고도화",
        "Wavico AI 팀 구성",
        "PODLY AI 기반 개인화 음성 뉴스 서비스 및 챗봇 개발",
      ],
    },
    {
      year: 2024,
      title: "AI 솔루션 확장의 해",
      description: "다양한 산업 분야로의 AI 솔루션 확장",
      achievements: [
        "Outlook 메일 LLM 챗봇 개발",
        "NAWA 종이컵 AI 쓰레기통 웹 사이트 개발",
        "LOCAT 영화 제작 협업용 모바일 APP 개발",
        "TJtexcode 쇼핑몰 웹 사이트 제작",
        "테니스 동호회 모바일 APP 개발",
      ],
    },
  ];

  return (
    <section
      id="history"
      ref={addRef("history")}
      className={`py-24 bg-gray-50 transition-opacity duration-1000 overflow-x-hidden ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">연혁</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wavico의 성장 여정을 살펴보세요.
          </p>
        </div>

        <div className="relative">
          {/* 중앙 타임라인 선 */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 transform md:-translate-x-1/2 w-0.5 h-full bg-purple-200" />

          {/* 연혁 아이템들 */}
          {history.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={item.year}
                id={`history-${item.year}`}
                ref={addRef(`history-${item.year}`)}
                className={`relative flex items-center mb-12 md:mb-24 ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                } ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : `opacity-0 ${
                        isLeft ? "-translate-x-12" : "translate-x-12"
                      }`
                } transition-all duration-1000 ease-out min-h-[12rem]`}
              >
                {/* 연도 마커 */}
                <div className="absolute left-4 top-1/2 md:left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-purple-600 rounded-full border-4 border-white z-10" />

                {/* 컨텐츠 박스 */}
                <div
                  className={`w-[calc(100%-3rem)] md:w-[45%] ml-16 md:ml-0 ${
                    isLeft ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg relative">
                    {/* 연결선 - 모바일에서는 숨김 */}

                    <div
                      className={`hidden md:block absolute top-1/2 ${
                        isLeft
                          ? "right-0 translate-x-full"
                          : "left-0 -translate-x-full"
                      } w-8 h-[2px] bg-purple-200 -translate-y-1/2`}
                    />
                    <div className="flex flex-col md:flex-row md:items-center mb-4">
                      <span className="text-2xl md:text-3xl font-bold text-purple-600">
                        {item.year}
                      </span>
                      <h3 className="text-lg md:text-xl font-semibold mt-2 md:mt-0 md:ml-4">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm md:text-base">
                      {item.description}
                    </p>
                    <ul className="space-y-2">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-center text-gray-700">
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
  );
};

export default CompanyHistory;
