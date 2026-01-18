import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Davesakraken",
    Icon: GitHubIcon,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/davidbell1995/",
    Icon: LinkedInIcon,
  },
];

function SocialBubble() {
  return (
    <motion.div
      className="fixed z-15 flex 2xl:flex-col gap-4
        bottom-6 left-1/2 -translate-x-1/2
        2xl:left-70 2xl:bottom-auto 2xl:top-60 2xl:translate-x-0"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { delay: 1.2 + index * 0.15, duration: 0.4 },
            y: {
              delay: 1.5 + index * 0.2,
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          aria-label={link.name}
        >
          <link.Icon className="w-6 h-6 lg:w-7 lg:h-7" />
        </motion.a>
      ))}
    </motion.div>
  );
}

export default SocialBubble;
