import { Setting } from "./Setting";

type PositionProps = {
  isMenuOpen: boolean;
};

export const Position: React.FC<PositionProps> = ({ isMenuOpen }) => {
  return (
    <Setting
      icon="position"
      label="Position"
      showLabel={isMenuOpen}
      onPress={() => {}}
    />
  );
};
