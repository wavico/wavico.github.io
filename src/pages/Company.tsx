
import React from "react";
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
      <CompanyHeader />
      <VisionMission isVisible={isVisible["vision-mission"]} addRef={addRef} />
      <CompanyHistory isVisible={isVisible["history"]} addRef={addRef} />
      <TeamSection isVisible={isVisible["team"]} addRef={addRef} />
      <LocationSection isVisible={isVisible["location"]} addRef={addRef} />
    </div>
  );
};

export default Company;
