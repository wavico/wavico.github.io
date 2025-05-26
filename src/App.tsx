import { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

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

  return (
    <BrowserRouter>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ScrollToTop />
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
                    <div className="animate-pulse">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
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
