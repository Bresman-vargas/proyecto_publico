import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import type { JSX } from "react";
type Theme = "light" | "dark" | "system";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes: {
    id: Theme;
    title: string;
    description: string;
    icon: JSX.Element;
    img: string;
    label: string;
  }[] = [
    {
      id: "light",
      title: "Light theme",
      description: "Este tema se activará cuando selecciones light mode",
      icon: <Sun size={20} />,
      img: "/light.png",
      label: "Default light",
    },
    {
      id: "dark",
      title: "Dark theme",
      description: "Este tema se activará cuando selecciones dark mode",
      icon: <Moon size={20} />,
      img: "/dark.png",
      label: "Default dark",
    },
    {
      id: "system",
      title: "System",
      description: "Este tema se activará dependiendo de tu sistema",
      icon: <Monitor size={20} />,
      img: "/system.png",
      label: "Default system",
    },
  ];

  return (
    <section>
      <header>
        <h1 className="font-bold text-xl text-txt">Apariencia</h1>
        <p className="font-semibold pt-2 text-accent">Interface theme</p>
        <p className="text-txt-sec">Customize your workspace theme</p>
      </header>

      <aside className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {themes.map((t) => {
          const isLight = t.id === "light";
          const isDark = t.id === "dark";
          const isSystem = t.id === "system";

          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`text-left bg-bg-sec/50 cursor-pointer rounded-md border-2 flex flex-col ${
                theme === t.id ? "border-accent" : "border-border"
              }`}
            >
              <header className="grid grid-cols-6 bg-bg-sec/20">
                <section
                  className={`mt-20 col-start-3 col-span-4 flex h-40 w-full rounded-tl-md border-l border-t
                  ${isLight ? "bg-white border-zinc-200" : ""}
                  ${isDark ? "bg-black border-zinc-800" : ""}
                  ${isSystem ? "bg-[linear-gradient(135deg,white_50%,black_50%)] border-zinc-400" : ""} 
                `}
                >
                  {/* Sidebar Esquematizado */}
                  <aside
                    className={`flex flex-col justify-between w-16 border-r
                    ${isLight ? "border-zinc-300" : isDark ? "border-zinc-900" : "border-zinc-300"}`}
                  >
                    <div className="flex flex-col">
                      <header
                        className={`flex items-center gap-3 h-5 border-b px-2 py-1 
                        ${isLight ? "border-zinc-300" : isDark ? "border-zinc-900" : "border-zinc-300"}`}
                      >
                        {/* Usamos tu color accent real */}
                        <div className="bg-accent h-1.5 w-3"></div>
                        <div
                          className={`h-1 w-full  ${isDark ? "bg-zinc-800" : "bg-zinc-300"}`}
                        ></div>
                      </header>
                      <div className="flex flex-col gap-2 p-2">
                        <div
                          className={`h-1.5 w-full  ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}
                        ></div>
                        <div
                          className={`h-1.5 w-full  ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}
                        ></div>
                        {/* Tu acento con transparencia */}
                        <div className="bg-accent/40 h-1.5 w-full "></div>
                        <div
                          className={`h-1.5 w-full  ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}
                        ></div>
                      </div>
                    </div>
                    <footer
                      className={`flex items-center gap-2 px-2 h-5 w-full border-t
                      ${isLight ? "border-zinc-200" : isDark ? "border-zinc-900" : "border-zinc-200"}`}
                    >
                      <div className="bg-accent h-1 w-1/2 "></div>
                    </footer>
                  </aside>

                  {/* Lado Derecho */}
                  <div className="flex flex-col flex-1">
                    <header
                      className={`flex items-center justify-between px-2 w-full h-5 border-b
                      ${isLight ? "border-zinc-200" : isDark ? "border-zinc-900" : "border-zinc-400"}`}
                    >
                      <div
                        className={`h-1 w-1/4  ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}
                      ></div>
                      <div className="flex gap-1">
                        <div className="bg-accent/40 h-1 w-3 "></div>
                        <div className="bg-accent/40 h-1 w-3 "></div>
                      </div>
                    </header>

                    <main className="p-3 flex flex-col gap-3">
                      {/* titulo*/}
                      <div className="flex">
                        <div className="flex flex-col gap-1">
                          <div
                            className={`h-1.5 w-3/4  ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}
                          ></div>
                          <div
                            className={`h-1.5 w-full  opacity-50 ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}
                          ></div>
                        </div>

                        <div className="  bg-accent h-3 w-3 shadow-lg"></div>
                      </div>
                      {/* grid*/}
                      <div className="grid grid-cols-2 gap-2">
                        <div
                          className={`border p-1.5 flex flex-col gap-1 rounded-sm
                          ${isLight ? "border-zinc-200 bg-zinc-50" : isDark ?  "border-zinc-900 bg-zinc-900/50" : "border-zinc-400"}`}
                        >
                          <div className="bg-accent/20 h-1 w-full "></div>
                          <div
                            className={`h-1 w-2/3  ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}
                          ></div>
                        </div>
                        <div
                          className={`border p-1.5 flex flex-col gap-1 rounded-sm
                          ${isLight ? "border-zinc-200 bg-zinc-50" : isDark ?  "border-zinc-900 bg-zinc-900/50" : "border-zinc-800"}`}
                        >
                          <div className="bg-accent/20 h-1 w-full "></div>
                          <div
                            className={`h-1 w-2/3  ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}
                          ></div>
                        </div>
                      </div>
                    </main>
                  </div>
                </section>
              </header>

              <footer className="rounded-b-md bg-bg-sec px-4 py-4 flex items-center border-t border-border justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className={theme === t.id ? "text-accent" : "text-txt-sec"}
                  >
                    {t.icon}
                  </span>
                  <div>
                    <h2 className="font-bold text-txt text-sm">{t.title}</h2>
                    <p className="text-[10px] text-txt-sec uppercase tracking-widest">
                      {t.label}
                    </p>
                  </div>
                </div>
                {theme === t.id && (
                  <div className="bg-accent/80 text-white  h-6 px-3 flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <p>Active</p>
                  </div>
                )}
              </footer>
            </button>
          );
        })}
      </aside>
    </section>
  );
}
