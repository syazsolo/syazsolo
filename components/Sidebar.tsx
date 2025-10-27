import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Sidebar = () => {
  const people = [
    {
      name: "John Doe",
      headline: "Senior Software Engineer at Google",
      img: "https://placehold.co/48x48/e0e0e0/333?text=JD",
    },
    {
      name: "Jane Smith",
      headline: "Product Manager at Microsoft",
      img: "https://placehold.co/48x48/e0e0e0/333?text=JS",
    },
    {
      name: "Alex Johnson",
      headline: "Data Scientist at Amazon",
      img: "https://placehold.co/48x48/e0e0e0/333?text=AJ",
    },
  ];
  
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Card className="bg-white dark:bg-[#1a1a1a] border-[#d6d9dc] dark:border-[#333333] transition-colors">
        <CardHeader className="pb-3">
          <h3 className="text-[16px] font-semibold text-[#191919] dark:text-white">
            People also viewed
          </h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col gap-4">
            {people.map((p, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Avatar className="w-12 h-12 shrink-0">
                  <AvatarImage src={p.img} alt={p.name} />
                  <AvatarFallback>{p.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-[#191919] dark:text-white truncate">
                    {p.name}
                  </div>
                  <div className="text-[12px] text-[#666d74] dark:text-gray-400 line-clamp-2">
                    {p.headline}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 h-7 px-3 text-[12px] border-[#666d74] text-[#191919] dark:text-white hover:bg-black/5">
                    <Plus size={14} className="mr-1.5" /> Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-[#1a1a1a] border-[#d6d9dc] dark:border-[#333333] transition-colors">
        <CardHeader className="pb-3">
          <h3 className="text-[16px] font-semibold text-[#191919] dark:text-white">
            People you may know
          </h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col gap-4">
            {people.slice(0, 2).map((p, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Avatar className="w-12 h-12 shrink-0">
                  <AvatarImage src={p.img} alt={p.name} />
                  <AvatarFallback>{p.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-[#191919] dark:text-white truncate">
                    {p.name}
                  </div>
                  <div className="text-[12px] text-[#666d74] dark:text-gray-400 line-clamp-2">
                    {p.headline}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 h-7 px-3 text-[12px] border-[#666d74] text-[#191919] dark:text-white hover:bg-black/5">
                    <Plus size={14} className="mr-1.5" /> Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
