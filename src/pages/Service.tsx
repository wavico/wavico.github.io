import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Code,
  Image,
  BarChart2,
  Smartphone,
  Server,
  MessageSquare,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Service = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [activeService, setActiveService] = useState<number>(0);
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

    // Auto-rotate featured service
    // const interval = setInterval(() => {
    //   setActiveService((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    // }, 5000);

    // return () => {
    //   observer.disconnect();
    //   clearInterval(interval);
    // };
  }, []);

  const addRef = (id: string) => (el: HTMLDivElement) => {
    observerRefs.current[id] = el;
  };

  return (
    <div>
      <Helmet>
        <title>서비스 소개 | Wavico - AI·웹·앱 개발 전문 기업</title>
        <meta
          name="description"
          content="Wavico는 린 개발 철학을 바탕으로, 최소 기능 제품(MVP)을 빠르게 구현하고, 투명한 프로세스와 합리적인 비용으로 실용적인 AI·웹·앱 솔루션을 제공합니다."
        />
        <meta
          name="keywords"
          content="웹개발,앱개발,AI솔루션,시각화대시보드,시스템통합,모바일앱,AI챗봇,MVP,린개발"
        />
        <meta
          property="og:title"
          content="서비스 소개 | Wavico - AI·웹·앱 개발 전문 기업"
        />
        <meta
          property="og:description"
          content="Wavico는 린 개발 철학을 바탕으로, 최소 기능 제품(MVP)을 빠르게 구현하고, 투명한 프로세스와 합리적인 비용으로 실용적인 AI·웹·앱 솔루션을 제공합니다."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wavico.co.kr/service" />
        <meta property="og:image" content="https://wavico.co.kr/og-image.jpg" />
        <link rel="canonical" href="https://wavico.co.kr/service" />
      </Helmet>

      {/* Page Header */}
      <section className="pt-40 pb-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            어떻게 제공하나요?
          </h1>
          <p className="text-xl max-w-2xl">
            Wavico는 린 개발 철학을 바탕으로, 최소 기능 제품(MVP)을 빠르게
            구현하고, 투명한 프로세스와 합리적인 비용으로 실용적인 AI·웹·앱
            솔루션을 제공합니다.
          </p>
        </div>
      </section>

      {/* Process */}
      <section
        id="process"
        ref={addRef("process")}
        className={`py-24 transition-opacity duration-1000 ${
          isVisible["process"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              프로젝트 진행 과정
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wavico는 작고 체계적인 단위로 프로젝트를 빠르게 진행합니다.
            </p>
          </div>

          {/* 개발 방식 비교 표 */}
          <div className="mb-16 overflow-x-auto">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-4 px-6 text-left bg-gray-400 text-white rounded-tl-lg">
                      전통 개발 (Waterfall)
                    </th>
                    <th className="py-4 px-6 text-left bg-wavico-blue text-white rounded-tr-lg">
                      린 개발 (Lean)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-6 text-gray-600">
                      분석 → 설계 → 개발 → 테스트
                    </td>
                    <td className="py-4 px-6 text-wavico-blue font-medium">
                      MVP → 피드백 → 개선 → 반복
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-4 px-6 text-gray-600">
                      한 번에 크게 만들고 출시
                    </td>
                    <td className="py-4 px-6 text-wavico-blue font-medium">
                      작게 만들고 빠르게 개선
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-600">
                      실패 시 리스크 큼
                    </td>
                    <td className="py-4 px-6 text-wavico-blue font-medium">
                      실패를 학습 기회로 활용
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-4 px-6 text-gray-600">
                      고객 피드백 반영 어려움
                    </td>
                    <td className="py-4 px-6 text-wavico-blue font-medium">
                      피드백이 핵심
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              프로젝트 진행 프로세스
            </h2>
            {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wavico는 작고 체계적인 단위로 프로젝트를 빠르게 진행합니다. */}
            {/* </p> */}
          </div>
          <div className="relative">
            <Card className="p-8 shadow-lg">
              {/* <CardHeader>
                <CardTitle className="text-2xl font-bold text-center mb-8">
                  프로젝트 진행 프로세스
                </CardTitle>
              </CardHeader> */}
              <CardContent>
                {/* Process timeline */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-wavico-blue"></div>

                {[
                  {
                    title: "문제 정의와 목표 설정",
                    description:
                      "고객의 비즈니스 맥락과 핵심 문제를 함께 정의하고, 명확한 목표를 설정합니다.",
                  },
                  {
                    title: "최소 기능 제품(MVP) 기획",
                    description:
                      "빠른 검증을 위한 최소 기능 제품을 설계하고, 사용자 중심의 경험을 기획합니다.",
                  },
                  {
                    title: "투명한 개발 및 반복 구현",
                    description:
                      "개발 전 과정을 투명하게 공유하며, 최신 기술을 바탕으로 빠르게 구현합니다.",
                  },
                  {
                    title: "사용자 피드백 기반 검증",
                    description:
                      "실제 사용자 피드백을 반영하여 테스트하고, 필요한 개선을 즉시 적용합니다.",
                  },
                  {
                    title: "안정적 배포 및 성장 지원",
                    description:
                      "완성된 솔루션을 안정적으로 배포하고, 이후 기능 확장과 운영을 함께 고민합니다.",
                  },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className={`relative md:flex items-center mb-8 ${
                      idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } ${
                      isVisible["process"] ? "animate-fade-in" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${idx * 200}ms` }}
                  >
                    <div
                      className={`md:w-5/12 ${
                        idx % 2 === 0
                          ? "md:text-right md:pr-8"
                          : "md:text-left md:pl-8"
                      }`}
                    >
                      <h3 className="text-2xl font-bold mb-2">
                        {idx + 1}. {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>

                    {/* Timeline node */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                      <div className="w-10 h-10 bg-wavico-blue rounded-full text-white flex items-center justify-center font-bold z-10">
                        {idx + 1}
                      </div>
                    </div>

                    <div className="md:w-5/12"></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="mt-8"></div>
          <div className="relative">
            {/* Process timeline */}
            <div className="opacity-30 hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-500"></div>

            {[
              {
                title: "문제 정의와 목표 설정",
                description:
                  "고객의 비즈니스 맥락과 핵심 문제를 함께 정의하고, 명확한 목표를 설정합니다.",
              },
              {
                title: "최소 기능 제품(MVP) 기획",
                description:
                  "빠른 검증을 위한 최소 기능 제품을 설계하고, 사용자 중심의 경험을 기획합니다.",
              },
              {
                title: "투명한 개발 및 반복 구현",
                description:
                  "개발 전 과정을 투명하게 공유하며, 최신 기술을 바탕으로 빠르게 구현합니다.",
              },
              // {
              //   title: "사용자 피드백 기반 검증",
              //   description:
              //     "실제 사용자 피드백을 반영하여 테스트하고, 필요한 개선을 즉시 적용합니다.",
              // },
              // {
              //   title: "안정적 배포 및 성장 지원",
              //   description:
              //     "완성된 솔루션을 안정적으로 배포하고, 이후 기능 확장과 운영을 함께 고민합니다.",
              // },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`relative md:flex items-center mb-8 ${
                  idx % 2 === 1 ? "md:flex-row" : "md:flex-row-reverse"
                } ${isVisible["process"] ? "animate-fade-in" : "opacity-0"}`}
                style={{ animationDelay: `${idx * 200}ms` }}
              >
                <div
                  className={`md:w-5/12 ${
                    idx % 2 === 1
                      ? "md:text-right md:pr-8"
                      : "md:text-left md:pl-8"
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-2 opacity-30">
                    {idx + 1}. {step.title}
                  </h3>
                  <p className="text-gray-600 opacity-30">{step.description}</p>
                </div>

                {/* Timeline node */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div className="w-10 h-10 bg-green-500 opacity-50 rounded-full text-white flex items-center justify-center font-bold z-10">
                    {idx + 1}
                  </div>
                </div>

                <div className="md:w-5/12 "></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="cta"
        ref={addRef("cta")}
        className={`py-24 bg-wavico-blue text-white transition-opacity duration-1000 ${
          isVisible["cta"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            프로젝트를 시작해볼까요?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Wavico와 함께 혁신적인 솔루션으로 비즈니스를 성장시키세요. 전문가의
            상담을 통해 최적의 서비스를 제안받을 수 있습니다.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-white text-wavico-blue hover:bg-gray-100 hover:text-wavico-darkblue text-lg"
          >
            <Link to="/contact">
              무료 상담 신청 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Service;
