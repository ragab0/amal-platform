"use client";
import { useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { skillsSchema } from "@/validations/skills";
import FormInput from "@/components/formInput/FormInput";
import FormSelect from "@/app/cv/components/FormSelect";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";

const languageLevels = ["مبتدئ", "متوسط", "متقدم", "محترف"];

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const pageRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(skillsSchema),
    defaultValues: {
      languages: [],
      otherSkills: [],
    },
  });

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: "languages",
  });

  const {
    fields: otherSkillFields,
    append: appendOtherSkill,
    remove: removeOtherSkill,
  } = useFieldArray({
    control,
    name: "otherSkills",
  });

  function onSubmit(data) {
    if (editingId) {
      setSkills(
        skills.map((skill) =>
          skill.id === editingId ? { ...data, id: editingId } : skill
        )
      );
      setEditingId(null);
    } else {
      setSkills([...skills, { ...data, id: uuidv4() }]);
    }
    reset();
    setShowForm(false);
  }

  function handleDelete(id) {
    setSkills(skills.filter((skill) => skill.id !== id));
    if (skills.length === 1) {
      setTimeout(() => {
        setShowForm(true);
      }, 300);
    }
  }

  function handleEdit(skill) {
    setEditingId(skill.id);
    reset(skill);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingId(null);
    reset();
    setShowForm(false);
  }

  return (
    <div
      className="flex flex-col items-center w-full max-w-[800px] mx-auto"
      ref={pageRef}
      // style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
    >
      <h1 className="heading-big mt">المهـــــــــــــــــارات</h1>

      <AnimatePresence mode="wait">
        {/* Skills Form */}
        {showForm || skills.length === 0 ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-8"
            >
              {/* Description field */}
              <div className="space-y-8">
                <FormInput
                  must={true}
                  label="الوصف"
                  name="description"
                  register={register}
                  error={errors.description?.message}
                />
              </div>

              {/* Languages Section */}
              <div className="space-y-4">
                <h3 className="heading-h3 font-semibold">اللغــــــــات</h3>
                <div className="space-y-4">
                  {languageFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-2 gap-[10%] items-end"
                    >
                      <FormInput
                        must={true}
                        label="اللغة"
                        name={`languages.${index}.language`}
                        register={register}
                        error={errors.languages?.[index]?.language?.message}
                      />
                      <div className="flex gap-4">
                        <FormSelect
                          must={true}
                          label="المستوى"
                          name={`languages.${index}.level`}
                          register={register}
                          error={errors.languages?.[index]?.level?.message}
                          options={languageLevels}
                        />
                        <button
                          type="button"
                          onClick={() => removeLanguage(index)}
                          className="text-text hover:text-red-500 transition-colors h-[50px]"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => appendLanguage({ language: "", level: "" })}
                  className="btn-secondary-outline w-full"
                >
                  إضافة لغة
                </button>
              </div>

              {/* Interests Section */}
              <div className="space-y-4">
                <h3 className="heading-h3 font-semibold">الاهتمامــات</h3>
                <FormInput
                  must={true}
                  label="الوصف"
                  name="interests"
                  register={register}
                  error={errors.interests?.message}
                />
              </div>

              {/* Other Skills Section */}
              <div className="space-y-4">
                <h3 className="heading-h3 font-semibold">مهــــارات أخرى</h3>
                <div className="space-y-4">
                  {otherSkillFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-2 gap-[10%] items-end"
                    >
                      <FormInput
                        must={true}
                        label="المهارة"
                        name={`otherSkills.${index}.skill`}
                        register={register}
                        error={errors.otherSkills?.[index]?.skill?.message}
                      />
                      <div className="flex gap-4">
                        <FormSelect
                          must={true}
                          label="المستوى"
                          name={`otherSkills.${index}.level`}
                          register={register}
                          error={errors.otherSkills?.[index]?.level?.message}
                          options={languageLevels}
                        />
                        <button
                          type="button"
                          onClick={() => removeOtherSkill(index)}
                          className="text-text hover:text-red-500 transition-colors h-[50px]"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => appendOtherSkill({ skill: "", level: "" })}
                  className="btn-secondary-outline w-full"
                >
                  إضافة مهارة
                </button>
              </div>

              {/* Form Actions */}
              <div className="flex justify-center gap-4">
                <button type="submit" className="btn-secondary w-full">
                  {editingId ? "تحديث المهارات" : "إضافة المهارات"}
                </button>
                {skills.length > 0 && !editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn-secondary-outline w-full"
                  >
                    إلغاء
                  </button>
                )}
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn-secondary-outline w-full"
                  >
                    إلغاء
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <div className="w-full space-y-6">
              <AnimatePresence>
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="bg-white border border-text rounded-[6px] p-[24px_40px]"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-3 pb-5 border-b border-text">
                      <h3 className="heading-h3 font-semibold">المهارات</h3>
                      <div className="flex items-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => handleDelete(skill.id)}
                          className="text-text hover:text-red-500 transition-colors"
                        >
                          <DeleteIcon />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => handleEdit(skill)}
                          className="text-text hover:text-green-500 transition-colors"
                        >
                          <EditIcon />
                        </motion.button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="heading-h4 font-semibold mb-2">الوصف</h4>
                        <p className="text-text">{skill.description}</p>
                      </div>

                      {/* Languages */}
                      {skill.languages?.length > 0 && (
                        <div>
                          <h4 className="heading-h4 font-semibold mb-2">
                            اللغات
                          </h4>
                          <div className="space-y-2">
                            {skill.languages.map((lang, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between text-text"
                              >
                                <span>{lang.language}</span>
                                <span>{lang.level}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Interests */}
                      <div>
                        <h4 className="heading-h4 font-semibold mb-2">
                          الاهتمامات
                        </h4>
                        <p className="text-text">{skill.interests}</p>
                      </div>

                      {/* Other Skills */}
                      {skill.otherSkills?.length > 0 && (
                        <div>
                          <h4 className="heading-h4 font-semibold mb-2">
                            مهارات أخرى
                          </h4>
                          <div className="space-y-2">
                            {skill.otherSkills.map((other, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between text-text"
                              >
                                <span>{other.skill}</span>
                                <span>{other.level}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Add Skills Button */}
            <button
              onClick={() => {
                setEditingId(null);
                reset();
                setShowForm(true);
              }}
              className="btn-secondary w-full mt-8"
            >
              إضافة مهارات جديدة
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
