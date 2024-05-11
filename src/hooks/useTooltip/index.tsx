import useExtraRender from "@hooks/useExtraRender";
import Tooltip from "./Tooltip";

export interface Content {
  title: string;
  key: string;
}
export interface tooltipOptions {
  menu: Content[];
  onSelect: (menuKey: string, key: string) => void;
}

const useTooltip = (options: tooltipOptions) => {
  const { generate, clear } = useExtraRender();

  const { menu, onSelect } = options;

  const show = (e: TouchEvent, key: string) => {
    // 先清空所有
    clear();
    // 再生成新的tooltip
    const { clientX, clientY } = e.touches[0];
    const styleOpt = {
      top: `${clientY}px`,
      left: `${clientX}px`,
    };
    generate(
      <Tooltip
        style={styleOpt}
        content={menu}
        onSelect={(menuKey: string) => onSelect(menuKey, key)}
      />
    );
  };

  return { show, clear };
};

export default useTooltip;
