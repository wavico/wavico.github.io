
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="text-2xl font-bold text-white flex items-center">
              <div className="w-10 h-10 rounded-lg bg-wavico-blue text-white flex items-center justify-center mr-2 text-xl">W</div>
              Wavico
            </Link>
            <p className="mt-4 text-gray-400">
              음성·이미지·언어를 아우르는 인공지능 기술을 바탕으로, 기획부터 배포까지 한 번에 해결하는 End-to-End AI 서비스
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">서비스</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/service" className="text-gray-400 hover:text-white transition-colors">
                  웹/앱 개발
                </Link>
              </li>
              <li>
                <Link to="/service" className="text-gray-400 hover:text-white transition-colors">
                  AI 솔루션
                </Link>
              </li>
              <li>
                <Link to="/service" className="text-gray-400 hover:text-white transition-colors">
                  시각화 대시보드
                </Link>
              </li>
              <li>
                <Link to="/service" className="text-gray-400 hover:text-white transition-colors">
                  시스템 통합
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">회사</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/company" className="text-gray-400 hover:text-white transition-colors">
                  회사 소개
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-gray-400 hover:text-white transition-colors">
                  연혁
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-gray-400 hover:text-white transition-colors">
                  비전 및 미션
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-400 hover:text-white transition-colors">
                  포트폴리오
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">문의</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                서울특별시 강남구 테헤란로 123
              </li>
              <li className="text-gray-400">
                이메일: contact@wavico.ai
              </li>
              <li className="text-gray-400">
                전화: 02-123-4567
              </li>
              <li>
                <Link to="/contact" className="text-wavico-blue hover:text-white transition-colors">
                  상담 신청하기
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Wavico. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              이용약관
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              개인정보처리방침
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
