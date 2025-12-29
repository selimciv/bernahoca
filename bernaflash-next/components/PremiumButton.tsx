'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface PremiumButtonProps {
    href?: string;
    onClick?: () => void;
    icon: string;
    title: string;
    description?: string;
    glowColor?: 'cyan' | 'pink' | 'green' | 'purple' | 'yellow';
    size?: 'small' | 'medium' | 'large';
    delay?: number;
}

export default function PremiumButton({
    href,
    onClick,
    icon,
    title,
    description,
    glowColor = 'cyan',
    size = 'large',
    delay = 0
}: PremiumButtonProps) {

    const glowClasses = {
        cyan: 'from-[#00d9ff] to-[#0080ff] shadow-[0_0_30px_rgba(0,217,255,0.5)]',
        pink: 'from-[#ff0080] to-[#ff1493] shadow-[0_0_30px_rgba(255,0,128,0.5)]',
        green: 'from-[#00ff88] to-[#00cc66] shadow-[0_0_30px_rgba(0,255,136,0.5)]',
        purple: 'from-[#9d00ff] to-[#6600cc] shadow-[0_0_30px_rgba(157,0,255,0.5)]',
        yellow: 'from-[#ffd700] to-[#ffa500] shadow-[0_0_30px_rgba(255,215,0,0.5)]'
    };

    const hoverGlows = {
        cyan: 'hover:shadow-[0_0_50px_rgba(0,217,255,0.7)]',
        pink: 'hover:shadow-[0_0_50px_rgba(255,0,128,0.7)]',
        green: 'hover:shadow-[0_0_50px_rgba(0,255,136,0.7)]',
        purple: 'hover:shadow-[0_0_50px_rgba(157,0,255,0.7)]',
        yellow: 'hover:shadow-[0_0_50px_rgba(255,215,0,0.7)]'
    };

    const sizes = {
        small: 'p-2 text-sm',
        medium: 'p-3',
        large: 'p-4'
    };

    const iconSizes = {
        small: 'text-2xl',
        medium: 'text-3xl',
        large: 'text-4xl'
    };

    const content = (
        <motion.div
            className={`
        w-full
        relative
        bg-gradient-to-r ${glowClasses[glowColor]}
        ${sizes[size]}
        rounded-2xl
        text-white font-bold
        transition-all duration-300
        ${hoverGlows[glowColor]}
        cursor-pointer
        overflow-hidden
        group
      `}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                delay,
                type: 'spring',
                stiffness: 100,
                damping: 15
            }}
            whileHover={{
                scale: 1.05,
                y: -5
            }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-1.5">
                <motion.span
                    className={iconSizes[size]}
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    {icon}
                </motion.span>
                <h3 className="text-sm md:text-base font-bold">{title}</h3>
                {description && (
                    <p className="text-xs opacity-90 text-center">{description}</p>
                )}
            </div>
        </motion.div>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return <div onClick={onClick}>{content}</div>;
}
