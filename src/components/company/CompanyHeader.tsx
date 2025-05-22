
import React from "react";

const CompanyHeader = () => {
  return (
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
  );
};

export default CompanyHeader;
