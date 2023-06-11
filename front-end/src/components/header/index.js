import { useEffect, useState } from "react";
import HeaderBig from "../HeaderBig"
import HeaderSmall from "../headerSmall"
function Header(){
    const [isDesktop, setDesktop] = useState(window.innerWidth > 900);

    const updateMedia = () => {
        console.log(window.innerWidth)
        setDesktop(window.innerWidth > 900);
      };
    
      useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
      });
    
    return (
        <>
        {isDesktop ? (
            <HeaderBig /> ) : 
            (<HeaderSmall />)
        }
        </>
    )
}

export default Header