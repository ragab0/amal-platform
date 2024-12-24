"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus } from "react-icons/hi";
import JobsTable from "./JobsTable";

export default function JobsView({
  activeJobs,
  deletedJobs,
  onEdit,
  onDelete,
  onRestore,
  onDuplicate,
  onAdd,
}) {
  const [showDeleted, setShowDeleted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setShowDeleted(false)}
            className={`admin-btn-secondary ${
              showDeleted && "!bg-transparent"
            }`}
          >
            الوظائف النشطة
          </button>
          <button
            onClick={() => setShowDeleted(true)}
            className={`admin-btn-secondary ${
              !showDeleted && "!bg-transparent"
            }`}
          >
            الوظائف المحذوفة
          </button>
        </div>
        {!showDeleted && (
          <button
            onClick={onAdd}
            className="admin-btn-primary flex items-center gap-2"
          >
            <HiPlus className="w-5 h-5" />
            إضافة وظيفة جديدة
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {showDeleted ? (
          <motion.div
            key="deleted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <JobsTable
              jobs={deletedJobs}
              onRestore={onRestore}
              showActions={true}
              isDeletedSection={true}
            />
          </motion.div>
        ) : (
          <motion.div
            key="active"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <JobsTable
              jobs={activeJobs}
              onEdit={onEdit}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
              showActions={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
