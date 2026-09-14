import useFetch from "../../Hooks/useFetch";

const Logo = () => {
  const { data, error } = useFetch("http://localhost:5000/Logo");

  if (error) {
    return (
      <div className="h-7.5 px-3 rounded-md border border-red-200 bg-red-50 text-red-600 text-xs flex items-center">
        Logo failed to load
      </div>
    );
  }

  return (
    <div className="h-7.5">
      {data?.map((item) => (
        <img className="h-full" alt={item.alt} src={item.img} key={item.id} />
      ))}
    </div>
  );
};

export default Logo;