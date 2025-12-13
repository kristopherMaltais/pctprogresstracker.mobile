import { Setting } from "./Setting";

type DirectionProps = {
  isMenuOpen: boolean;
};

export const Direction: React.FC<DirectionProps> = ({ isMenuOpen }) => {
  return (
    <Setting
      icon="direction"
      label="Direction"
      showLabel={isMenuOpen}
      onPress={() => {}}
    />
  );
};
