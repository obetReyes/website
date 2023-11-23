import Link from "next/link";
import { useState, useEffect } from "react";

interface Props{
    color?:string
}
export default function Header({color}:Props) {
  const NavbarList = [
    {
      name: "servicios",
      link: "/#servicios",
    },
    {
      name: "trabajo",
      link: "/#trabajo",
    },
    {
      name: "contacto",
      link: "/#contacto",
    },
	{
      name: "WhatsApp",
      link: "https://wa.me/526241605257",
    },
  ];
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selected, setSelected] = useState("servicios");
  
  const toggleClass = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check the scroll position
      if (window.scrollY > 5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <header
        className={`${color} lg:px-14  xl:px-28  transition-all duration-700 fixed right-0 left-0 z-40 top-0 ${isScrolled && !color ? "bg-white" : ""}`}
      >
        <nav className="flex justify-between w-full max-w-screen-2xl mx-auto font-medium h-20 px-5">
          <section className="flex  items-center gap-3 md:gap-4 mr-5">
				<Link href="/#inicio" className={isScrolled && !color ? "text-gray-900" : "text-white"}><span className="text-orange-500">agro</span>jardines</Link>
          </section>
          <ul className="flex items-center sm:gap-3 md:gap-8">
            {NavbarList.map((data, index) => (
              <li
                className="group"
                data-testid={`${data.name}-navlink`}
                key={index}
                onClick={() => {
                  setSelected(data.name) 
                }}
              >
                <Link   target={data.name == "WhatsApp" ? "_blank" : ""}    href={data.link} className={` text-base ${isScrolled && !color ? "text-gray-900" : "text-white"}  text-center  opacity-80 cursor-pointer md:flex md:items-center hidden ${data.name == "WhatsApp" ? "bg-[#2971D9] p-2 rounded" :""}`}>
                  {data.name}
                </Link>
                <span
                  className={`w-full h-0.5 ${
                    selected == data?.name
                      ? "bg-white opacity-80"
                      : " group-hover:bg-white group-hover:opacity-80"
                  }`}
                ></span>
              </li>
            ))}
            <button
              className="w-12 h-12 relative   focus:outline-none md:hidden"
              onClick={() => {
                toggleClass();
                setToggle(!toggle);
              }}
            >
              <div className={`block w-5 absolute  left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" ${isScrolled && !color ? "!text-black" : "!text-white"}`}>
                <span
                  className={`block absolute  h-0.5 w-7 bg-current transform transition duration-300 ease-in-out ${
                    toggle ? "rotate-45" : "-translate-y-1.5"
                  }  
                `}
                ></span>
                <span
                  className={`block absolute  h-0.5 w-7 bg-current transform transition duration-300 ease-in-out ${
                    toggle && "opacity-0"
                  }`}
                ></span>
                <span
                  className={`block absolute  h-0.5 w-7 bg-current transform transition duration-300 ease-in-out ${
                    toggle ? "-rotate-45" : "translate-y-1.5"
                  }`}
                ></span>
              </div>
            </button>
          </ul>
          <section
            className={`md:invisible w-full h-full flex flex-wrap flex-col justify-center fixed left-0 top-11 ${
              toggle ? "visible z-20" : "invisible -z-10"
            }`}
          >
            <div
              className={`w-full h-full bg-[#2971D9] absolute left-0 transition-all duration-300 ease-in-out top-8 ${
                toggle ? "ssm:w-3/5 " : "ssm:w-0 -z-10"
              }`}
            ></div>
            <div
              data-tilt
              data-tilt-perspective="2000"
              className="relative z-20 text-center  pt-24 w-full ssm:w-3/5"
            >
              <div
                className={`block min-h-[130px] w-fit mx-auto transform transition ${
                  toggle
                    ? "opacity-100 -translate-y-1/3 delay-[0.45s]"
                    : "opacity-0 -translate-y-0  delay-[0s]"
                }`}
              >
                <ul
                  className={`transition w-fit flex flex-col gap-5 my-5 ${
                    toggle ? "delay-[0.45s]" : "delay-[0s]"
                  }`}
                >
                  {NavbarList.map((data, index) => (
                    <li
                    key={index}
                    >
                    <Link
                    onClick={() => setToggle(!toggle)}
                      href={data.link}
                      className={`text-opacity-100 text-lg text-white text-center cursor-pointer px-2 md:hidden ${data.name === "WhatsApp" ? "bg-[#2971D9] p-2 rounded" :""}`}
                    
                    >
                      {data.name}
                    </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </nav>
      </header>
      {/* Add your content from below div */}
      {/* <div className="w-5 mt-20"></div> */}
    </>
  );
}
