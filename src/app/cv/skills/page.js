"use client";
import DraftEditor from "../components/draft/DraftEditor";
import FormSelect from "@/components/formSelect/FormSelect";
import FormInput from "@/components/formInput/FormInput";
import ActionButtons from "@/components/buttons/ActionButtons";
import AddButton from "@/components/buttons/AddButton";
import { useForm, useFieldArray } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { updateCV } from "@/store/features/cvs/cvsThunks";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { skillsSchema } from "@/validations/cv/skillsSchema";
import { AnimatePresence } from "framer-motion";
import { SkillCvPreviewCard } from "@/components/motion/MotionWrappers";

const defaultSkills = {
  description: "",
  interests: "",
  languages: [{}, {}],
  softSkills: [{}, {}],
};

const defaultSkillsOptions = [
  { name: "", levelText: "خبير", levelPercentage: 100 },
  { name: "", levelText: "متقدم", levelPercentage: 80 },
  { name: "", levelText: "متوسط", levelPercentage: 60 },
  { name: "", levelText: "مبتدئ", levelPercentage: 40 },
  { name: "", levelText: "معرفة سطحية", levelPercentage: 20 },
  { name: "", levelText: "أخري", levelPercentage: 0 },
];

export default function SkillsPage() {
  const dispatch = useAppDispatch();
  const {
    myCV: { allSkills = {} },
    loading,
  } = useAppSelector((state) => state.cvs);

  const {
    control,
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(skillsSchema),
    defaultValues: {
      description: allSkills.description || defaultSkills.description,
      interests: allSkills.interests || defaultSkills.interests,
      languages: allSkills.languages?.length
        ? allSkills.languages
        : defaultSkills.languages,
      softSkills: allSkills.softSkills?.length
        ? allSkills.softSkills
        : defaultSkills.softSkills,
    },
  });

  const {
    fields: languageFields,
    append: appendLanguage,
    insert: insertLanguage,
    remove: removeLanguage,
    move: moveLanguage,
  } = useFieldArray({
    control,
    name: "languages",
  });

  const {
    fields: softSkillFields,
    append: appendSoftSkill,
    insert: insertSoftSkill,
    remove: removeSoftSkill,
    move: moveSoftSkill,
  } = useFieldArray({
    control,
    name: "softSkills",
  });

  async function onSubmit(data) {
    // Handle percentage values based on selected skill level
    const processSkills = (skills) =>
      skills.map((skill) => {
        const level = defaultSkillsOptions.find(
          (l) => l.levelText === skill.levelText
        );
        return {
          ...skill,
          levelPercentage: level?.levelPercentage || 100,
        };
      });

    const processedData = {
      ...data,
      languages: processSkills(data.languages),
      softSkills: processSkills(data.softSkills),
    };

    const { payload, error } = await dispatch(
      updateCV({
        allSkills: processedData,
      })
    );

    if (!error && payload?.status === "success") {
      toast.success("تم حفظ المهارات بنجاح");
    } else {
      toast.error("فشل حفظ المهارات");
    }
  }

  const handleCopy = (index, fieldName, insert) => {
    const values = getValues(fieldName);
    const targetValue = values[index];

    const copiedValue = {
      ...targetValue,
      name: targetValue.name || "",
      levelText: targetValue.levelText || defaultSkillsOptions[0].levelText,
      levelPercentage: targetValue.levelPercentage || 100,
    };

    insert(index + 1, copiedValue, { shouldFocus: true });
  };

  const handleMove = (index, direction, fieldName, move) => {
    const values = getValues(fieldName);
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (
      (direction === "up" && index > 0) ||
      (direction === "down" && index < values.length - 1)
    ) {
      move(index, newIndex);
    }
  };

  const renderSkillField = (key, index, fieldName, remove, insert, move) => {
    const currentValues = getValues(fieldName);
    const currentSkill = currentValues[index];
    const currentLevelText = currentSkill?.levelText || "";

    return (
      <SkillCvPreviewCard key={key}>
        <FormInput
          label={"الاسم"}
          name={`${fieldName}.${index}.name`}
          register={register}
          error={errors[fieldName]?.[index]?.name?.message}
          spaceBlock={false}
        />
        <FormSelect
          label={"المستوى"}
          name={`${fieldName}.${index}.levelText`}
          register={register}
          spaceBlock={false}
          options={defaultSkillsOptions.map((option) => option.levelText)}
          defaultOption={currentLevelText || "اختر المستوى"}
        />
        <ActionButtons
          onDelete={() => remove(index)}
          onCopy={() => handleCopy(index, fieldName, insert)}
          onMoveDown={() => handleMove(index, "down", fieldName, move)}
          onMoveUp={() => handleMove(index, "up", fieldName, move)}
          isTwoColsNoEdit={true}
          isFirst={index === 0}
          isLast={index === getValues(fieldName).length - 1}
        />
      </SkillCvPreviewCard>
    );
  };

  return (
    <div
      className="flex flex-col items-center w-full max-w-[800px] mx-auto"
      style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
    >
      <h1 className="heading-big">المهــــــــــــــارات</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
        {/* Description Fields */}
        <div className="space-y-8">
          <DraftEditor
            title="الوصف العام"
            name="description"
            control={control}
            error={errors.description?.message}
            placeholder="اكتب وصفاً عاماً عن مهاراتك..."
            aiPrompt={{
              type: "skillsGeneralDesc",
              data: {
                languageFields,
                softSkillFields,
              },
            }}
          />
          <DraftEditor
            title="الاهتمامات"
            name="interests"
            control={control}
            error={errors.interests?.message}
            placeholder="اكتب عن اهتماماتك..."
            aiPrompt={{
              type: "interests",
              data: {
                languageFields,
                softSkillFields,
              },
            }}
          />
        </div>
        {/* Separator */}
        <div className="w-full h-px bg-gray-200 space-8"></div>
        {/* Skills Fields */}
        <div className="space-y-8">
          {/* Languages */}
          <div className="space-y-4">
            <h3 className="heading-h3 font-bold text-center text-second">
              اللغـــــــــــات
            </h3>
            <AnimatePresence mode="sync">
              {languageFields.map((field, index) =>
                renderSkillField(
                  field.id,
                  index,
                  "languages",
                  removeLanguage,
                  insertLanguage,
                  moveLanguage
                )
              )}
            </AnimatePresence>
            <AddButton
              text="اضافة لغة جديدة"
              onClick={() => appendLanguage({})}
              isLight={true}
              className=" relative z-0"
            />
          </div>

          {/* Soft Skills */}
          <div className="space-y-4">
            <h3 className="heading-h3 font-bold text-center text-second">
              المهارات الشخصية
            </h3>
            <AnimatePresence mode="sync">
              {softSkillFields.map((field, index) =>
                renderSkillField(
                  field.id,
                  index,
                  "softSkills",
                  removeSoftSkill,
                  insertSoftSkill,
                  moveSoftSkill
                )
              )}
            </AnimatePresence>
            <AddButton
              text="اضافة مهارة جديدة"
              onClick={() => appendSoftSkill({})}
              isLight={true}
              className=" relative z-0"
            />
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn-primary w-full !mt-16 block">
          حفظ المهارات
        </button>
      </form>
    </div>
  );
}
