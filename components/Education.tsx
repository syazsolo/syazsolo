import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import ProfileCard from "./ProfileCard";

const Education = () => {
  const items = [
    {
      school:
        "Asia Pacific University of Technology and Innovation (APU / APIIT)",
      degree: "Bachelor of Science - BS, Computer Science",
      duration: "2018 - 2021",
      logo: "https://placehold.co/48x48/f0f0f0/333?text=APU",
    },
  ];
  
  return (
    <ProfileCard
      title="Education"
      actions={
        <Button
          variant="ghost"
          size="icon"
          className="text-[#666d74]"
          aria-label="Edit education"
        >
          <Pencil size={18} />
        </Button>
      }
    >
      <div className="flex flex-col divide-y divide-[#eef0f3]">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3 md:gap-4 py-3 md:py-4">
            <Avatar className="w-12 h-12 rounded-md shrink-0">
              <AvatarImage src={item.logo} alt={`${item.school} logo`} />
              <AvatarFallback>{item.school.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-[16px] font-semibold text-[#191919] dark:text-white">
                {item.school}
              </h3>
              <p className="text-[14px] text-[#404040] dark:text-gray-300">{item.degree}</p>
              <p className="text-[12px] text-[#666d74] dark:text-gray-400">{item.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </ProfileCard>
  );
};

export default Education;
