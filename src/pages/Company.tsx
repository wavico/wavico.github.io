
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

  const team = [
    {
      name: "김선민",
      role: "PM/FrontEngineer",
      description:
        "6년간의 AI 프로젝트와 컨설팅 경험, 그리고 다수의 대외 수상 실적을 보유한 실전형 데이터 전문가",
    },
    {
      name: "조용성",
      role: "Data Scientist",
      description:
        "AI·빅데이터 센터 연구원 출신으로, 수요예측부터 감성분석까지 다양한 분석 프로젝트와 데이터 마트 설계 경험을 보유한 데이터사이언스 전문가",
    },
    {
      name: "김서령",
      role: "Data Engineer",
      description:
        "AI 모델 개발, 데이터 분석 모듈 설계, 시각화 대시보드 구축, 대기업 클라우드 인프라 구축 경험을 갖춘 데이터 엔지니어",
    }
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

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
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
