"use client";
import NestedPageLayout from "../../components/NestedPageLayout";

const COLORS = [
  { id: 1, hex: "#461887" },
  { id: 2, hex: "#33D38E" },
  { id: 3, hex: "#F1EDF6" },
];

export default function ColorsForm() {
  return (
    <NestedPageLayout title="اختــار لــون">
      <div className="flex flex-wrap gap-4 p-4">
        {COLORS.map((color) => (
          <div
            key={color.id}
            className="w-12 h-12 rounded-full cursor-pointer border-2 border-transparent hover:border-second transition-colors"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </NestedPageLayout>
  );
}
