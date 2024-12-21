import AnalyzeCv from "@/assets/icons/benifits/AnalyzeCv";
import CommunicateWithExperts from "@/assets/icons/benifits/CommunicateWithExperts";
import CreateCv from "@/assets/icons/benifits/CreateCv";
import EditCv from "@/assets/icons/benifits/EditCv";
import SendCv from "@/assets/icons/benifits/SendCv";
import ShowJobs from "@/assets/icons/benifits/ShowJobs";
import { ourServices } from "@/assets/data/homeData";
import { FadeInUp, HoverCard } from "@/components/motion/MotionWrappers";

const servicesSvgs = {
  AnalyzeCv,
  CommunicateWithExperts,
  CreateCv,
  EditCv,
  SendCv,
  ShowJobs,
};

export default function Services() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-[50px]">
      {ourServices.map((service, index) => {
        const SvgComponent = servicesSvgs[service.SvgName];
        return (
          <FadeInUp
            key={index}
            delay={index * 0.1}
            className="flex flex-col md:flex-row items-center md:items-start p-6 rounded-lg shadow-[0_1px_1px_2px_rgb(0_0_0_/_0.05)] 
              min-h-[150px] w-full max-md:max-w-[400px] max-md:text-center mx-auto"
          >
            <div className="w-24 h-24 mb-4 md:mb-0 md:ml-4 shrink-0">
              <SvgComponent />
            </div>
            <div>
              <h3 className="font-bold text-xl md:text-2xl mb-2 text-neutral-900">
                {service.title}
              </h3>
              <p className="text-base md:text-lg text-neutral-700">
                {service.desc}
              </p>
            </div>
          </FadeInUp>
        );
      })}
    </div>
  );
}
