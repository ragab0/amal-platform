import { lastJobs } from "@/assets/data/homeData";
import Office from "@/assets/icons/Office";
import Link from "next/link";

export default function LastJobs() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
      {lastJobs.map(({ jobName, companyName, location, desc }, i) => (
        <Link
          href="#"
          key={i}
          className="p-4 pb-8 border rounded-2xl text-neutral-6 !leading-relaxed"
        >
          <h3 className="heading-h3 font-bold text-neutral-9">{jobName}</h3>
          <div className="flex gap-4 my-4">
            <Office />
            <div>
              <p>{companyName}</p>
              <p>{location}</p>
            </div>
          </div>
          <p className="md:text-xl !leading-relaxed font-medium">{desc}</p>
        </Link>
      ))}
    </div>
  );
}
