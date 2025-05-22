
import React from "react";

interface CompanyHistoryProps {
  isVisible: boolean;
  addRef: (id: string) => (el: HTMLDivElement) => void;
}

const CompanyHistory = ({ isVisible, addRef }: CompanyHistoryProps) => {
  const history = [
    {
      year: "2023",
      events: [
        "07 TJtexcode 쇼핑몰 웹 사이트 제작",
        "03 테니스 동호회 모바일 APP 개발"
      ],
    },
    {
      year: "2024",
      events: [
        "12 Outlook 메일 LLM 챗봇 개발 ",
        "06 NAWA 종이컵 AI 쓰레기통 웹 사이트 개발",
        "02 LOCAT 영화 제작 협업용 모바일 APP 개발",
      ],
    },
    {
      year: "2025",
      events: [
        "06 Wavico 법인 사업자 설립 예정",
        "03 이상거래탐지 모니터링 시스템 고도화",
        "02 Wavico AI 팀 구성",
        "01 PODLY AI 기반 개인화 음성 뉴스 서비스 및 챗봇 개발"
      ],
    },
  ];

  return (
    <section
      id="history"
      ref={addRef("history")}
      className={`py-24 bg-gray-50 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            연혁
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wavico의 성장 여정을 살펴보세요.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-wavico-blue"></div>

          {history.map((period, idx) => (
            <div
              key={period.year}
              className={`relative mb-16 ${
                isVisible
                  ? "animate-fade-in"
                  : "opacity-0"
              }`}
              style={{ animationDelay: `${idx * 200}ms` }}
            >
              <div className="text-center mb-8">
                <span className="inline-block bg-wavico-blue text-white text-2xl font-bold py-2 px-6 rounded-lg">
                  {period.year}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {period.events.map((event, eventIdx) => (
                  <div
                    key={eventIdx}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <p className="text-lg">{event}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;
