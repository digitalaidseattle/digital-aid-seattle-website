import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useRef, useState } from 'react'

const SearchToggle = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [displayInput, setDisplayInput] = useState(isMobile)
  const [query, setQuery] = useState('')

  // useRef to target the TextField input, so we can make it auto-focus.
  const textInput = useRef<any>(null)

  // For setting the ref to the TextField when it appears in the DOM.
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (displayInput) {
      timeout = setTimeout(() => {
        textInput.current?.focus()
      })
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [displayInput])

  // For making the search bar automatically visible on small screens.
  const handleResize = () => {
    isMobile ? setDisplayInput(true) : setDisplayInput(false)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  })

  return (
    <Box
      color="primary"
      sx={{
        backgroundColor: displayInput ? 'white' : 'transparent',
        borderRadius: '28px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Button onClick={() => setDisplayInput(!displayInput)}>
        <SearchIcon fontSize="medium" color="primary" />
      </Button>
      {displayInput && (
        <>
          <TextField
            variant="standard"
            inputRef={textInput}
            InputProps={{
              disableUnderline: true,
            }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ width: '100%' }}
          />
          <Button
            sx={{
              visibility: query.length > 0 ? 'visible' : 'hidden',
            }}
            onClick={() => {
              setQuery('')
            }}
          >
            <CloseIcon fontSize="medium" color="primary" />
          </Button>
        </>
      )}
    </Box>
  )
}

export default SearchToggle
