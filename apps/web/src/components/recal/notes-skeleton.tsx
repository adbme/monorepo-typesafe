import { motion } from "framer-motion";

export const NotesSkeleton = () => {
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="block transition-transform hover:scale-[1.02]">
            <div className="border rounded p-4 shadow-sm bg-card h-full relative animate-pulse">
              <div className="h-32 w-full bg-gray-100/10 mb-4 rounded" />

              <div className="h-6 bg-gray-100/10 mb-2 rounded w-3/4" />
              <div className="h-4 bg-gray-100/10 mb-2 rounded w-full" />
              <div className="h-4 bg-gray-100/10 rounded w-5/6" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
