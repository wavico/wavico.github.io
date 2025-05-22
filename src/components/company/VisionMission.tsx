
import React from "react";
import { Award, Users, Clock } from "lucide-react";

interface VisionMissionProps {
  isVisible: boolean;
  addRef: (id: string) => (el: HTMLDivElement) => void;
}

const VisionMission = ({ isVisible, addRef }: VisionMissionProps) => {
  return (
    <section
      id="vision-mission"
      ref={addRef("vision-mission")}
      className={`py-24 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
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
  );
};

export default VisionMission;
