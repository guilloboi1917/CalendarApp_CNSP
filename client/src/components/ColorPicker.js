

import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

//Available colors
const COLORS = ["#711DB0", "#E4B1F0", "#C21292", "#EF4040", "#FFA732"];

const ColorCircle = styled(Box)(({ color, selected }) => ({
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: color,
    scale: selected ? "1.2" : "1",
    border: selected ? "1px black solid" : "1px black transparent",
    cursor: "pointer",
    transition: "border 0.2s",
}));

// ColorPicker component
function ColorPicker({ selectedColor, onColorSelect }) {
    return (
        <Box sx={{ display: "flex", gap: 1 }}>
            {COLORS.map((color) => (
                <ColorCircle
                    key={color}
                    color={color}
                    selected={selectedColor === color}
                    onClick={() => onColorSelect(color)}
                />
            ))}
        </Box>
    );
}

export default ColorPicker;