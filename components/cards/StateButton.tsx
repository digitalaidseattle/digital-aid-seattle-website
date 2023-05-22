import { Button } from "@mui/material";

type StateButtonProps = {
    state: "active" | "recruiting" | "complete"
}

const StateButton = ({state}: StateButtonProps) => {
    const bgColor = state === "active" ? "#FFFAD8" : state === "recruiting" ? "#DDFFAF" : "#FFF0EE";
    return (
        <Button sx={{
            textTransform: "capitalize", 
            backgroundColor: bgColor,
            padding: "10px 12px",
            fontSize: "14px"
            }}>
            {state}
        </Button>
    );
}

export default StateButton;