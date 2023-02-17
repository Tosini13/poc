/**
 * @todo answer:
 * what is the purpose?
 *
 * Lessons Learned:
 * - children passed between tags, when mapped, map takes a "," between them, so the array length is 4. When passed to array it's like an array (length = 2)
 * - purpose: to have consistent view, tight and clean code and easier testing with jest and snapshot testing
 */

type SubComponentsType = {
  SubComponent1: React.FC;
  SubComponent2: React.FC;
};

type MainComponentPropsType = {
  children: React.ReactNode[];
};

const colors = ["red", "blue"];

type MainComponentType = React.FC<MainComponentPropsType> & SubComponentsType;

const MainComponent: MainComponentType = ({ children }) => {
  console.log("children !log!", children);
  const x = children.map((child, i) => (
    <div key={i} style={{ color: colors[i] }}>
      {child}
    </div>
  ));

  return <div data-test-id="main_component">MainComponent{x}</div>;
};

type SubComponent1PropsType = {};

const SubComponent1: React.FC<SubComponent1PropsType> = ({}) => {
  return <div data-test-id="sub_component_1">SubComponent1</div>;
};
MainComponent.SubComponent1 = SubComponent1;

type SubComponent2PropsType = {};

const SubComponent2: React.FC<SubComponent2PropsType> = ({}) => {
  return <div data-test-id="sub_component_2">SubComponent2</div>;
};

MainComponent.SubComponent2 = SubComponent2;

type SubComponentsPropsType = {};

const SubComponents: React.FC<SubComponentsPropsType> = ({}) => {
  return (
    <div data-test-id="sub_components">
      <MainComponent
        children={[
          <MainComponent.SubComponent1 />,
          <MainComponent.SubComponent2 />,
        ]}
      />
    </div>
  );
};

export default SubComponents;
