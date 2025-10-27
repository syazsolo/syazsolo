import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import ProfileCard from "./ProfileCard";

const Skills = () => {
  const skills = [
    "React.js",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Java",
    "Python",
    "SQL",
    "MongoDB",
    "Git",
    "Docker",
    "Amazon Web Services (AWS)",
  ];
  
  return (
    <ProfileCard
      title="Skills"
      actions={
        <Button
          variant="ghost"
          size="icon"
          className="text-[#666d74]"
          aria-label="Edit skills"
        >
          <Pencil size={18} />
        </Button>
      }
    >
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <Badge key={idx} variant="secondary" className="text-[15px] text-[#191919] dark:text-white">
            {skill}
          </Badge>
        ))}
      </div>
    </ProfileCard>
  );
};

export default Skills;
