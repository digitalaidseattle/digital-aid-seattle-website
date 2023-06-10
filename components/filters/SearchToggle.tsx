import { useState, useEffect, useRef } from "react";
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

    // useRef to target the TextField input, so we can make it auto-focus.
    const textInput = useRef(null);

    // For setting the ref to the TextField when it appears in the DOM.
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (displayInput) {
          timeout = setTimeout(() => {
            textInput.current?.focus();
          });
        }
        return () => {
          if (timeout) {
            clearTimeout(timeout);
          }
        };
      }, [displayInput]);

    return (
        <Box color="primary" sx={{
            backgroundColor: displayInput ? "white" : "transparent",
            borderRadius: "28px",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            paddingLeft: "1rem",
            }}>
        <SearchIcon fontSize="medium" color="primary" 
            onClick={()=>{
                setDisplayInput(!displayInput)
                }
            }/>
        {displayInput &&
            <>
            <TextField variant="standard" 
                inputRef={textInput}
                InputProps={{
                    disableUnderline: true,
                }}
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
            />
            <CloseIcon fontSize="medium" color="primary"
                sx={{ 
                    opacity: query.length > 0 ? "100%" : "0",
                    marginRight: "1rem",
                    transition: "opacity 0.1s ease-in-out"
                }} 
                onClick={()=>{
                    setQuery('');
                    setDisplayInput(false);
                    }
                }/>
            </>
        }
        </Box> 
    );
}

export default SearchToggle;