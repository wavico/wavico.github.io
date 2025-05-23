import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Home from "./pages/Index";
import Company from "./pages/Company";
import Service from "./pages/Service";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 스플래시 화면을 2초 동안 보여줍니다
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/company" element={<Company />} />
              <Route path="/service" element={<Service />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
