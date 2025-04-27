"use client";

import type React from "react";

import { type FC, useRef, useState } from "react";
import { FlipWords } from "../../components/ui/flip-words";
import { Vortex } from "../../components/ui/vortex";
import { motion, useInView } from "framer-motion";
import { Form } from "@remix-run/react";

// ICONS
import { IoLogoJavascript, IoLogoReact } from "react-icons/io5";
import { IoLogoHtml5 } from "react-icons/io";
import { FaCss3Alt, FaSquareXTwitter } from "react-icons/fa6";
import { RiTailwindCssFill, RiRemixRunLine } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";

import {
  SiTypescript,
  SiExpress,
  SiAuthelia,
  SiMongodb,
  SiPrisma,
  SiGo,
} from "react-icons/si";
import { BiLinkExternal } from "react-icons/bi";
import {
  FaFigma,
  FaRegFileImage,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

export const loader = async () => {
  try {
    return Response.json({ message: "Welcome to Portfolio Page" });
  } catch (error) {
    console.error("Loader Error:", error);
    return Response.json({ message: "Error loading data" });
  }
};

interface CardProps {
  title: string;
  items: { icon: React.ReactNode; name?: string }[];
  isExpanded: boolean;
  onHover: (expand: boolean) => void;
  // expandDirection: string;
}

const webTechnologies = [
  {
    title: "Core Web Technologies",
    items: [
      {
        icon: (
          <IoLogoHtml5 className="bg-orange-500 text-white rounded-md text-2xl" />
        ),
        name: "HTML",
      },
      {
        icon: (
          <FaCss3Alt className="bg-blue-500 text-white rounded-md text-2xl" />
        ),
        name: "CSS",
      },
      {
        icon: (
          <RiTailwindCssFill className="bg-blue-500 text-white rounded-full text-2xl" />
        ),
        name: "Tailwind CSS",
      },
      {
        icon: (
          <IoLogoJavascript className="bg-black text-yellow-500 text-3xl" />
        ),
        name: "JavaScript",
      },
      {
        icon: <SiTypescript className="bg-blue-500 text-white text-2xl" />,
        name: "TypeScript",
      },
      {
        icon: <SiGo className="bg-blue-500 text-white text-2xl" />,
        name: "Golang",
      },
    ],
  },
  {
    title: "Frontend Development",
    items: [
      {
        icon: <IoLogoReact className="bg-blue-600 text-2xl rounded-xl" />,
        name: " React.js (Redux, Axios, Zod)",
      },
      {
        icon: <FaFigma className="text-2xl" />,
        name: "Figma (UI/UX Understanding)",
      },
      {
        icon: <RiRemixRunLine className="text-2xl" />,
        name: "Remix",
      },
    ],
  },
  {
    title: "Backend Technologies",
    items: [
      {
        icon: (
          <FaNodeJs className="bg-green-500 text-white rounded-md text-2xl" />
        ),
        name: "Node.js",
      },
      {
        icon: <SiExpress className="bg-black text-white rounded-md text-2xl" />,
        name: "Express.js",
      },

      {
        icon: <SiAuthelia />,
        name: "Authentication (Clerk & JWT)",
      },
      {
        icon: <FaRegFileImage />,
        name: "File Handling (Multer, Cloudinary)",
      },
      {
        icon: <SiGo className="bg-blue-500 text-white text-2xl" />,
        name: "Golang",
      },
    ],
  },
  {
    title: "Database & ORM",
    items: [
      {
        icon: (
          <SiMongodb className="bg-white text-green-700 text-2xl rounded-full" />
        ),
        name: "MongoDB",
      },
      {
        icon: <SiPrisma />,
        name: "Prisma",
      },
    ],
  },
  {
    title: "Version Control & Deployment",
    items: [
      {
        icon: <FaGitAlt className="text-orange-600 bg-white text-2xl" />,
        name: "Git",
      },
      {
        icon: <FaGithub className="text-2xl" />,
        name: "Github",
      },
    ],
  },
  {
    title: "All",
    items: [
      {
        icon: (
          <IoLogoHtml5 className="bg-orange-500 text-white rounded-md text-2xl" />
        ),
      },
      {
        icon: (
          <FaCss3Alt className="bg-blue-500 text-white rounded-md text-2xl" />
        ),
      },
      {
        icon: (
          <RiTailwindCssFill className="bg-blue-500 text-white rounded-full text-2xl" />
        ),
      },
      {
        icon: (
          <IoLogoJavascript className="bg-black text-yellow-500 text-3xl" />
        ),
      },
      {
        icon: <SiTypescript className="bg-blue-500 text-white text-2xl" />,
      },
      {
        icon: <IoLogoReact className="bg-blue-600 text-2xl rounded-xl" />,
      },
      {
        icon: <FaFigma className="text-2xl" />,
      },
      {
        icon: (
          <FaNodeJs className="bg-green-500 text-white rounded-md text-2xl" />
        ),
      },
      {
        icon: <SiExpress className="bg-black text-white rounded-md text-2xl" />,
      },
      {
        icon: <RiRemixRunLine className="text-2xl" />,
      },
      {
        icon: <SiAuthelia />,
      },

      {
        icon: (
          <SiMongodb className="bg-white text-green-700 text-2xl rounded-full" />
        ),
      },
      {
        icon: <SiPrisma />,
      },
      {
        icon: <FaGitAlt className="text-orange-600 bg-white text-2xl" />,
      },
      {
        icon: <FaGithub className="text-2xl" />,
      },
      {
        icon: <SiGo className="bg-blue-500 text-white text-2xl" />,
      },
    ],
  },
];
const Card: FC<CardProps> = ({ title, items, isExpanded, onHover }) => {
  return (
    <div
      className={`relative w-64 h-20 transition-all duration-300 ${
        isExpanded ? "z-50" : "z-0"
      }`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Outer Gradient Border */}
      <div
        className={`absolute left-1/2 -translate-x-1/2  inset-0 p-[2px] transition-all duration-300 ease-in-out
      ${
        isExpanded
          ? "w-72 h-80 rounded-lg bg-gradient-to-r from-[#129ffd] to-[#0ff008]"
          : "w-64 h-20 rounded-full bg-gradient-to-r from-[#129ffd] to-[#0ff008]"
      }`}
      >
        {/* Inner Card - Black BG */}
        <div
          className={`relative w-full h-full bg-black shadow-lg transition-all duration-300 ease-in-out overflow-hidden  border border-transparent
        ${isExpanded ? "w-full h-full rounded-lg" : "rounded-full"}
        hover:border-white/20`}
        >
          {/* Collapsed View */}
          <div
            className={`flex items-center justify-center h-full transition-opacity duration-200 ${
              isExpanded ? "opacity-0" : "opacity-100"
            }`}
          >
            <h3 className="text-xl text-white truncate p-6">{title}</h3>
          </div>

          {/* Expanded View - Saare Technologies */}
          {isExpanded && (
            <div className="absolute inset-0 opacity-100 transition-opacity duration-300 flex flex-col  p-6">
              <h3 className="text-xl  text-white mb-3 text-center">{title}</h3>

              <ul className="grid grid-cols-3 gap-4">
                {items.map((tech, index) => (
                  <li
                    key={index}
                    className="flex flex-col items-center text-white space-y-2"
                  >
                    {tech.icon}
                    <span className="text-sm">{tech.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const skillRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const homeRef = useRef<HTMLDivElement | null>(null);
  const projectRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(projectRef, { once: false });
  const scrollSkill = () => {
    skillRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollHome = () => {
    homeRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollProject = () => {
    projectRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const projects = [
    {
      title: "THE BUILD MALL ",
      description:
        "Built using Remix, Prisma (MongoDB), Zustand, and Clerk authentication. Figma-based custom design with full responsiveness.",
      web: "https://github.com/MohammedSalman999/The-Build-Mall",
      icons: [
        { component: RiRemixRunLine, className: "text-2xl" },
        { component: SiPrisma, className: "text-2xl" },
        {
          component: SiMongodb,
          className: "bg-white text-green-700 text-2xl rounded-full",
        },
      ],
    },
    {
      title: "AFFORD MOTORS",
      description:
        "Built task management app using Remix + Prisma + MongoDB. Role-based actions (Admin, Moderator, Employee), Excel reports.",
      web: "https://github.com/MohammedSalman999/affordmotors",
      icons: [
        { component: RiRemixRunLine, className: "text-2xl" },
        { component: SiPrisma, className: "text-2xl" },
        {
          component: SiMongodb,
          className: "bg-white text-green-700 text-2xl rounded-full",
        },
      ],
    },
    {
      title: "TMS REACT",
      description:
        "Built full-featured admin panel using React and Node.js,Implemented charts, dark mode toggle, and user role handling.",
      web: "https://github.com/MohammedSalman999/adminReactDashboard",
      icons: [
        {
          component: IoLogoReact,
          className: "bg-blue-600 text-2xl rounded-xl",
        },
        {
          component: FaNodeJs,
          className: "bg-green-500 text-white rounded-md text-2xl",
        },
      ],
    },
    {
      title: "SILSILA",
      description: "Golang-based room booking app with Bootstrap frontend.",
      web: "https://github.com/MohammedSalman999/Silsila-The-Dream",
      icons: [
        { component: SiGo, className: "bg-blue-500 text-white text-2xl" },
        {
          component: IoLogoHtml5,
          className: "bg-orange-500 text-white rounded-md text-2xl",
        },
        {
          component: FaCss3Alt,
          className: "bg-blue-500 text-white rounded-md text-2xl",
        },
      ],
    },
    {
      title: "RMS Golang",
      description: "Golang + MySQL backend with JWT-based job portal",
      web: "https://github.com/MohammedSalman999/rmsUsinggolang",
      icons: [
        { component: SiGo, className: "bg-blue-500 text-white text-2xl" },
      ],
    },
    {
      title: "CMS(GOLANG)",
      description: "RESTful API-based backend using Golang and MySQL.",
      web: "https://github.com/MohammedSalman999/CarManagementSytem",
      icons: [
        { component: SiGo, className: "bg-blue-500 text-white text-2xl" },
      ],
    },
    {
      title: "Tasks Sortify",
      description:
        "A simple and efficient task management app that helps users organize, sort, and manage their tasks seamlessly.",
      web: "https://taskssortify.vercel.app/tasks",
      icons: [
        {
          component: RiTailwindCssFill,
          className: "bg-blue-500 text-white rounded-full text-2xl",
        },
        {
          component: SiTypescript,
          className: "bg-blue-500 text-white text-2xl",
        },
        {
          component: IoLogoReact,
          className: "bg-blue-600 text-2xl rounded-xl",
        },
        { component: RiRemixRunLine, className: "text-2xl" },
        {
          component: SiMongodb,
          className: "bg-white text-green-700 text-2xl rounded-full",
        },
        { component: SiPrisma, className: "text-2xl" },
      ],
    },
  ];
  return (
    <div className="relative h-[2800px] w-full  bg-black text-white ">
      <Vortex backgroundColor="black" baseHue={120}>
        <div ref={homeRef} className="w-full flex justify-center ">
          <div className="w-[85%]  p-4 relative max-sm:w-[95%] ">
            <div className=" w-full flex items-end justify-between mt-8 max-xs:flex max-xs:flex-col max-xs:items-center max-sm:mt-2 ">
              <div className=" p-[1px] relative rounded-lg bg-gradient-to-r from-[#129ffd] to-[#0ff008] max-xs:mb-4">
                <div className="px-2 py-2 bg-black rounded-[6px] text-white">
                  <FlipWords
                    className="text-xl  max-md:text-sm mb-0"
                    words={[
                      "Welcome, Visionary! ",
                      " Let’s turn your ideas into reality",
                    ]}
                  />
                </div>
              </div>

              <div className="text-5xl max-sm:text-4xl">Mohammed Salman</div>
            </div>
          </div>
        </div>
        <div className="w-[92%] sticky top-5 z-30 max-xs:w-full">
          <div className="w-full xs:w-full flex justify-end  lg:text-xl max-xs:justify-center max-md:text-sm">
            <div className="grid grid-cols-4 gap-4   ">
              <button onClick={scrollHome} className="p-[1px] relative ">
                <div className="absolute inset-0 bg-gradient-to-r from-[#129ffd] to-[#0ff008] rounded-lg" />
                <div className="px-3 py-1  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent hover:text-black">
                  Home
                </div>
              </button>
              <button onClick={scrollSkill} className="p-[1px] relative ">
                <div className="absolute inset-0 bg-gradient-to-r from-[#129ffd] to-[#0ff008] rounded-lg " />
                <div className="px-3 py-1  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent hover:text-black">
                  Skills
                </div>
              </button>
              <button onClick={scrollProject} className="p-[1px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#129ffd] to-[#0ff008] rounded-lg" />
                <div className="px-3 py-1  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent hover:text-black">
                  Projects
                </div>
              </button>

              <button onClick={scrollContact} className="p-[1px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#129ffd] to-[#0ff008] rounded-lg" />
                <div className="px-3 py-1  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent hover:text-black">
                  Contact
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center items-center ">
          <div className="w-[85%]  flex flex-col items-center justify-center z-10">
            <div className="flex-grow  w-[80%] text-3xl ">
              <div className="flex  flex-col  items-center  ">
                <motion.h1
                  className="mt-16 mb-4 max-md:text-3xl text-5xl max-sm:text-2xl text-white"
                  animate={{
                    textShadow: [
                      "0px 0px 10px #0ff",
                      "0px 0px 20px #0ff",
                      "0px 0px 10px #0ff",
                    ],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  Full-Stack Developer
                </motion.h1>
                <a href="/resume" download="Arfana_Resume.pdf">
                  <button className="p-[1px] relative my-3">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#129ffd] to-[#0ff008] rounded-lg" />
                    <div className="px-3 py-1  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent text-[20px] hover:text-black">
                      Download my Resume
                    </div>
                  </button>
                </a>
                {/* <div>Bringing ideas to life with logic & design</div> */}

                <div className="flex flex-col max-lg:text-2xl max-sm:text-xl mb-4 ">
                  <span className="text-center">
                    &ldquo;People&rsquo;s lives don&rsquo;t end when they die.
                  </span>
                  <span className="text-center">
                    They end when they lose faith.&rdquo; – Itachi Uchiha
                  </span>
                </div>

                <div className="text-center max-lg:text-2xl max-sm:text-xl">
                  &ldquo;Loving myself and making myself worthy.&rdquo;
                </div>
              </div>
            </div>

            {/* Skill Section */}
            <div className="w-full flex flex-col items-center mt-60">
              <div ref={skillRef} className="">
                <div className="text-center text-4xl  max-sm:text-2xl mt-20 mb-8">
                  My Toolkit
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 relative">
                  {webTechnologies.map((category, catIndex) => (
                    <Card
                      key={catIndex}
                      title={category.title}
                      items={category.items}
                      isExpanded={expandedIndex === catIndex}
                      onHover={(expand) =>
                        setExpandedIndex(expand ? catIndex : null)
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Skill Section */}

            <div
              ref={projectRef}
              className="w-full text-center text-4xl max-sm:text-2xl mt-52 mb-8"
            >
              <h1 className="text-center text-4xl max-sm:text-2xl mt-20 mb-8">
                My Projects
              </h1>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="w-[75%] mx-auto p-[1px] relative rounded-lg bg-gradient-to-r from-[#129ffd] to-[#0ff008]"
                    variants={{
                      hidden: { opacity: 0, x: -400 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{
                      duration: 1.2,
                      delay: index * 0.2, // 🎯
                      ease: "easeOut",
                    }}
                  >
                    <div className="h-[200px] px-4 py-4 bg-black rounded-[6px] text-white flex flex-col">
                      <div className="flex h-[30%]">
                        {" "}
                        <h2 className="text-3xl w-[90%] ml-8">
                          {project.title}
                        </h2>
                        <a
                          href={project.web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl transition-transform duration-200 inline-block hover:scale-110 mt-1"
                        >
                          <BiLinkExternal />
                        </a>
                      </div>

                      <div className="h-[50%] mt-2 ">
                        <p className="leading-tight text-[16px] text-gray-300 font-semibold tracking-wide bg-gradient-to-r from-[#129ffd] to-[#0ff008] bg-clip-text text-transparent">
                          Description : {project.description}
                        </p>
                      </div>

                      <div className="h-[20%] w-full flex justify-between ">
                        <p className="text-[24px] w-[30%] ">Tech : </p>
                        <div className="flex justify-evenly  w-[70%] mt-2">
                          {project.icons.map((icon, i) => {
                            const IconComponent = icon.component;
                            return (
                              <IconComponent
                                key={i}
                                className={icon.className}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div
              ref={contactRef}
              className=" w-[85%] flex flex-col  justify-center items-center max-sm:w-full mt-4  "
            >
              <h1 className="text-center text-4xl  max-sm:text-2xl mt-20 mb-8">
                Contact
              </h1>
              <div className="grid grid-cols-3 gap-4 text-4xl mb-6">
                {/* <a
                  href="https://www.instagram.com/arfana_alii/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className=" bg-gradient-to-r from-[#feda75] via-[#fa7e1e] to-[#d62976]  text-4xl  hover:from-[#d62976] hover:via-[#fa7e1e] hover:to-[#feda75] " />
                </a> */}
                <a
                  href="https://x.com/Devplorer/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaSquareXTwitter className="bg-white text-black hover:text-white hover:bg-black" />
                </a>
                <a
                  href="https://github.com/MohammedSalman999"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="hover:text-black hover:bg-white" />{" "}
                </a>

                <a
                  href="mailto:mack000000sheikh@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdOutlineMail className="hover:bg-white hover:text-black" />
                </a>
              </div>
              <div className="w-[80%] p-[1px] relative rounded-lg bg-gradient-to-r from-[#129ffd] to-[#0ff008] mb-4 max-xs:w-full max-sm:w-[90%]">
                <div className="px-2 py-2 bg-black rounded-[6px] text-white ">
                  <Form
                    method="post"
                    className=" grid grid-cols-3 text-2xl max-md:text-xl max-sm:p-2 p-4"
                  >
                    <label htmlFor="name" className="p-4 max-sm:p-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      required
                      className="col-span-2 bg-transparent text-white p-4 max-sm:p-2 focus:outline-none"
                    />
                    <label htmlFor="email" className="p-4 max-sm:p-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      required
                      className="bg-transparent text-white p-4 max-sm:p-2 col-span-2 focus:outline-none"
                    />{" "}
                    <label htmlFor="message" className="p-4 max-sm:p-2">
                      Message
                    </label>{" "}
                    <textarea
                      id="message"
                      name="message"
                      placeholder="type here..."
                      required
                      className="bg-transparent text-white p-4 max-sm:p-2 h-32 col-span-2 focus:outline-1"
                    />
                    <div className="col-span-3 flex justify-center mt-5">
                      <button type="submit" className="p-[1px] relative ">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#129ffd] to-[#0ff008] rounded-lg" />
                        <div className="px-4 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent hover:text-black">
                          Submit
                        </div>
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            {/* Contact end */}
          </div>
        </div>
      </Vortex>
    </div>
  );
}
