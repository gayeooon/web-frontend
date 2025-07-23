import IcNewsFit from '@/assets/IcNewsFit';

export default function Header() {
  return (
    <div className="flex justify-between pt-8 px-6">
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        <IcNewsFit sm />
      </button>
    </div>
  );
}
