import { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";

// Lazy load pages
const HomePage = lazy(() => import("./pages/Index"));
const CompanyPage = lazy(() => import("./pages/Company"));
const ServicePage = lazy(() => import("./pages/Service"));
const ServiceDetailPage = lazy(() => import("@/pages/ServiceDetail"));
const PortfolioPage = lazy(() => import("./pages/Portfolio"));
const ContactPage = lazy(() => import("./pages/Contact"));
const ChatPage = lazy(() => import("./pages/Chat"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // sessionStorage를 사용하여 스플래시 화면이 이미 표시되었는지 확인
    const hasShownSplash = sessionStorage.getItem("hasShownSplash");

    if (!hasShownSplash) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasShownSplash", "true");
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  // 커서 효과 초기화
  useEffect(() => {
    // 터치 디바이스 체크
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const addHoverClass = () => {
      cursor.classList.add("hover");
    };

    const removeHoverClass = () => {
      cursor.classList.remove("hover");
    };

    document.addEventListener("mousemove", moveCursor);

    // 인터랙티브 요소에 호버 효과 추가
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", addHoverClass);
      el.addEventListener("mouseleave", removeHoverClass);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", addHoverClass);
        el.removeEventListener("mouseleave", removeHoverClass);
      });
      if (cursor.parentNode) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-wavico-blue flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-lg bg-white flex items-center justify-center mb-4 mx-auto animate-bounce">
            <span className="text-wavico-blue text-4xl font-bold">W</span>
          </div>
          <h1 className="text-white text-2xl font-bold animate-pulse">
            Wavico
          </h1>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Helmet defaultTitle="Wavico - 음성·이미지·언어를 아우르는 인공지능 기술 전문 기업">
              <html lang="ko" />
              <meta
                name="description"
                content="Wavico는 음성·이미지·언어를 아우르는 인공지능 기술을 바탕으로, 기획부터 배포까지 한 번에 해결하는 End-to-End AI 서비스를 제공합니다."
              />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </Helmet>
            <Toaster />
            <Sonner />
            <Layout>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="w-16 h-16 rounded-lg bg-wavico-blue flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">W</span>
                    </div>
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/company" element={<CompanyPage />} />
                  <Route path="/service" element={<ServicePage />} />
                  <Route
                    path="/service-detail"
                    element={<ServiceDetailPage />}
                  />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </Layout>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default App;
