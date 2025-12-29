import home from "../assets/icons/img1-24.webp";
import about from "../assets/icons/img2-24.webp";
import blog from "../assets/icons/img3-24.webp";
import art from "../assets/icons/img4-24.webp";
import cats from "../assets/icons/cats-24.webp";
import cursor from "../assets/icons/cursor-24.webp";

import { useLocation, Link } from "react-router-dom";
import ToggleCursor from "./ToggleCursor";

const Navigation = () => {
    const location = useLocation();

    return (
        <aside className="mb-auto lg:w-[339px] bg-blue-100 border border-blue-300 rounded-xl shadow-md opacity-90">
            <nav className="space-y-2 mb-4">
              <h2 className="text-blue-600 font-bold text-lg text-center p-4">site navigation</h2>
              <ul>
                <div className="flex justify-center">
                  <img className="h-4 w-4" src={home} alt="home icon"/>
                  <Link className="hover:animate-wiggle hover:underline" to="/">
                    <li className={location.pathname === "/" ? "text-blue-700 pl-1 text-sm text-center font-bold" : "text-blue-500 pl-1 text-sm text-center font-bold"}>home</li>
                  </Link>       
                </div>
                <div className="flex justify-center"> 
                  <img className="h-4 w-4" src={about} alt="about icon"/>
                  <Link className="hover:animate-wiggle hover:underline" to="/about">
                    <li className={location.pathname === "/about" ? "text-blue-700 pl-1 text-sm text-center font-bold" : "text-blue-500 pl-1 text-sm text-center font-bold"}>about</li>
                  </Link>
                </div>
                <div className="flex justify-center">
                  <img className="h-4 w-4" src={blog} alt="blog icon"/>
                  <Link className="hover:animate-wiggle hover:underline" to="/blog">
                    <li className={location.pathname === "/blog" ? "text-blue-700 pl-1 text-sm text-center font-bold" : "text-blue-500 pl-1 text-sm text-center font-bold"}>blog</li>
                  </Link>       
                </div>
                <div className="flex justify-center">
                  <img className="h-4 w-4" src={art} alt="art icon"/>
                  <Link className="hover:animate-wiggle hover:underline" to="/art">
                    <li className={location.pathname === "/art" ? "text-blue-700 pl-1 text-sm text-center font-bold" : "text-blue-500 pl-1 text-sm text-center font-bold"}>art</li>
                  </Link>             
                </div>
                <div className="flex justify-center">
                  <img className="h-4 w-4" src={cats} alt="videos icon"/>
                  <Link className="hover:animate-wiggle hover:underline" to="/videos">
                    <li className={location.pathname === "/videos" ? "text-blue-700 pl-1 text-sm text-center font-bold" : "text-blue-500 pl-1 text-sm text-center font-bold"}>videos</li>
                  </Link>             
                </div>
                <li className="text-sm text-center font-bold text-blue-500">another page (maybe)</li>
                <div className="flex justify-center space-x-1">
                    <img className="h-4 w-4" src={cursor} width="16" height="16" alt="cursor icon"/>
                    <ToggleCursor />  
                </div>
              </ul>
            </nav>
          </aside>
    )
}

export default Navigation;