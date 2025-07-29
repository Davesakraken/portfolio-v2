import {
  JavaScriptIcon,
  CssIcon,
  ReactIcon,
  TailwindIcon,
  NextIcon,
  MantineIcon,
  TypeScriptIcon,
} from "../icons";

interface IconProps {
  ref?: React.Ref<HTMLDivElement>;
}

export const TechStack = ({ ref }: IconProps) => {
  return (
    <div ref={ref} className="flex absolute right-0 top-0 gap-2">
      <JavaScriptIcon className="w-12 h-12 mb-4" />
      <TypeScriptIcon className="w-12 h-12 mb-4" />
      <CssIcon className="w-12 h-12 mb-4" />
      <ReactIcon className="w-12 h-12 mb-4" />
      <TailwindIcon className="w-12 h-12 mb-4" />
      <NextIcon className="w-12 h-12 mb-4" />
      <MantineIcon className="w-12 h-12 mb-4" />
    </div>
  );
};
