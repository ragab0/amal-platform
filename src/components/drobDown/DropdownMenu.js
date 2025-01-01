"use client";

export default function DropdownMenu({
  trigger,
  children,
  menuClassName = "",
  menuWrapperCls = "",
}) {
  return (
    <div className={`drop-down-menu relative group !mx-0`}>
      {trigger}
      <div
        className={`absolute top-full z-[101] left-0 hidden group-hover:block ${menuWrapperCls}`}
      >
        <div
          className={`mt-3 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${menuClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
