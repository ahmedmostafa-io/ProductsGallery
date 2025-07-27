import errorImg from "../assets/3737258.jpg";
export default function Error({ error, className }) {
  return (
    <div className="flex flex-col items-center justify-center ">
      <img src={errorImg} alt="error image" className={className} />
      <h1 className="text-3xl text-center mt-4 text-blue-300 ">*{error}</h1>
    </div>
  );
}
