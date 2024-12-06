"use client";
import { useForm } from "react-hook-form";
import NestedPageLayout from "../../components/NestedPageLayout";

const FONTS = [
  { id: 1, name: "Cairo" },
  { id: 2, name: "Noto Kufi Arabic" },
  { id: 3, name: "Tajawal" },
];

const FONT_SIZES = [
  { id: 1, size: "12px" },
  { id: 2, size: "14px" },
  { id: 3, size: "16px" },
  { id: 4, size: "18px" },
  { id: 5, size: "20px" },
];

export default function FontsForm() {
  const { register } = useForm({
    defaultValues: {
      font: "Cairo",
      fontSize: "16px",
    },
  });

  return (
    <NestedPageLayout title="اختــار خــط">
      <div className="space-y-8 p-4">
        <div className="space-y-4">
          <label className="block text-lg font-medium">اختر الخط</label>
          <select
            {...register("font")}
            className="w-full p-2 border rounded-md bg-white"
          >
            {FONTS.map((font) => (
              <option key={font.id} value={font.name}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-medium">حجم الخط</label>
          <select
            {...register("fontSize")}
            className="w-full p-2 border rounded-md bg-white"
          >
            {FONT_SIZES.map((size) => (
              <option key={size.id} value={size.size}>
                {size.size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </NestedPageLayout>
  );
}
