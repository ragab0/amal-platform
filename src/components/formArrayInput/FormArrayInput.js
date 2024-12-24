"use client";
import { useFieldArray } from "react-hook-form";
import { HiPlus, HiTrash } from "react-icons/hi";
import FormInput from "../formInput/FormInput";

const FormArrayInput = ({ label, name, control, error, must, placeholder }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  // Get array-level errors
  const arrayError = typeof error === "string" ? error : null;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {must && <span className="text-red-500 mr-1">*</span>}
        </label>
        <button
          type="button"
          onClick={() => append("")}
          className="flex items-center gap-1 text-sm text-primary-6 hover:text-primary-7"
        >
          <HiPlus className="w-4 h-4" />
          إضافة جديد
        </button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => {
          // Get item-level error if it exists
          const fieldError =
            error?.[index]?.message ||
            (Array.isArray(error) && error[index]) ||
            null;

          return (
            <div key={field.id} className={`flex gap-2 w-full items-start`}>
              <div className="flex-grow">
                <FormInput
                  name={`${name}.${index}`}
                  register={control.register}
                  placeholder={placeholder}
                  error={fieldError}
                  spaceBlock={false}
                  inpClassName="h-auto py-2"
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="flex items-center justify-center p-2 text-red-600 hover:bg-red-100 rounded-lg"
              >
                <HiTrash className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Show array-level error if it exists */}
      {arrayError && <p className="mt-1 text-sm text-red-600">{arrayError}</p>}

      {/* Show if array is empty */}
      {fields.length === 0 && (
        <p className="mt-1 text-sm text-red-600">
          يجب إضافة متطلب واحد على الأقل
        </p>
      )}
    </div>
  );
};

export default FormArrayInput;
