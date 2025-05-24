import React from "react";
import { Image } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TeamSectionProps {
  isVisible: boolean;
  addRef: (id: string) => (el: HTMLDivElement) => void;
}

const TeamSection = ({ isVisible, addRef }: TeamSectionProps) => {
  const team = [
    {
      name: "김선민",
      role: "PM/FrontEngineer",
      description:
        "6년간의 AI 프로젝트와 컨설팅 경험, 그리고 다수의 대외 수상 실적을 보유한 실전형 데이터 전문가",
      image: "/images/team/sunmin.png",
    },
    {
      name: "조용성",
      role: "Data Scientist",
      description:
        "AI·빅데이터 센터 연구원 출신으로, 수요예측부터 감성분석까지 다양한 분석 프로젝트와 데이터 마트 설계 경험을 보유한 데이터사이언스 전문가",
      image: "/images/team/yongsung.png",
    },
    {
      name: "김서령",
      role: "Data Engineer",
      description:
        "AI 모델 개발, 데이터 분석 모듈 설계, 시각화 대시보드 구축, 대기업 클라우드 인프라 구축 경험을 갖춘 데이터 엔지니어",
      image: "/images/team/seoryung.jpg",
    },
  ];

  return (
    <section
      id="team"
      ref={addRef("team")}
      className={`py-24 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">조직/팀 소개</h2>
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
                  isVisible ? "animate-scale-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name} profile`}
                    className="w-full h-full object-cover filter grayscale"
                  />
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
  );
};

export default TeamSection;
