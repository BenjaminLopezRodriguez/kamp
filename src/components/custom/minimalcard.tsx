import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { MessageCircle, MoveUpRight } from "lucide-react";
interface MinimalCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  onClick?: () => void;
}

const MinimalCard = ({
  title,
  children,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  onClick,
}: MinimalCardProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="${className} overflow-hidden rounded-2xl bg-white p-4 md:rounded-none"
      onClick={onClick}
    >
      <div className="flex flex-row">
        <h3 className="mb-3 text-xl font-semibold text-gray-900">{title}</h3>
        <div className="relative z-10 ml-auto h-fit w-fit rounded-full bg-slate-300/50 p-2">
          <MessageCircle width={15} height={15} />
        </div>
      </div>

      <div className={`p-4 ${bodyClassName}`}>{children}</div>
    </motion.div>
  );
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
