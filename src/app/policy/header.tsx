"use client";
import React from "react";
import { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import styled from "@emotion/styled";

interface PolicyHeaderProps {
  title: string;
  titleHighlightColor?: string;
  dateList: Array<string>;
  dateListIndex: number;
  setDateListIndex: Function;
}
export const PolicyHeader: React.FC<PolicyHeaderProps> = ({
  title,
  titleHighlightColor,
  dateList,
  dateListIndex,
  setDateListIndex,
}) => {
  const [anchorEl, setAnchorEl]: [null | HTMLElement, Function] =
    useState<null | HTMLElement>(null);

  const isDateListOpen: boolean = Boolean(anchorEl);

  const handleDateListButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setDateListIndex(index);
    setAnchorEl(null);
  };

  const handleDateListClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Header>
        <Highlight titleHighlightColor={titleHighlightColor}>{title}</Highlight>
      </Header>
      <DateMenu>
        <Button
          variant="outlined"
          endIcon={
            <>
              {isDateListOpen ? (
                <ArrowDropUpIcon style={{ color: "black" }} />
              ) : (
                <ArrowDropDownIcon style={{ color: "black" }} />
              )}
            </>
          }
          onClick={handleDateListButtonClick}
          style={{ color: "black", borderColor: "black" }}
        >
          {dateList[dateListIndex]}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={isDateListOpen}
          onClose={handleDateListClose}
        >
          {dateList?.map((option: string, index: number) => (
            <MenuItem
              key={index}
              selected={index === dateListIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
              style={{ color: "black" }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </DateMenu>
      <hr style={{ marginBottom: "1rem" }} />
    </>
  );
};

const Header = styled.div`
  font-weight: bold;
  font-size: 28px;
  word-break: keep-all;
  margin-top: 20px;
  margin-bottom: 24px;
`;

interface HighlightProps {
  titleHighlightColor?: string;
}
const Highlight = styled.span<HighlightProps>`
  font-weight: bold;

  display: inline;

  box-shadow: ${(props) =>
    `inset 0 -1.2rem 0 ${props.titleHighlightColor}` || "none"};
`;

const DateMenu = styled.div`
  width: 150px;
  height: 50px;
`;
