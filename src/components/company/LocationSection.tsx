import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationSectionProps {
  isVisible: boolean;
  addRef: (id: string) => (el: HTMLDivElement) => void;
}

const LocationSection = ({ isVisible, addRef }: LocationSectionProps) => {
  return (
    <section
      id="location"
      ref={addRef("location")}
      className={`py-24 bg-gray-50 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">회사 위치</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wavico를 방문하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="rounded-lg overflow-hidden">
              <a
                href="https://map.naver.com/v5/place/11591483"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="public\map.png" alt="Wavico 위치 지도 미리보기" />
              </a>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6">연락처 및 오시는 길</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">주소</h4>
                  <p className="text-gray-600">서울시 동대문구 회기로 4길</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">연락처</h4>
                  <p className="text-gray-600">전화: 010-5549-9020</p>
                  <p className="text-gray-600">이메일: seonmin8284@gmail.com</p>
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
  );
};

export default LocationSection;
