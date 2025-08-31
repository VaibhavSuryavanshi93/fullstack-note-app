import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, PlusCircle, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";

const PREVIEW_NOTES = [
  { id: 1, title: "Shopping List", content: "Milk, Eggs, Bread" },
  { id: 2, title: "Work Tasks", content: "Fix bug #234, push update" },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        {/* Theme Section */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your interface
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}`}
              onClick={() => setTheme(t)}
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-base-300 bg-base-100 flex justify-between items-center">
                  <h3 className="font-medium text-sm">My Notes</h3>
                  <PlusCircle size={18} className="text-primary" />
                </div>

                <div className="p-4 space-y-3 min-h-[200px] max-h-[200px] overflow-y-auto">
                  {PREVIEW_NOTES.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 bg-base-200 rounded-lg flex justify-between items-start"
                    >
                      <div>
                        <h4 className="font-medium text-sm">{note.title}</h4>
                        <p className="text-xs text-base-content/70">
                          {note.content}
                        </p>
                      </div>
                      <Trash2 size={16} className="text-error cursor-pointer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
