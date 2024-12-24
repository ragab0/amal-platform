import CircleLoader from "@/components/loaders/CircleLoader";

// absolute inset-0

export default function loading() {
  return (
    <div className="flex items-center justify-center py-[100px] min-w-[300px]">
      <CircleLoader />
    </div>
  );
}
