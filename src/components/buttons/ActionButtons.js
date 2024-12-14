import { motion } from "framer-motion";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";

export default function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={onDelete}
        className="text-text hover:text-red-500 transition-colors"
      >
        <DeleteIcon />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={onEdit}
        className="text-text hover:text-green-500 transition-colors"
      >
        <EditIcon />
      </motion.button>
    </div>
  );
}
