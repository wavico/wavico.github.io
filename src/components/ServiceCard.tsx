import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    icon: ReactNode;
    link: string;
  };
  delay: number;
  isVisible: boolean;
  isServiceDetailPage?: boolean;
}

const ServiceCard = ({
  service,
  delay,
  isVisible,
  isServiceDetailPage = false,
}: ServiceCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isServiceDetailPage) {
      const element = document.querySelector(service.link);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else {
      navigate("/service-detail", {
        state: {
          scrollTo: service.link,
        },
      });
    }
  };

  return (
    <Card
      className={`service-card border border-gray-200 shadow-sm hover:shadow-md transition-all duration-500 ${
        isVisible ? "animate-slide-up opacity-100" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader>
        <div className="mb-4">{service.icon}</div>
        <CardTitle className="text-xl break-keep">{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 break-keep">{service.description}</p>
      </CardContent>
      <CardFooter>
        <button
          onClick={handleClick}
          className="text-wavico-blue hover:text-wavico-darkblue font-medium flex items-center group"
        >
          자세히 보기
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
