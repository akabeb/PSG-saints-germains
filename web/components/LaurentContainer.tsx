import { laurentContainerClass } from "@/lib/laurent-layout";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function LaurentContainer({ children, className = "" }: Props) {
  return (
    <div className={`${laurentContainerClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
