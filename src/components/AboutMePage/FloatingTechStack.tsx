import { motion } from "framer-motion";
import { useState } from "react";
import {
  JavaScriptIcon,
  CssIcon,
  ReactIcon,
  TailwindIcon,
  NextIcon,
  MantineIcon,
  TypeScriptIcon,
} from "../icons";

interface FloatingTechStackProps {
  className?: string;
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const icons = [
  { id: "javascript", component: JavaScriptIcon },
  { id: "typescript", component: TypeScriptIcon },
  { id: "css", component: CssIcon },
  { id: "react", component: ReactIcon },
  { id: "tailwind", component: TailwindIcon },
  { id: "next", component: NextIcon },
  { id: "mantine", component: MantineIcon },
];

const generatePosition = (index: number, total: number) => {
  const padding = 100;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const cols = 3;
  const rows = Math.ceil(total / cols);
  const cellWidth = (viewportWidth - padding * 2) / cols;
  const cellHeight = (viewportHeight - padding * 2) / rows;

  const col = index % cols;
  const row = Math.floor(index / cols);

  const x = padding + col * cellWidth + cellWidth / 2 + random(-cellWidth * 0.3, cellWidth * 0.3);
  const y =
    padding + row * cellHeight + cellHeight / 2 + random(-cellHeight * 0.3, cellHeight * 0.3);

  return { x, y };
};

export const FloatingTechStack = ({ className = "" }: FloatingTechStackProps) => {
  const getIconSize = () => {
    const width = window.innerWidth;
    if (width < 768) return 48;
    if (width < 1024) return 64;
    return 80;
  };

  const [iconSize] = useState(getIconSize);

  return (
    <div className={`fixed inset-0 z-[5] pointer-events-none ${className}`} aria-hidden="true">
      {icons.map((icon, index) => {
        const Icon = icon.component;
        const position = generatePosition(index, icons.length);
        const floatX = random(60, 100) * (Math.random() > 0.5 ? 1 : -1);
        const floatY = random(60, 100) * (Math.random() > 0.5 ? 1 : -1);

        return (
          <motion.div
            key={icon.id}
            drag
            dragMomentum={false}
            dragElastic={0}
            initial={{
              x: position.x,
              y: position.y,
              opacity: 0,
              scale: 0.3,
            }}
            animate={{
              x: [position.x, position.x + floatX, position.x],
              y: [position.y, position.y + floatY, position.y],
              rotate: [0, random(-15, 15), 0],
              opacity: 1,
              scale: 1,
            }}
            transition={{
              x: {
                duration: random(8, 15),
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                duration: random(8, 15),
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: random(8, 15),
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: { duration: 0.8, delay: index * 0.1 },
              scale: { duration: 0.8, delay: index * 0.1, ease: "backOut" },
            }}
            whileDrag={{ scale: 1.1, rotate: 0 }}
            className="absolute pointer-events-auto cursor-grab active:cursor-grabbing"
            style={{
              width: iconSize,
              height: iconSize,
            }}
          >
            <Icon className="w-full h-full opacity-60" />
          </motion.div>
        );
      })}
    </div>
  );
};
