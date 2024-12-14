import MoreIcon from "@/assets/icons/MoreIcon";

export default function AddButton({ onClick, text }) {
  return (
    <button
      onClick={onClick}
      className="btn-secondary w-full flex items-center justify-center gap-2 mt-8 text-xl"
    >
      <MoreIcon className="w-7 h-7 p-2 bg-white text-second rounded-full" />
      {text}
    </button>
  );
}
