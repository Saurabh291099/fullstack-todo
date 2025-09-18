import React from "react";

import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";

interface DropdownProps {
  items: MenuProps["items"];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const DropdownButton: React.FC<DropdownProps> = ({
  items,
  value,
  onChange,
  placeholder = "Select",
}) => {
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    onChange?.(e.key);
  };

  const selectedItem = items?.find((item) => item?.key === value);
  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }}>
      <Button className="!justify-between">
        {selectedItem?.key || placeholder}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};
export default DropdownButton;
