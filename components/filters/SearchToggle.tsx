import { useState, useEffect, useRef } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button/Button";
// TODO
// [x] autofocus input after clicking icon
// [ ] style the filters
// [ ] filter container spacing
// [ ] filter container mobile view

const SearchToggle = () => {
    const MOBILE_BREAKPOINT = 600;
    const [displayInput, setDisplayInput] = useState(window.innerWidth < MOBILE_BREAKPOINT);
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

      // For making the search bar visible on small screens.
      const handleResize = () => {
        if (window.innerWidth < MOBILE_BREAKPOINT) {
            setDisplayInput(true)
        } else {
            setDisplayInput(false)
        }
      }
  
      useEffect(() => {
        window.addEventListener("resize", handleResize)
      })

    return (
        <Box color="primary" sx={{
            backgroundColor: displayInput ? "white" : "transparent",
            borderRadius: "28px",
            display: "flex",
            alignItems: "center",
            }}>
            <Button onClick={()=>setDisplayInput(!displayInput)}>
                <SearchIcon fontSize="medium" color="primary"/>
            </Button>
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
            <Button sx={{ 
                    visibility: query.length > 0 ? "visible" : "hidden",
                }}
                onClick={()=>{
                    setQuery('');
                    setDisplayInput(false);
                    }
                }>
                <CloseIcon fontSize="medium" color="primary"/>
            </Button>
            </>
        }
        </Box> 
    );
}

export default SearchToggle;