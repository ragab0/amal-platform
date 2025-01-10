"use client";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import RightIcon from "@/assets/icons/RightIcon";
import DownloadIcon from "@/assets/icons/DownloadIcon";
import EmailIcon from "@/assets/icons/EmailIcon";
import PrintIcon from "@/assets/icons/PrintIcon";

export default function ResumeActions({ templateCustomizeOptions }) {
  const { register, watch, setValue } = useForm({
    defaultValues: Object.entries(templateCustomizeOptions).reduce(
      (acc, [sectionKey, section]) => {
        Object.entries(section.fields).forEach(([fieldKey, field]) => {
          acc[`${sectionKey}-${fieldKey}`] = field.isSelected;
        });
        return acc;
      },
      {}
    ),
  });

  const formValues = watch();

  const handleCheckboxChange = (sectionKey, fieldKey) => {
    setValue(
      `${sectionKey}-${fieldKey}`,
      !formValues[`${sectionKey}-${fieldKey}`],
      {
        shouldValidate: true,
      }
    );
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="p-6 py-10 space-y-6">
      <button className="btn-secondary flex items-center justify-center gap-2 min-w-[200px] mx-auto font-bold rounded-[6px] ">
        <DownloadIcon />
        تنــزيــل
      </button>
      {/* Action Buttons */}
      <div className="flex gap-8 justify-center">
        <button className="btn-secondary-outline flex items-center justify-center gap-2 min-w-[160px] border rounded-[6px] text-xs">
          <EmailIcon />
          إرســال السيــرة الذاتية
        </button>
        <button className="btn-secondary-outline flex items-center justify-center gap-2 min-w-[160px] border rounded-[6px] text-xs">
          <PrintIcon />
          طبــاعة السيــرة الذاتية
        </button>
      </div>
      {/* Resume Sections */}
      <div className="mt-8">
        <h2 className="heading-h3 text-second text-2xl font-cairo font-medium mb-6">
          أقسام السيرة الذاتية
        </h2>
        <div className="space-y-6">
          {Object.entries(templateCustomizeOptions).map(
            ([sectionKey, section]) => (
              <div key={sectionKey} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-[10px] h-[10px] bg-[#461887] rounded-full" />
                  <h3 className="text-[18px] font-cairo font-medium">
                    {section.arabicTitle}
                  </h3>
                </div>
                <div className="space-y-2 pr-6">
                  {Object.entries(section.fields).map(([fieldKey, field]) => (
                    <div key={fieldKey} className="flex items-center gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register(`${sectionKey}-${fieldKey}`)}
                          className="hidden"
                          onChange={() =>
                            handleCheckboxChange(sectionKey, fieldKey)
                          }
                        />
                        <motion.div
                          initial={false}
                          animate={{
                            backgroundColor: formValues[
                              `${sectionKey}-${fieldKey}`
                            ]
                              ? "#33D38E"
                              : "transparent",
                            borderColor: formValues[`${sectionKey}-${fieldKey}`]
                              ? "#33D38E"
                              : "#9D94A8",
                            scale: formValues[`${sectionKey}-${fieldKey}`]
                              ? 1.05
                              : 1,
                          }}
                          transition={{ duration: 0.2 }}
                          className="w-[20px] h-[20px] border rounded-[3px] flex items-center justify-center"
                        >
                          <AnimatePresence>
                            {formValues[`${sectionKey}-${fieldKey}`] && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <RightIcon />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        <span className="text-[14px] font-cairo text-[#461887]">
                          {field.arabicName}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
