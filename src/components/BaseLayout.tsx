import { ReactNode } from "react";
import Sidebar from "./Sidebar";

 
interface Props{
    children:ReactNode 
}

 export default function BaseLayout({ children }: Props) {
  // <Sidebar/>
   return (
     <div className="flex max-h-screen max-lg:h-full  max-lg:flex-col overflow-clip max-lg:overflow-auto no-scrollbar gap-2">
       <Sidebar />
       {children}
     </div>
   );
 }