import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import emailjs from "@emailjs/browser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// EmailJS 초기화
emailjs.init("xDR1O9GFblv7LxOUl");

const KAKAO_CHANNEL_URL = "http://pf.kakao.com/_xbqZSn/chat";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      service: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formRef.current) return;

    try {
      // 필수 필드 검증
      const requiredFields: (keyof FormData)[] = [
        "name",
        "email",
        "phone",
        "service",
        "message",
      ];
      const emptyFields = requiredFields.filter((field) => !formData[field]);

      if (emptyFields.length > 0) {
        toast({
          title: "입력 오류",
          description: "필수 항목을 모두 입력해주세요.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const response = await emailjs.sendForm(
        "service_g8o69xv",
        "template_cqdf8rk",
        formRef.current,
        "xDR1O9GFblv7LxOUl"
      );

      if (response.status === 200) {
        toast({
          title: "문의가 접수되었습니다",
          description: "빠른 시일 내에 답변 드리도록 하겠습니다.",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("문의 접수 실패:", error);
      toast({
        title: "오류 발생",
        description: "이메일 전송 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <section className="pt-40 pb-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            프로젝트를 시작해볼까요?
          </h1>
          <p className="text-xl max-w-2xl">
            Wavico의 전문가들과 함께 귀사의 비즈니스 목표를 달성할 수 있는
            맞춤형 솔루션에 대해 상담해보세요.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-8">문의하기</h2>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="이름을 입력하세요"
                    required
                    className="bg-gray-50 border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">이메일 *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="이메일을 입력하세요"
                    required
                    className="bg-gray-50 border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">연락처 *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="연락처를 입력하세요"
                    required
                    className="bg-gray-50 border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">회사명</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="회사명을 입력하세요"
                    className="bg-gray-50 border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">서비스 항목 *</Label>
                  <input
                    type="hidden"
                    name="service"
                    value={formData.service}
                  />
                  <RadioGroup
                    value={formData.service}
                    onValueChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        service: value,
                      }));
                    }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="web" id="web" />
                      <Label htmlFor="web" className="font-normal">
                        웹/앱 개발
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ai" id="ai" />
                      <Label htmlFor="ai" className="font-normal">
                        AI 솔루션
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dashboard" id="dashboard" />
                      <Label htmlFor="dashboard" className="font-normal">
                        시각화 대시보드
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 opacity-50 cursor-not-allowed">
                      <RadioGroupItem
                        value="integration"
                        id="integration"
                        disabled
                      />
                      <Label htmlFor="integration" className="font-normal">
                        시스템 통합
                        <span className="ml-2 text-xs text-gray-500">
                          (서비스 준비중)
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mobile" id="mobile" />
                      <Label htmlFor="mobile" className="font-normal">
                        모바일 앱
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="font-normal">
                        기타
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">문의 내용 *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="문의 내용을 입력하세요"
                    required
                    className="min-h-[150px] bg-gray-50 border-gray-300"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-wavico-blue hover:bg-wavico-darkblue h-12 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 전송
                        중...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" /> 문의하기
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div
              className="lg:pl-8 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <h2 className="text-3xl font-bold mb-8">연락처 정보</h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-wavico-lightblue rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-wavico-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">주소</h3>
                    <p className="text-gray-600">서울시 동대문구 회기로 4길</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-wavico-lightblue rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-6 h-6 text-wavico-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">전화</h3>
                    <p className="text-gray-600">010-5549-9020</p>
                    <p className="text-gray-500 text-sm mt-1">
                      평일: 09:00 - 18:00 | 토/일/공휴일: 휴무
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-wavico-lightblue rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-6 h-6 text-wavico-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">이메일</h3>
                    <p className="text-gray-600">wavicomanager@gmail.com</p>
                    <p className="text-gray-500 text-sm mt-1">
                      24시간 이내에 답변드립니다.
                    </p>
                  </div>
                </div>

                {/* 카카오톡 채널 버튼 */}
                <div className="mt-8">
                  <Button
                    className="w-full bg-[#FEE500] hover:bg-[#FEE500]/90 text-black h-12 text-lg flex items-center justify-center"
                    onClick={() => window.open(KAKAO_CHANNEL_URL, "_blank")}
                  >
                    <svg
                      width="24"
                      height="22"
                      viewBox="0 0 24 22"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 0C5.37 0 0 4.27 0 9.55C0 12.99 2.24 16.01 5.63 17.84L4.27 22L9.37 18.93C10.22 19.08 11.1 19.16 12 19.16C18.63 19.16 24 14.89 24 9.61C24 4.33 18.63 0 12 0Z"
                      />
                    </svg>
                    카카오톡 채널로 상담하기
                  </Button>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-12 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
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

              {/* Social Media Links */}
              {/* <div className="mt-12">
                <h3 className="text-lg font-bold mb-4">소셜 미디어</h3>
                <div className="flex space-x-4">
                  {["Facebook", "Twitter", "LinkedIn", "Instagram"].map(
                    (social) => (
                      <a
                        key={social}
                        href="#"
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-wavico-blue hover:text-white transition-colors"
                      >
                        {social.charAt(0)}
                      </a>
                    )
                  )}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              자주 묻는 질문
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              고객님들이 가장 많이 궁금해하시는 질문들을 모았습니다.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            {[
              {
                question: "프로젝트 진행 기간은 얼마나 걸리나요?",
                answer:
                  "프로젝트의 규모와 복잡성에 따라 다르지만, 일반적으로 소규모 프로젝트는 2-4주, 중형 프로젝트는 1-3개월, 대형 프로젝트는 3-6개월 정도 소요됩니다. 정확한 일정은 요구사항 분석 후 안내해 드립니다.",
              },
              {
                question: "비용은 어떻게 산정되나요?",
                answer:
                  "프로젝트의 규모, 기능 복잡도, 개발 기간 등을 고려하여 산정됩니다. 정확한 견적은 상세한 요구사항을 바탕으로 무료 상담을 통해 제공해 드립니다.",
              },
              {
                question: "이미 개발된 시스템을 업그레이드할 수 있나요?",
                answer:
                  "네, 기존 시스템 분석 후 최적의 업그레이드 방안을 제안해 드립니다. 레거시 시스템 통합 및 마이그레이션 서비스도 제공하고 있습니다.",
              },
              {
                question: "개발 후 지원 서비스는 어떻게 되나요?",
                answer:
                  "모든 프로젝트에는 기본적으로 3개월의 무상 유지보수 기간이 포함되어 있으며, 이후에는 유지보수 계약을 통해 지속적인 지원을 제공해 드립니다.",
              },
              {
                question: "AI 솔루션은 어떤 산업에 적용 가능한가요?",
                answer:
                  "금융, 의료, 교육, 제조, 유통 등 다양한 산업 분야에 AI 솔루션을 적용할 수 있습니다. 각 산업별 특화된 AI 모델과 시스템을 개발하여 제공합니다.",
              },
              {
                question: "해외 고객을 위한 서비스도 제공하나요?",
                answer:
                  "네, 글로벌 고객을 위한 다국어 지원 및 현지화 서비스를 제공하고 있습니다. 시차에 관계없이 원활한 커뮤니케이션을 위한 체계를 갖추고 있습니다.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-3">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
