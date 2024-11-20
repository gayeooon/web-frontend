import logo from "@/assets/NewsFit.svg";

export default function Header() {
  return (
    <div className="flex justify-between pt-8 px-6">
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        <img src={logo} alt="back" className="w-full h-8" />
      </button>
    </div>
  );
}
