import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleServiceClick = (link: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/services", {
      state: {
        scrollTo: link,
      },
    });
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-white flex items-center"
            >
              <div className="w-10 h-10 rounded-lg bg-wavico-blue text-white flex items-center justify-center mr-2 text-xl">
                W
              </div>
              Wavico
            </Link>
            <p className="mt-4 text-gray-400">
              음성·이미지·언어를 아우르는 인공지능 기술을 바탕으로, 기획부터
              배포까지 한 번에 해결하는 End-to-End AI 서비스
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">서비스</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  onClick={handleServiceClick("#web-mobile-detail")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  웹/앱 개발
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleServiceClick("#ai-solution-detail")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  AI 모델링
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleServiceClick("#dashboard-detail")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  시각화 대시보드
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleServiceClick("#mobile-detail")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  모바일 앱
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">회사</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/company"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  회사 소개
                </Link>
              </li>
              <li>
                <Link
                  to="/company"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  연혁
                </Link>
              </li>
              <li>
                <Link
                  to="/company"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  비전 및 미션
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  포트폴리오
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">문의</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">대표자 : 김선민</li>
              <li className="text-gray-400">
                주소 : 서울시 동대문구 회기로 4길
              </li>
              <li className="text-gray-400">이메일: wavicomanager@gmail.com</li>
              <li className="text-gray-400">전화: 010-5549-9020</li>
              <li className="text-gray-400">사업자 등록번호: 871-77-00573</li>
              <li>
                <Link
                  to="/contact"
                  className="text-wavico-blue hover:text-white transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
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
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              이용약관
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              개인정보처리방침
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
