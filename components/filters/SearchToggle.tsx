import { useState, useRef } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// TODO
// 1. autofocus input after clicking icon
// 2. style the filters
// 3. filter container spacing
// 4. filter container mobile view

const SearchToggle = () => {
    const [displayInput, setDisplayInput] = useState(false);
    const [query, setQuery] = useState('');
    const textInput = useRef(null);

    return (
        <Box color="primary" sx={{
            backgroundColor: "white",
            borderRadius: "28px",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            paddingLeft: "1rem",
            }}>
        <SearchIcon fontSize="medium" color="primary" 
            onClick={()=>{
                textInput.current.focus();
                setDisplayInput(!displayInput)
                }
            }/>
        <TextField variant="standard" 
            inputRef={textInput}
            sx={{ 
                // display: displayInput ? "block" : "none"
            }}
            InputProps={{
                disableUnderline: true,
            }}
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
        />
        {/* <CloseIcon fontSize="medium" color="primary"
            sx={{ 
                display: displayInput ? "block" : "none",
                visibility: query.length > 0 ? "visible" : "hidden",
                marginRight: "1rem",
            }} 
            onClick={()=>{
                setQuery('');
                setDisplayInput(false);
                }
            }/> */}
        </Box> 
    );
}

export default SearchToggle;