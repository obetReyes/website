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
      link: "/#",
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
      <div
        className={`${color} lg:px-14  xl:px-28  transition-all duration-700 fixed right-0 left-0 z-40 top-0 ${isScrolled && !color ? "bg-[#3F6236]" : ""}`}
      >
        <div className="flex justify-between w-full max-w-screen-2xl mx-auto font-medium h-20 px-5">
          <div className="flex  items-center gap-3 md:gap-4 mr-5">
				<a href="#inicio" className="text-white"><span className="text-orange-500">agro</span>jardines</a>
          </div>
          <div className="flex items-center sm:gap-3 md:gap-8">
            {NavbarList.map((data, index) => (
              <div
                className="group"
                data-testid={`${data.name}-navlink`}
                key={index}
                onClick={() => {
                  setSelected(data.name) 
                }}
              >
                <a    href={data.link} className={` text-base  text-white text-center  opacity-80 cursor-pointer md:flex md:items-center hidden ${data.name == "WhatsApp" ? "bg-orange-700 p-2 rounded" :""}`}>
                  {data.name}
                </a>
                <div
                  className={`w-full h-0.5 ${
                    selected == data?.name
                      ? "bg-white opacity-80"
                      : "group-hover:bg-white group-hover:opacity-80"
                  }`}
                ></div>
              </div>
            ))}
            <button
              className="w-12 h-12 relative  focus:outline-none md:hidden"
              onClick={() => {
                toggleClass();
                setToggle(!toggle);
              }}
            >
              <div className="block w-5 absolute  text-white left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
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
          </div>
          <div
            className={`md:invisible w-full h-full flex flex-wrap flex-col justify-center fixed left-0 top-11 ${
              toggle ? "visible z-20" : "invisible -z-10"
            }`}
          >
            <div
              className={`w-full h-full bg-[#3F6236] absolute left-0 transition-all duration-300 ease-in-out top-8 ${
                toggle ? "ssm:w-3/5 " : "ssm:w-0 -z-10"
              }`}
            ></div>
            <div
              data-tilt
              data-tilt-perspective="2000"
              className="relative z-20 text-center pt-24 w-full ssm:w-3/5"
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
                    <a
                    onClick={() => setToggle(!toggle)}
                      href={data.link}
                      className={`text-opacity-100 text-lg text-white text-center cursor-pointer px-2 md:hidden ${data.name === "WhatsApp" ? "bg-orange-700 p-2 rounded" :""}`}
                      key={index}
                    >
                      {data.name}
                    </a>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add your content from below div */}
      {/* <div className="w-5 mt-20"></div> */}
    </>
  );
}
