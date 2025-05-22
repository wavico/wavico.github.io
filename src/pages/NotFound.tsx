
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 bg-wavico-lightblue rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-7xl font-bold text-wavico-blue">?</span>
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-8">페이지를 찾을 수 없습니다</p>
        <p className="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. URL이 올바른지 확인해 주세요.
        </p>
        <Button asChild size="lg" className="bg-wavico-blue hover:bg-wavico-darkblue">
          <Link to="/">
            <ArrowLeft size={18} className="mr-2" /> 홈으로 돌아가기
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
