"use client";

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
  );
};

export const CardSkeleton = () => {
  return (
    <div className="p-6 rounded-lg border-l-4 border-gray-300 dark:border-gray-700 shadow-md bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col space-y-4">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex justify-end mt-2">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
};

export const TextSkeleton = () => {
  return (
    <div className="space-y-2 max-w-lg">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
};

export const BannerSkeleton = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6">
      <Skeleton className="h-12 w-3/4 md:w-1/2" />
      <Skeleton className="h-6 w-full md:w-3/5" />
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
        <Skeleton className="h-12 w-40" />
        <Skeleton className="h-12 w-40" />
      </div>
    </div>
  );
};

export const DivisionsSkeleton = () => {
  return (
    <div className="w-full">
      <div className="text-center space-y-6 mb-12">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-6 w-full md:w-2/3 mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <Skeleton className="h-20 w-full md:w-3/4 lg:w-1/2 mx-auto" />
      </div>
    </div>
  );
};

export const SkeletonLoader = ({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isLoading ? 
        <div className="animate-pulse">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div> : 
        children
      }
    </motion.div>
  );
};
