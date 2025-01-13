import CircleLoader from "@/components/loaders/CircleLoader";

export default function loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <CircleLoader />
    </div>
  );
}
