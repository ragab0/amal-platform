import MoreIcon from "@/assets/icons/MoreIcon";

export default function AddButton({
  onClick,
  text,
  isLight = false,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn-secondary w-full flex items-center justify-center gap-2 mt-8 text-xl ${
        isLight ? "bg-text text-white hover:bg-text-stroke" : ""
      } ${className}`}
    >
      <MoreIcon
        className={`w-7 h-7 p-2 bg-white ${
          isLight ? "text-text" : "text-second"
        } rounded-full`}
      />
      {text}
    </button>
  );
}
