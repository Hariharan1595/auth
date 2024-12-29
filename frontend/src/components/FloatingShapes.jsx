import React from 'react'
import { motion } from 'framer-motion'

const FloatingShapes = ({color,size,left,top,delay}) => {
  return (
    <motion.div
    className={`absolute ${size} ${color} blur-lg opacity-20  rounded-full`}
    style={{top,left}}
    animate={{
        x: ['0%', '100%', '0%'],
        y: ['0%', '100%', '0%'],
        rotate: [0, 360],
    }}
    transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay
    }}
    aria-hidden="true"
   />

)}

export default FloatingShapes