import { motion } from 'framer-motion';

export default function Badge({ caption }) {
  // now we want to add animation when ever this badge is changes 
  return <motion.span 
    animate={{ scale: [1 ,1.2 ,1] }}
    transition={{duration: 0.3}}
    className="badge"
  >
    {caption}
  </motion.span>;
}
