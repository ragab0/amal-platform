"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { volunteeringSchema } from "@/validations/cv/volunteeringSchema";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { updateCV } from "@/store/features/cvs/cvsThunks";
import { toast } from "react-toastify";
import { HoverCvPreviewCard } from "@/components/motion/MotionWrappers";
import FormActions from "@/components/buttons/FormActions";
import AddButton from "@/components/buttons/AddButton";
import ActionButtons from "@/components/buttons/ActionButtons";
import FormInput from "@/components/formInput/FormInput";
import DraftEditor from "../components/draft/DraftEditor";
import DraftPreview from "../components/draft/DraftPreview";
import getLocalDate from "@/utils/getLocalDate";
import AddDescriptionBtn from "../components/AddDescriptionBtn";

export default function Volunteering() {
  const dispatch = useAppDispatch();
  const [editingId, setEditingId] = useState(null);
  const pageRef = useRef(null);
  const {
    myCV: { volunteers = [] },
    loading,
  } = useAppSelector((state) => state.cvs);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(volunteeringSchema),
  });

  async function handleDelete(targetId) {
    const updatedVolunteers = volunteers.filter(
      (volunteer) => volunteer._id !== targetId
    );
    const { payload, error } = await dispatch(
      updateCV({ volunteers: updatedVolunteers })
    );

    if (!error && payload?.status === "success") {
      toast.success("تم حذف العمل التطوعي بنجاح");
    } else {
      toast.error("فشل حذف العمل التطوعي");
    }
  }

  function handleEdit(volunteer) {
    setEditingId(volunteer._id);
    reset({
      ...volunteer,
      startDate: getLocalDate(volunteer.startDate),
      endDate: getLocalDate(volunteer.endDate),
    });
  }

  function handleCancel() {
    setEditingId(null);
    reset();
  }

  async function onSubmit(data) {
    let updatedVolunteers;
    if (editingId) {
      updatedVolunteers = volunteers.map((volunteer) =>
        volunteer._id === editingId ? { ...volunteer, ...data } : volunteer
      );
    } else {
      updatedVolunteers = [...volunteers, data];
    }

    const { payload, error } = await dispatch(
      updateCV({ volunteers: updatedVolunteers })
    );

    if (!error && payload?.status === "success") {
      setEditingId(null);
      reset();
      toast.success(
        editingId
          ? "تم تحديث العمل التطوعي بنجاح"
          : "تمت إضافة العمل التطوعي بنجاح"
      );
    } else {
      toast.error("فشل حفظ العمل التطوعي");
    }
  }

  function handleCopy(volunteer) {
    const newVolunteer = { ...volunteer, _id: undefined };
    const updatedVolunteers = [
      ...volunteers.slice(0, volunteers.indexOf(volunteer) + 1),
      newVolunteer,
      ...volunteers.slice(volunteers.indexOf(volunteer) + 1),
    ];

    dispatch(updateCV({ volunteers: updatedVolunteers }));
  }

  function handleMove(direction, currentIndex) {
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (
      (direction === "up" && currentIndex > 0) ||
      (direction === "down" && currentIndex < volunteers.length - 1)
    ) {
      const updatedVolunteers = [...volunteers];
      const temp = updatedVolunteers[currentIndex];
      updatedVolunteers[currentIndex] = updatedVolunteers[newIndex];
      updatedVolunteers[newIndex] = temp;

      dispatch(updateCV({ volunteers: updatedVolunteers }));
    }
  }

  const showForm = volunteers.length === 0 || editingId !== null;

  return (
    <div
      className="flex flex-col items-center w-full max-w-[800px] mx-auto"
      ref={pageRef}
      style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
    >
      <h1 className="heading-big">الأعمال التطوعية</h1>
      {!showForm && (
        <>
          {/* Volunteers Cards */}
          <div className="w-full space-y-6">
            <AnimatePresence mode="sync">
              {volunteers.map((volunteer, index) => (
                <HoverCvPreviewCard key={volunteer._id} index={index}>
                  {/* Header */}
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="heading-h3 font-semibold">
                      {volunteer.title}
                    </h3>
                    <ActionButtons
                      onDelete={() => handleDelete(volunteer._id)}
                      onEdit={() => handleEdit(volunteer)}
                      onCopy={() => handleCopy(volunteer)}
                      onMoveUp={() => handleMove("up", index)}
                      onMoveDown={() => handleMove("down", index)}
                      isFirst={index === 0}
                      isLast={index === volunteers.length - 1}
                    />
                  </div>

                  {/* Info */}
                  <div className="pb-5 border-b border-text">
                    <div className="flex items-center gap-4 text-text">
                      <time>
                        {volunteer.startDate &&
                          getLocalDate(volunteer.startDate)}{" "}
                        <span className="mx-2">-</span>
                        {volunteer.endDate && getLocalDate(volunteer.endDate)}
                      </time>
                    </div>
                  </div>

                  {/* Description or Add Details Button */}
                  {volunteer.description ? (
                    <div className="mt-6 text-text">
                      <DraftPreview
                        title="وصف العمل التطوعي"
                        source={volunteer.description}
                      />
                    </div>
                  ) : (
                    <AddDescriptionBtn
                      pageRef={pageRef}
                      handleEdit={handleEdit}
                      item={volunteer}
                    />
                  )}
                </HoverCvPreviewCard>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Volunteer Button */}
          <AddButton
            onClick={() => setEditingId(0)}
            text="إضافة عمل تطوعي جديد"
          />
        </>
      )}

      {/* Volunteer Form */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          {/* Single column fields */}
          <div className="space-y-8">
            <FormInput
              must={true}
              label="عنوان العمل التطوعي"
              name="title"
              register={register}
              error={errors.title?.message}
            />
          </div>

          {/* Two column fields */}
          <div className="grid sm:grid-cols-2 gap-[10%]">
            <FormInput
              must={true}
              label="تاريخ البداية"
              type="date"
              name="startDate"
              register={register}
              error={errors.startDate?.message}
              spaceBlock={false}
            />
            <FormInput
              must={true}
              label="تاريخ النهاية"
              type="date"
              name="endDate"
              register={register}
              error={errors.endDate?.message}
              spaceBlock={false}
            />
          </div>

          {/* Description field */}
          <DraftEditor
            name="description"
            control={control}
            error={errors.description?.message}
            placeholder="اكتب وصفاً مختصراً عن العمل التطوعي..."
            aiPrompt={{
              type: "volunteering",
              data: {
                title: watch("title"),
                startDate: watch("startDate"),
                endDate: watch("endDate"),
              },
            }}
          />

          {/* Form Actions */}
          <FormActions
            editingId={editingId}
            onCancel={handleCancel}
            showCancelButton={volunteers.length > 0}
            submitText={
              editingId ? "تحديث العمل التطوعي" : "إضافة عمل تطوعي جديد"
            }
          />
        </form>
      )}
    </div>
  );
}
