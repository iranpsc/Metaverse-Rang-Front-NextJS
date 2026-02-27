import { cookies } from "next/headers"

const useServerDarkMode = async (defaultTheme:any = "dark") => {    
    return (await cookies()).get('theme')?.value ?? defaultTheme
}

export default useServerDarkMode