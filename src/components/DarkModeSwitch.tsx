import { useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return isDark ? (
    <SunIcon position='fixed' cursor='pointer' w={6} h={6} top='1rem' right='1rem' color='yellow.500' onClick={() => toggleColorMode()} />
  ) : (
    <MoonIcon position='fixed' cursor='pointer' w={6} h={6} top='1rem' right='1rem' color='blue.500' onClick={() => toggleColorMode()} />
  );
}

export default DarkModeSwitch