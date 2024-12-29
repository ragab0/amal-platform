import MoreIcon from "@/assets/icons/MoreIcon";
import { HoverButton } from "@/components/motion/MotionWrappers";

export default function AddDescriptionBtn({ handleEdit, pageRef, item }) {
  function handleDescriptionClick() {
    handleEdit(item);
    setTimeout(() => {
      const t = pageRef.current.querySelector(".draft-editor");
      t?.querySelector(".public-DraftEditorPlaceholder-root")?.click();
      t?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  return (
    <HoverButton>
      <button
        onClick={handleDescriptionClick}
        className="flex items-center justify-center mx-auto gap-2 mt-6 text-text0"
      >
        <MoreIcon className="w-7 h-7 p-2 bg-text text-white rounded-full" />
        إضافة وصف
      </button>
    </HoverButton>
  );
}
