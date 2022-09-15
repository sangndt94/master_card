// (C) 2020 GoodData Corporation
import React from "react";
import { shallow, mount } from "enzyme";
import ContextMenu, {
    TriggerButton,
    MenuItem,
    MenuList,
    IMenuItemProps,
    IMenuListProps,
    MenuDropdown,
    IContextMenuProps,
    ITriggerButtonProps,
} from "../ContextMenu";
import Button from "../Button";
import Typography from "../../utils/Typography";
import noop from "lodash/noop";

describe("TriggerButton", () => {
    it("should render a Button component and pass it color, activeColor, active props", () => {
        const propsToPass: ITriggerButtonProps = {
            active: true,
            color: "positive",
            colorAcive: "negative",
        };
        const wrapper = shallow(<TriggerButton {...propsToPass} />);
        expect(wrapper.find(Button).exists()).toBe(true);
        expect(wrapper.find(Button).props()).toMatchObject(propsToPass);
    });
});

describe("MenuItem", () => {
    it("should render a Typography element with Component={Button}, pass it className and onClick and children props", () => {
        const onClick = jest.fn();
        const wrapper = shallow(
            <MenuItem onClick={onClick} className="abc">
                ABC
            </MenuItem>,
        );
        expect(wrapper.find(Typography).exists()).toBe(true);
        expect(wrapper.find(Typography).prop("className").includes("abc")).toBe(true); // className contains extra generated className on top of the one passed by props
        expect(wrapper.find(Typography).props()).toMatchObject({
            onClick,
            children: "ABC",
        });
    });
    it("should fire an onClick callback on click", () => {
        const onClick = jest.fn();
        const wrapper = mount(<MenuItem onClick={onClick}>ABC</MenuItem>);
        wrapper.find("button").simulate("click");
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});

describe("MenuList", () => {
    it("should render a list of Item elements and pass them label, onClick props", () => {
        const onClick = jest.fn();
        const items = [
            {
                label: "Item 1",
                onClick: noop,
            },
            {
                label: "Item 2",
                onClick,
            },
        ];
        const Item: React.FC<IMenuItemProps> = ({ children, onClick }) => (
            <button onClick={onClick}>{children}</button>
        );
        const wrapper = shallow(<MenuList items={items} Item={Item} />);
        expect(wrapper.find(Item).length).toBe(2);
        const secondItemElement = wrapper.find(Item).at(1);
        expect(secondItemElement.exists()).toBe(true);
        expect(secondItemElement.props()).toMatchObject({
            onClick,
            children: "Item 2",
        });
        secondItemElement.simulate("click");

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});

describe("MenuDropdown", () => {
    it("should render a List component and pass it items prop", () => {
        const items = [
            {
                label: "Item 1",
                onClick: noop,
            },
            {
                label: "Item 2",
                onClick: noop,
            },
        ];
        const List: React.FC<IMenuListProps> = ({ items }) => <div>{items.length}</div>;
        const wrapper = shallow(<MenuDropdown items={items} List={List} />);
        const listWrapper = wrapper.find(List);
        expect(listWrapper.exists()).toBe(true);
        expect(listWrapper.prop("items")).toBe(items);
    });
});

describe("MenuDropdown", () => {
    it("should render a List component and pass it items prop", () => {
        const items = [
            {
                label: "Item 1",
                onClick: noop,
            },
            {
                label: "Item 2",
                onClick: noop,
            },
        ];
        const List: React.FC<IMenuListProps> = ({ items }) => <div>{items.length}</div>;
        const wrapper = shallow(<MenuDropdown items={items} List={List} />);
        const listWrapper = wrapper.find(List);
        expect(listWrapper.exists()).toBe(true);
        expect(listWrapper.prop("items")).toBe(items);
    });
});

describe("ContextMenu", () => {
    const items = [
        {
            label: "Item 1",
            onClick: noop,
        },
        {
            label: "Item 2",
            onClick: noop,
        },
    ];
    const Trigger: IContextMenuProps["Trigger"] = ({ children, onClick }) => (
        <button onClick={onClick}>{children}</button>
    );
    const Dropdown: IContextMenuProps["Dropdown"] = ({ items }) => (
        <div>
            {items.map(({ id, label, onClick }, itemIndex) => (
                <MenuItem key={id || itemIndex} onClick={onClick}>
                    {label}
                </MenuItem>
            ))}
        </div>
    );
    it("should render a Trigger that toggles a Dropdown on click", () => {
        const wrapper = shallow(<ContextMenu Trigger={Trigger} Dropdown={Dropdown} items={items} />);

        const triggerWrapper = wrapper.find(Trigger);
        expect(triggerWrapper.exists()).toBe(true);

        expect(wrapper.find(Dropdown).exists()).toBe(false);

        triggerWrapper.simulate("click");
        expect(wrapper.find(Dropdown).exists()).toBe(true);

        triggerWrapper.simulate("click");
        expect(wrapper.find(Dropdown).exists()).toBe(false);
    });
    it("should render Dropdown if initialIsOpen is true and close the Dropdown on Item click", () => {
        const onClick = jest.fn();
        const items = [
            {
                label: "Item 1",
                onClick: noop,
            },
            {
                label: "Item 2",
                onClick,
            },
        ];
        const wrapper = mount(
            <ContextMenu Trigger={Trigger} Dropdown={Dropdown} items={items} initialIsOpen />,
        );

        expect(wrapper.find(Dropdown).exists()).toBe(true);

        wrapper.find(Dropdown).find(MenuItem).at(1).simulate("click");
        expect(wrapper.find(Dropdown).exists()).toBe(false);
    });
});
