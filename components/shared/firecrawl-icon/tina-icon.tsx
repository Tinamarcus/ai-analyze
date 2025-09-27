import { HTMLAttributes } from "react";

export default function TinaIcon({
  fill = "var(--tina-primary-100)",
  innerFillColor = "var(--background-base)",
  ...attrs
}: HTMLAttributes<HTMLOrSVGElement> & {
  innerFillColor?: string;
  fill?: string;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center" {...attrs}>
      <div className="w-16 h-16 bg-gradient-to-br from-tina-primary-100 to-tina-secondary rounded-xl flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-2xl">T</span>
      </div>
    </div>
  );
}
