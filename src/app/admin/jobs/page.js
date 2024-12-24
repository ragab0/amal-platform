"use client";
import Modal from "@/components/modals/ConfirmModal";
import FormInput from "@/components/formInput/FormInput";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { HiPencil, HiTrash } from "react-icons/hi";
import { jobSchema } from "@/validations/admin/jobSchema";
import { FadeInUp } from "@/components/motion/MotionWrappers";
import {
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
} from "@/store/features/admin/adminThunks";

// export const metadata = {
//   title: "إدارة الوظائف | منصة عمل",
//   description: "إدارة الوظائف في منصة عمل",
// };

export default function JobsPage() {
  const dispatch = useAppDispatch();
  const { results: jobs, loading } = useAppSelector(
    (state) => state.admin.jobs
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(jobSchema),
  });

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      if (editingJob) {
        await dispatch(
          updateJob({ id: editingJob.id, jobData: data })
        ).unwrap();
      } else {
        await dispatch(createJob(data)).unwrap();
      }
      reset();
      setEditingJob(null);
    } catch (error) {
      // Error is handled by the thunk
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setValue("title", job.title);
    setValue("company", job.company);
    setValue("location", job.location);
    setValue("description", job.description);
  };

  const handleDelete = (job) => {
    setJobToDelete(job);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteJob(jobToDelete.id)).unwrap();
      setIsModalOpen(false);
      setJobToDelete(null);
    } catch (error) {
      // Error is handled by the thunk
    }
  };

  return (
    <div className="container px-6 mx-auto">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        إدارة الوظائف
      </h2>

      <FadeInUp>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-6">
            {editingJob ? "تعديل وظيفة" : "إضافة وظيفة جديدة"}
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-6 md:grid-cols-2"
          >
            <FormInput
              label="عنوان الوظيفة"
              name="title"
              register={register}
              error={errors.title?.message}
              must={true}
            />
            <FormInput
              label="الشركة"
              name="company"
              register={register}
              error={errors.company?.message}
              must={true}
            />
            <FormInput
              label="الموقع"
              name="location"
              register={register}
              error={errors.location?.message}
              must={true}
            />
            <div className="md:col-span-2">
              <FormInput
                label="الوصف"
                name="description"
                register={register}
                error={errors.description?.message}
                must={true}
                textarea
                rows={4}
              />
            </div>

            <div className="md:col-span-2 flex gap-4 justify-end">
              {editingJob && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingJob(null);
                    reset();
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  إلغاء
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-6 rounded-lg hover:bg-primary-7 focus:outline-none focus:ring-2 focus:ring-primary-5"
              >
                {editingJob ? "تحديث" : "إضافة"}
              </button>
            </div>
          </form>
        </div>

        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-right text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">عنوان الوظيفة</th>
                  <th className="px-4 py-3">الشركة</th>
                  <th className="px-4 py-3">الموقع</th>
                  <th className="px-4 py-3">إجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {jobs.map((job) => (
                  <tr key={job.id} className="text-gray-700 dark:text-gray-400">
                    <td className="px-4 py-3">{job.title}</td>
                    <td className="px-4 py-3">{job.company}</td>
                    <td className="px-4 py-3">{job.location}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleEdit(job)}
                          className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-primary-6 rounded-lg hover:bg-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-5"
                        >
                          <HiPencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(job)}
                          className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeInUp>

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
