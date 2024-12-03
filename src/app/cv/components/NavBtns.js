/* Navigation Buttons */

export default function NavBtns() {
  return (
    <div className="flex justify-center max-md:flex-col-reverse gap-[60px] mt-[60px] mb-[120px] clear-both">
      <button
        type="button"
        className="btn-secondary btn-secondary-makeMain mx-0 min-w-[200px] max-md:w-full"
      >
        التــالي
      </button>
      <button
        type="button"
        className="btn-secondary-outline mx-0 min-w-[200px] max-md:w-full"
      >
        رجــوع
      </button>
    </div>
  );
}
