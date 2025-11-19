import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { MessageCircle, MoveUpRight } from "lucide-react";
import Link from "next/link";

interface MinimalCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  onClick?: () => void;
  href?: string;
}

const MinimalCard = ({
  title,
  children,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  onClick,
  href,
}: MinimalCardProps) => {
  const cardContent = (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`${className} overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl ${
        onClick || href ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex flex-row items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <div className="relative z-10 ml-auto h-fit w-fit rounded-full bg-blue-100 p-2 transition-colors hover:bg-blue-200">
          <MessageCircle width={18} height={18} className="text-blue-600" />
        </div>
      </div>

      <div className={`text-gray-600 ${bodyClassName}`}>{children}</div>
      
      {(onClick || href) && (
        <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
          Learn more
          <MoveUpRight width={16} height={16} className="ml-1" />
        </div>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

//   <motion.div

//               >
//                 <div className="flex flex-row">
//                   <h3 className="mb-3 text-xl font-semibold text-gray-900">
//                     {feature.title}
//                   </h3>
//                   <div className="relative z-10 ml-auto h-fit w-fit rounded-full bg-slate-300/50 p-2">
//                     <MoveUpRight width={15} height={15} />
//                   </div>
//                 </div>
//                 <p className="text-gray-600">{feature.description}</p>
//               </motion.div>

export default MinimalCard;
