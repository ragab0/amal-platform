"use client";
import { HiPencil, HiTrash, HiRefresh, HiDuplicate } from "react-icons/hi";

export default function JobsTable({
  jobs,
  onEdit,
  onDelete,
  onRestore,
  onDuplicate,
  showActions,
  isDeletedSection,
}) {
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <div className="w-full overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>عنوان الوظيفة</th>
              <th>الشركة</th>
              <th>الموقع</th>
              <th>نوع الوظيفة</th>
              <th>مستوى الخبرة</th>
              <th>الراتب</th>
              <th>المتطلبات</th>
              <th>تاريخ النشر</th>
              {showActions && <th>إجراءات</th>}
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>
                  {job.location.city}, {job.location.country}
                </td>
                <td>{job.type}</td>
                <td>{job.experience}</td>
                <td>
                  {job.salary.from} - {job.salary.to} {job.salary.currency}
                </td>
                <td>{job.requirements?.length || 0}</td>
                <td>
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleString()
                    : "-"}
                </td>
                {showActions && (
                  <td>
                    <div className="flex items-center space-x-4">
                      {isDeletedSection ? (
                        <button
                          onClick={() => onRestore(job)}
                          className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-green-600 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                          title="استعادة"
                        >
                          <HiRefresh className="w-5 h-5" />
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => onEdit(job)}
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-primary-6 rounded-lg hover:bg-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-5"
                            title="تعديل"
                          >
                            <HiPencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => onDuplicate(job)}
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-blue-600 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            title="نسخ"
                          >
                            <HiDuplicate className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => onDelete(job)}
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                            title="حذف"
                          >
                            <HiTrash className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
