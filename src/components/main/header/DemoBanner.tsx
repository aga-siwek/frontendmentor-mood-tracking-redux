import { useAppSelector } from "@/store/store";

function DemoBanner() {
  const isDemo = useAppSelector((state) => state.auth.isDemo);

  if (!isDemo) return null;

  return (
    <div className="flex items-center justify-center gap-2 bg-accent-4 text-accent-1 text-[14px] font-medium leading-[1.4] tracking-[-0.2px] rounded-md px-4 py-2.5">
      <span className="size-2 rounded-full bg-accent-2 shrink-0" />
      Demo mode — all data will be deleted on logout.
    </div>
  );
}

export default DemoBanner;
