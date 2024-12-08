import { FadeInUp } from "@/components/motion/MotionWrappers";

export default function SearchResults() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(9)].map((_, index) => (
        <FadeInUp
          key={index}
          delay={0.8 + index * 0.1}
          className="opacity-0 transform translate-y-10"
        >
          <div
            className="bg-[#F1EDF6] rounded-[8px] p-6 space-y-4 
            transition-all duration-300 
            hover:shadow-[0_10px_25px_rgba(70,24,135,0.1)]
            hover:-translate-y-2"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="w-20 h-20 bg-white/50 rounded-md animate-pulse"></div>
              <div className="w-24 h-6 bg-white/50 rounded animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="h-8 bg-white/50 rounded animate-pulse"></div>
              <div className="h-6 bg-white/50 rounded animate-pulse w-3/4"></div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="h-5 bg-white/50 rounded animate-pulse"></div>
              <div className="h-5 bg-white/50 rounded animate-pulse w-4/5"></div>
            </div>
            <div className="mt-6 h-10 bg-white/50 rounded animate-pulse"></div>
          </div>
        </FadeInUp>
      ))}
    </div>
  );
}
