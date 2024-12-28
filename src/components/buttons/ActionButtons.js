import { motion } from "framer-motion";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { FaCopy, FaEdit, FaTrash } from "react-icons/fa";

export default function ActionButtons({
  onEdit = () => {},
  onDelete = () => {},
  onCopy = () => {},
  onMoveUp = () => {},
  onMoveDown = () => {},
  isFirst = null,
  isLast = null,
  isTwoColsNoEdit = false,
}) {
  return (
    <div
      className={`flex items-center justify-center gap-0 ${
        isTwoColsNoEdit ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`flex items-center justify-center gap-0 ${
          isTwoColsNoEdit ? " flex-col" : ""
        }`}
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          onClick={onDelete}
          className="text-text hover:text-red-500 p-2 transition-colors"
          title="حذف المهارة"
        >
          <FaTrash size={16} />
        </motion.button>
        {!isTwoColsNoEdit && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            onClick={onEdit}
            className="text-text hover:text-green-500 p-2 transition-colors"
            title="تعديل المهارة"
          >
            <FaEdit size={16} />
          </motion.button>
        )}
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          onClick={onCopy}
          className="text-text hover:text-green-500 p-2 transition-colors"
          title="نسخ المهارة"
        >
          <FaCopy size={16} />
        </motion.button>
      </div>
      <div className="flex flex-col">
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          onClick={onMoveUp}
          disabled={isFirst}
          className={`text-text hover:text-green-500 p-2 ${
            isFirst ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <FiArrowUp size={16} />
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          onClick={onMoveDown}
          disabled={isLast}
          className={`text-text hover:text-green-500 p-2 ${
            isLast ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <FiArrowDown size={16} />
        </motion.button>
      </div>
    </div>
  );
}
