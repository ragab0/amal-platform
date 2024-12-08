"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Modal from "@/components/modals/ConfirmModal";

export default function ProfileImg() {
  const [profileImage, setProfileImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingImage, setPendingImage] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPendingImage(reader.result);
        setIsImageChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    setIsModalOpen(true);
  };

  const handleImageSave = () => {
    if (pendingImage) {
      setProfileImage(pendingImage);
      setPendingImage(null);
      setIsModalOpen(false);
      setIsImageChanged(false);
    }
  };

  const handleModalClose = () => {
    setPendingImage(null);
    setIsModalOpen(false);
    setIsImageChanged(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative mx-auto w-[218px] h-[218px] bg-[#33D38E] bg-opacity-25 rounded-full flex items-center justify-center mb-4 group">
        {profileImage || pendingImage ? (
          <div
            className="absolute inset-0 rounded-full overflow-hidden group"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              src={pendingImage || profileImage}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
            <div className="absolute inset-0 group-hover:bg-[#33d38e] group-hover:bg-opacity-30 cursor-pointer transition-all duration-300 flex items-center justify-center">
              <span className="text-5xl text-white opacity-0 group-hover:opacity-100 transition-opacity">
                +
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full bg-white bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-70 transition-all duration-300">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profile-image-upload"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <label
              htmlFor="profile-image-upload"
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
            >
              <span className="text-6xl text-[#33D38E]">+</span>
            </label>
          </div>
        )}
      </div>
      {isImageChanged && (
        <button
          className="text-[#33D38E] font-bold hover:underline mb-4"
          onClick={handleSaveClick}
        >
          تأكيد الصورة
        </button>
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title="تأكيد الحفظ"
          message="هل أنت متأكد من رغبتك في حفظ الصورة؟"
          confirmText="نعم، أريد الحفظ"
          cancelText="إلغاء"
          onConfirm={handleImageSave}
        />
      )}
    </div>
  );
}
