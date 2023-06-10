import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const SearchToggle = () => {
    const [displayInput, setDisplayInput] = useState(false);
    return (
        <>
    
        <Box color="primary" sx={{
            backgroundColor: displayInput ? "white" : "transparent",
            borderRadius: "28px",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            paddingLeft: "1rem",
            }}>
        <SearchIcon fontSize="medium" color="primary" 
            onClick={()=>setDisplayInput(!displayInput)}/>
        <TextField variant="standard"  
            sx={{ 
                marginRight: "1rem",
                display: displayInput ? "block" : "none"
            }}
            InputProps={{
                disableUnderline: true,
            }}
        />
        </Box> 
        

        </>
    );
}

export default SearchToggle;