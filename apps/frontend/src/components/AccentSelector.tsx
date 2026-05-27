import { useTheme } from "../context/ThemeContext";

type Accent = 'blue' | 'orange' | 'green' | 'yellow';

export function AccentSelector() {
  const { accent, setAccent } = useTheme();

  // Definimos de forma exacta los valores OKLCH que declaraste en tu CSS
  const accents: { 
    id: Accent; 
    name: string; 
    lightColor: string; 
    darkColor: string; 
  }[] = [
    { 
      id: 'blue', 
      name: 'Azul', 
      lightColor: 'oklch(50% 0.25 271.7)', 
      darkColor: 'oklch(70% 0.25 271.7)' 
    },
    { 
      id: 'orange', 
      name: 'Naranja', 
      lightColor: 'oklch(60% 0.15 50)', 
      darkColor: 'oklch(75% 0.15 50)' 
    },
    { 
      id: 'green', 
      name: 'Verde', 
      lightColor: 'oklch(50% 0.15 150)', 
      darkColor: 'oklch(70% 0.15 150)' 
    },
    { 
      id: 'yellow', 
      name: 'Amarillo', 
      lightColor: 'oklch(60% 0.13 75)', 
      darkColor: 'oklch(80% 0.13 85)' 
    },
  ];

  return (
    <section className="mt-10 border-t border-border pt-6">
      <header>
        <p className="font-semibold text-accent">Color de acento</p>
        <p className="text-txt-sec">Selecciona el color principal de los botones y detalles.</p>
      </header>

      <div className="flex gap-4 mt-4">
        {accents.map((acc) => {
          const isActive = accent === acc.id;

          return (
            <button
              key={acc.id}
              onClick={() => setAccent(acc.id)}
              className={`group relative flex size-9 cursor-pointer items-center justify-center rounded-md border-2 
                ${isActive 
                  ? 'border-accent bg-bg-sec scale-110' 
                  : 'border-border hover:border-border hover:scale-105'
                }
              `}
              title={acc.name}
            >
              <div 
                className="relative size-7 rounded-sm overflow-hidden flex"
                style={{
                  ['--light-side' as any]: acc.lightColor,
                  ['--dark-side' as any]: acc.darkColor,
                }}
              >
                <span className="w-1/2 h-full bg-(--light-side)" />
                
                <span className="w-1/2 h-full bg-(--dark-side)" />
              </div>
              
              {isActive && (
                <span className="absolute text-white text-xs font-extrabold">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}