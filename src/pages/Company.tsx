
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Award, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Company = () => {
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

  const history = [
    {
      year: "2023",
      events: [
        "Wavico 회사 설립",
        "첫 AI 번역 시스템 개발 완료",
        "시리즈 A 투자 유치 (50억원)",
      ],
    },
    {
      year: "2024",
      events: [
        "글로벌 기업과 AI 파트너십 체결",
        "AI 기반 이미지 인식 시스템 출시",
        "R&D 센터 설립",
      ],
    },
    {
      year: "2025",
      events: [
        "음성인식 AI 서비스 출시",
        "글로벌 시장 진출",
        "국내 AI 기술 대상 수상",
      ],
    },
  ];

  const team = [
    {
      name: "김민수",
      role: "CEO / 창업자",
      description:
        "AI 분야 10년 경력의 전문가로, 글로벌 기업에서의 경험을 바탕으로 Wavico를 설립했습니다.",
    },
    {
      name: "박지영",
      role: "CTO",
      description:
        "백엔드 및 AI 아키텍처 전문가로, 대규모 AI 시스템 설계 및 개발을 담당하고 있습니다.",
    },
    {
      name: "이준호",
      role: "디자인 책임자",
      description:
        "사용자 경험과 인터페이스 디자인 전문가로, Wavico의 모든 제품 디자인을 주도합니다.",
    },
    {
      name: "정다영",
      role: "마케팅 책임자",
      description:
        "디지털 마케팅 전략 전문가로, Wavico의 브랜드 가치를 높이는 데 기여하고 있습니다.",
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="pt-40 pb-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Wavico를 소개합니다
          </h1>
          <p className="text-xl max-w-2xl">
            음성·이미지·언어를 아우르는 인공지능 기술을 바탕으로, 기획부터 배포까지 한 번에 해결하는 End-to-End AI 서비스를 제공합니다.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section
        id="vision-mission"
        ref={addRef("vision-mission")}
        className={`py-24 transition-opacity duration-1000 ${
          isVisible["vision-mission"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              비전 및 미션
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wavico는 인공지능 기술로 더 나은 세상을 만들고자 합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-wavico-lightblue p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-wavico-blue mb-4">비전</h3>
              <p className="text-gray-800 text-lg">
                "인공지능 기술의 혁신으로 모든 산업에 새로운 가치를 창출하는 미래를 열어갑니다."
              </p>
            </div>

            <div className="bg-wavico-lightblue p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-wavico-blue mb-4">미션</h3>
              <p className="text-gray-800 text-lg">
                "최첨단 AI 기술을 누구나 쉽게 활용할 수 있도록 하여, 기업과 개인의 역량을 극대화합니다."
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="mx-auto w-16 h-16 bg-wavico-lightblue rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-wavico-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">품질</h3>
              <p className="text-gray-600">
                최고 품질의 서비스와 기술력으로 고객 만족을 최우선으로 합니다.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="mx-auto w-16 h-16 bg-wavico-lightblue rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-wavico-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">협력</h3>
              <p className="text-gray-600">
                고객과의 긴밀한 협력을 통해 최적의 솔루션을 제공합니다.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="mx-auto w-16 h-16 bg-wavico-lightblue rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-wavico-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">혁신</h3>
              <p className="text-gray-600">
                끊임없는 연구와 혁신으로 AI 기술의 미래를 선도합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section
        id="history"
        ref={addRef("history")}
        className={`py-24 bg-gray-50 transition-opacity duration-1000 ${
          isVisible["history"] ? "opacity-100" : "opacity-0"
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
                  isVisible["history"]
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

      {/* Team */}
      <section
        id="team"
        ref={addRef("team")}
        className={`py-24 transition-opacity duration-1000 ${
          isVisible["team"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              조직/팀 소개
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wavico를 이끌어가는 전문가들을 소개합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className={`bg-white p-6 rounded-lg shadow-md ${
                  isVisible["team"]
                    ? "animate-scale-in"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-24 h-24 bg-wavico-lightblue rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-wavico-blue text-3xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-center mb-1">
                  {member.name}
                </h3>
                <p className="text-wavico-blue text-center mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 text-center">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section
        id="location"
        ref={addRef("location")}
        className={`py-24 bg-gray-50 transition-opacity duration-1000 ${
          isVisible["location"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              회사 위치
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wavico를 방문하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-gray-300 h-80 rounded-lg mb-6 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-gray-500" />
                <p className="ml-2 text-gray-600">지도가 여기에 표시됩니다</p>
              </div>
            </div>

            <div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6">
                  연락처 및 오시는 길
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">주소</h4>
                    <p className="text-gray-600">
                      서울특별시 강남구 테헤란로 123, 웨이비코 빌딩 10층
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">연락처</h4>
                    <p className="text-gray-600">전화: 02-123-4567</p>
                    <p className="text-gray-600">이메일: contact@wavico.ai</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">영업시간</h4>
                    <p className="text-gray-600">평일: 09:00 - 18:00</p>
                    <p className="text-gray-600">토/일/공휴일: 휴무</p>
                  </div>

                  <div className="pt-4">
                    <Button
                      size="lg"
                      asChild
                      className="bg-wavico-blue hover:bg-wavico-darkblue w-full"
                    >
                      <Link to="/contact">문의하기</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;
