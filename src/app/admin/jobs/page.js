"use client";
import JobForm from "./components/JobForm";
import JobsView from "./components/JobsView";
import Modal from "@/components/modals/ConfirmModal";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import {
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
} from "@/store/features/admin/adminThunks";

export default function JobsPage() {
  const dispatch = useAppDispatch();
  const { results: jobs = [], loading } = useAppSelector(
    (state) => state.admin.jobs
  );
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleSubmit = async (data) => {
    const { payload, error } = data._id
      ? await dispatch(updateJob({ id: data._id, jobData: data }))
      : await dispatch(createJob(data));

    if (!error && payload?.status === "success") {
      toast.success(
        data._id ? "تم تحديث الوظيفة بنجاح" : "تم إضافة الوظيفة بنجاح"
      );
      setShowForm(false);
      setEditingJob(null);
    } else {
      toast.error(data._id ? "فشل تحديث الوظيفة" : "فشل إضافة الوظيفة");
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDelete = (job) => {
    setJobToDelete(job);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    const { payload, error } = await dispatch(deleteJob(jobToDelete._id));
    if (!error && payload?.status === "success") {
      toast.success("تم حذف الوظيفة بنجاح");
    } else {
      toast.error("فشل حذف الوظيفة");
    }
    setIsModalOpen(false);
    setJobToDelete(null);
  };

  const handleRestore = async (job) => {
    const { payload, error } = await dispatch(
      updateJob({ id: job._id, jobData: { ...job, isActive: true } })
    );
    if (!error && payload?.status === "success") {
      toast.success("تم استعادة الوظيفة بنجاح");
    } else {
      toast.error("فشل استعادة الوظيفة");
    }
  };

  const handleDuplicate = (job) => {
    const { _id, createdAt, updatedAt, __v, ...jobData } = job;
    handleSubmit({
      ...jobData,
      title: `نسخة من ${jobData.title}`,
    });
  };

  const activeJobs = jobs.filter((job) => job.isActive);
  const deletedJobs = jobs.filter((job) => !job.isActive);

  return (
    <div
      className="admin-section"
      style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
    >
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        إدارة الوظائف
      </h2>

      <AnimatePresence mode="wait">
        {showForm ? (
          <JobForm
            key="form"
            onSubmit={handleSubmit}
            initialData={editingJob}
            onCancel={() => {
              setShowForm(false);
              setEditingJob(null);
            }}
          />
        ) : (
          <JobsView
            key="view"
            activeJobs={activeJobs}
            deletedJobs={deletedJobs}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRestore={handleRestore}
            onDuplicate={handleDuplicate}
            onAdd={() => setShowForm(true)}
          />
        )}
      </AnimatePresence>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setJobToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="حذف وظيفة"
        message={`هل أنت متأكد من حذف وظيفة "${jobToDelete?.title}"؟`}
        confirmText="حذف"
        cancelText="إلغاء"
      />
    </div>
  );
}
