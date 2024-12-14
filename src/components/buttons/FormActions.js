export default function FormActions({
  onCancel,
  editingId,
  showCancelButton,
  submitText,
}) {
  return (
    <div className="flex justify-center gap-4">
      <button type="submit" className="btn-secondary w-full">
        {submitText}
      </button>
      {(showCancelButton || editingId) && (
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary-outline w-full"
        >
          إلغاء
        </button>
      )}
    </div>
  );
}
