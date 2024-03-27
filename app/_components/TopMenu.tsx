import RowWrapper from "./wrappers/RowWrapper";

const TopMenu = () => {
  return (
    <nav className="relative">
      <div className="bg-color-dark fixed flex w-full items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* Left icons */}
          <Icon />
          <Icon />
          <Icon />
          <Icon />
          <Icon />
          <Icon />
          <Icon />
        </div>
        <div className="flex items-center space-x-4">
          {/* Right icons */}
          <Icon />
          <Icon />
        </div>
      </div>
    </nav>
  );
};

const Icon: React.FC = () => {
  return <div className="h-8 w-8 rounded-full bg-gray-400"></div>;
};

export default TopMenu;
