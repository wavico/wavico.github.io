import React from "react";
import { Check } from "lucide-react";

const ServiceDetail = () => {
  const serviceDetails = [
    {
      category: "앱 개발 서비스",
      items: [
        "Flutter 기반의 크로스 플랫폼 앱 개발",
        "회원 관리 시스템 (회원가입, 로그인, 마이페이지)",
        "결제 시스템 연동 (Stripe, PayPal)",
        "실시간 채팅 및 음성 통화 기능",
        "푸시 알림 시스템",
        "관리자 웹 대시보드",
      ],
    },
    {
      category: "AI 솔루션",
      items: [
        "AI 기반 자동 리포트 생성 시스템",
        "챗봇 엔진 개발 및 구현",
        "이미지 생성 AI 시스템",
        "자연어 처리 기반 상담 시스템",
      ],
    },
    {
      category: "디자인 & 퍼블리싱",
      items: [
        "모바일 앱 UI/UX 디자인",
        "반응형 웹 디자인",
        "디자인 시스템 구축",
        "앱스토어 등록 지원",
      ],
    },
    {
      category: "AI 파이프라인 운영",
      items: [
        "실시간 채팅/음성 통화 시스템 구축",
        "결제 시스템 연동",
        "외부 API 연동",
        "클라우드 인프라 구축",
      ],
    },
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceDetails.map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-4 text-wavico-blue">
                {service.category}
              </h3>
              <ul className="space-y-3">
                {service.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">프로젝트 진행 방식</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold mb-2">1. 기획 및 설계</h4>
              <p className="text-gray-600 text-sm">
                요구사항 분석, 기술 스택 선정, UI/UX 설계, 프로젝트 일정 수립
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold mb-2">2. 개발 및 테스트</h4>
              <p className="text-gray-600 text-sm">
                단계별 개발 진행, QA 테스트, 피드백 반영, 성능 최적화
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold mb-2">3. 배포 및 유지보수</h4>
              <p className="text-gray-600 text-sm">
                앱스토어 배포 지원, 안정화, 지속적인 업데이트 및 유지보수
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
