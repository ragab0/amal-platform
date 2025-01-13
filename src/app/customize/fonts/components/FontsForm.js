"use client";
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/hooks/ReduxHooks";
import { updateFontOptions } from "@/store/features/cvs/cvsThunks";
import { FONTS } from "@/assets/data/fontsData";
import NestedPageLayout from "../../components/NestedPageLayout";
import FormSelect from "@/components/formSelect/FormSelect";

export default function FontsForm() {
  const dispatch = useAppDispatch();
  const { myCVFontOptions } = useAppSelector((state) => state.cvs);
  const { register, setValue } = useForm({
    defaultValues: myCVFontOptions,
  });

  const handleInputChange = async (name, value) => {
    setValue(name, value);
    const newOptions = {
      ...myCVFontOptions,
      [name === "type" ? "fontFamily" : name]:
        name === "type" ? value : Number(value),
    };
    await dispatch(updateFontOptions(newOptions));
  };

  return (
    <NestedPageLayout title="اختــار خــط">
      <div className="space-y-8 p-4">
        <div className="space-y-4">
          <FormSelect
            label="انواع الخطوط"
            name="type"
            register={register}
            // register={{
            //   ...register("type", {
            //     onChange: (e) => handleInputChange("type", e.target.value),
            //   }),
            // }}
            options={FONTS.map(({ name }) => name)}
            labelClass="text-xl font-medium !text-second"
            defaultOption={myCVFontOptions?.fontFamily}
          />
        </div>

        <div className="space-y-4">
          <p className="text-xl font-medium text-second">حجم الخطوط</p>
          <label className="flex items-center gap-4 max-sm:flex-col">
            <span className="text-lg font-medium text-second shrink-0">
              حجم العناوين
            </span>
            <input
              type="number"
              {...register("titleFontSize", {
                onChange: (e) =>
                  handleInputChange("titleFontSize", e.target.value),
              })}
              className="border rounded-md py-2 px-3 w-full outline-none border-text"
            />
          </label>
          <label className="flex items-center gap-4 max-sm:flex-col">
            <span className="text-lg font-medium text-second shrink-0">
              حجم الخط
            </span>
            <input
              type="number"
              {...register("fontSize", {
                onChange: (e) => handleInputChange("fontSize", e.target.value),
              })}
              className="border rounded-md py-2 px-3 w-full outline-none border-text"
            />
          </label>
        </div>

        {!myCVFontOptions?.fontSize !== 11 &&
          myCVFontOptions.titleFontSize !== 15 && (
            <div>
              <p className="text-xl font-medium text-second py-2 border-t">
                نصائح
              </p>
              {myCVFontOptions.fontSize !== 11 && (
                <p>
                  <span className="text-red-500">*</span> يفضل ان يكون حجم الخط
                  من 10 الي 11
                </p>
              )}
              {myCVFontOptions.titleFontSize !== 15 && (
                <p>
                  <span className="text-red-500">*</span> يفضل ان يكون حجم
                  العناوين من 15 الي 16
                </p>
              )}
            </div>
          )}
      </div>
    </NestedPageLayout>
  );
}
