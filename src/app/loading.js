import CircleLoader from "@/components/loaders/CircleLoader";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <CircleLoader />
    </div>
  );
}
