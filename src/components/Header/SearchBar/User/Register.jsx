import register from "../../../../assets/images/Header/SearchBar/register.svg";
const Register = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      <button className="border border-gray-300 rounded-lg py-2 px-4 flex justify-center items-center  ">
        <img src={register} alt="" className="ml-2" />
        <span className="  text-xs">ورود</span>
        <hr className="h-3 border-x mx-1" />
        <span className="  text-xs">ثبت‌‌نام</span>
      </button>
      <hr className="h-6 border-x border-[#e0e0e2]" />
    </div>
  );
};

export default Register;
