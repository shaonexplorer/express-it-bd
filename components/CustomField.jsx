function CustomField({ label }) {
  return (
    <label className="flex flex-col gap-[8px]">
      <p className="text-[15px] font-semibold text-[#333333]">
        Give your online store a name
      </p>
      <input
        type="text"
        className="w-full px-[15px] py-[8px] border border-[#DDDDDD] bg-white rounded-[8px] outline-none"
      ></input>
    </label>
  );
}

export default CustomField;
