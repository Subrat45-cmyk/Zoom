import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';
import { Video, Sparkles, Globe2, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from "../utils/cn";

const LandingPage = () => {
  return (
    <div className={cn('min-h-screen', 'bg-slate-50', 'dark:bg-gray-950', 'text-slate-900', 'dark:text-gray-100', 'flex', 'flex-col')}>
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className={cn('relative', 'px-6', 'py-32', 'md:py-48', 'flex', 'flex-col', 'items-center', 'justify-center', 'overflow-hidden', 'text-center')}>
          <div className={cn('absolute', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2', 'w-[800px]', 'h-[800px]', 'bg-red-900/20', 'rounded-full', 'blur-[120px]', 'pointer-events-none')} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={cn('z-10', 'max-w-4xl')}
          >
            <h1 className={cn('text-7xl', 'md:text-7xl', 'font-extrabold', 'tracking-tight', 'text-slate-900', 'dark:text-gray-100', 'mb-6')}>
              Master
              <br />
               <span className={cn('text-transparent','text-9xl', 'md:text-9xl','font-extrabold', 'bg-clip-text', 'bg-linear-to-r', 'from-red-600', 'to-red-600', 'drop-shadow-[0_0_15px_rgba(100,100,200,0.2)]')}>Meeet</span>
            </h1>
            <p className={cn('text-xl', 'text-slate-500', 'dark:text-gray-400', 'mb-10', 'max-w-2xl', 'mx-auto')}>
              Connect with global peers, practice speaking in real-time.
            </p>
            <div className={cn('flex', 'flex-col', 'sm:flex-row', 'items-center', 'justify-center', 'gap-4')}>
              <Link to="/login">
                <Button variant="primary" size="lg" className={cn('w-full', 'sm:w-auto', 'text-lg', 'px-8', 'rounded-full', 'shadow-lg', 'shadow-red-500/25')}>
                  Start Conversation Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
