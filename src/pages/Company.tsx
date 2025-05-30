import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CompanyHeader from "@/components/company/CompanyHeader";
import VisionMission from "@/components/company/VisionMission";
import CompanyHistory from "@/components/company/CompanyHistory";
import TeamSection from "@/components/company/TeamSection";
import LocationSection from "@/components/company/LocationSection";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const Company = () => {
  const { isVisible, addRef } = useIntersectionObserver();

  return (
    <div>
      <Helmet>
        <title>회사 소개 | Wavico - AI·웹·앱 개발 전문 기업</title>
        <meta
          name="description"
          content="Wavico는 음성·이미지·언어를 아우르는 인공지능 기술을 바탕으로 혁신적인 솔루션을 제공하는 기업입니다. 우리의 비전과 미션을 소개합니다."
        />
        <meta
          name="keywords"
          content="Wavico,회사소개,비전,미션,연혁,조직문화,AI기업"
        />
        <meta
          property="og:title"
          content="회사 소개 | Wavico - AI·웹·앱 개발 전문 기업"
        />
        <meta
          property="og:description"
          content="Wavico는 음성·이미지·언어를 아우르는 인공지능 기술을 바탕으로 혁신적인 솔루션을 제공하는 기업입니다. 우리의 비전과 미션을 소개합니다."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wavico.co.kr/company" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="canonical" href="https://wavico.co.kr/company" />
      </Helmet>

      <CompanyHeader />
      <VisionMission isVisible={isVisible["vision-mission"]} addRef={addRef} />
      <CompanyHistory isVisible={isVisible["history"]} addRef={addRef} />
      <TeamSection isVisible={isVisible["team"]} addRef={addRef} />
      <LocationSection isVisible={isVisible["location"]} addRef={addRef} />
    </div>
  );
};

export default Company;
