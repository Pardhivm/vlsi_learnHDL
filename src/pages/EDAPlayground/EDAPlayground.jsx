import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import WaveformPanel from "../../components/WaveformPanel";
import SchematicViewer from "../../components/SchematicViewer";
import PanelButtons from "../../components/PanelButtons";
import { parseOutline } from "../../utils/outlineParser";
import "./EDAPlayground.css";
import { useAuth } from "../../context/AuthContext";
import {
  savePlaygroundProject,
  getPlaygroundProjects
} from "../../utils/firestore";


// =========================================
// BACKEND CONFIGURATION
// =========================================

const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://127.0.0.1:8000"
    : "https://vlsi-learn-api-docker.onrender.com")
).replace(/\/+$/, "");

// =========================================
// EXECUTION CONFIGURATION
// =========================================

const EXECUTION_ENABLED =
  Boolean(API_URL) &&
  (
    import.meta.env.DEV ||
    import.meta.env.VITE_EDA_EXECUTION_ENABLED === "true"
  );

  console.log("EDA DEBUG:", {
  API_URL,
  DEV: import.meta.env.DEV,
  EXECUTION_ENV: import.meta.env.VITE_EDA_EXECUTION_ENABLED,
  EXECUTION_ENABLED
});

const LANGUAGES = ["Verilog", "SystemVerilog", "VHDL", "TCL", "Perl"];
const HDL_LANGUAGES = ["Verilog", "SystemVerilog", "VHDL"];
const SCRIPT_LANGUAGES = ["TCL", "Perl"];
const ROLES = ["design", "testbench", "source"];

const FILE_EXTENSIONS = {
  Verilog: ".v",
  SystemVerilog: ".sv",
  VHDL: ".vhd",
  TCL: ".tcl",
  Perl: ".pl"
};

const STORAGE_KEY = "vlsi-learn-playground-v3";
const OLD_STORAGE_KEYS = ["vlsi-learn-playground-v2", "vlsi-learn-playground-v1"];
const MAX_WORKSPACES = 8;   // windows in the strip under the language bar
const MAX_FILES = 12;
const MAX_OPEN_WINDOWS = 4;
const MAX_SHARE_LENGTH = 6000;
const MAX_CODE_LENGTH = 50000;
const SEPARATOR = "\n\n────────────────────────────────────────\n";


/* =========================================
   PROJECT DATA HELPERS
========================================= */

const makeId = () =>
  `f${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

const asText = (value) =>
  typeof value === "string" ? value.slice(0, MAX_CODE_LENGTH) : "";

const defaultName = (language, role) => {
  if (role === "design") {
    return SCRIPT_LANGUAGES.includes(language) ? "script" : "design";
  }

  return role === "testbench" ? "testbench" : "file";
};

/* A file name without its extension: letters, digits, _ and - only */
const NAME_PATTERN = /^[A-Za-z0-9_-]{1,40}$/;

const stripExtension = (text) => text.trim().replace(/\.[A-Za-z]+$/, "");

const roleIcon = (role) =>
  role === "design" ? "◈" : role === "testbench" ? "🧪" : "📄";

const makeFile = (role, name, code = "") => ({
  id: makeId(),
  role,
  name,
  code
});

const emptyLanguage = (language) => {
  const file = makeFile("design", defaultName(language, "design"));

  return { files: [file], open: [file.id], active: file.id };
};

const emptyFiles = () =>
  Object.fromEntries(LANGUAGES.map((name) => [name, emptyLanguage(name)]));

/* "file1", "file2", ... the first name that is not used yet */
function freeName(files, base, allowPlain = false) {
  const taken = new Set(files.map((file) => file.name.toLowerCase()));

  if (allowPlain && !taken.has(base)) {
    return base;
  }

  let number = allowPlain ? 2 : 1;

  while (taken.has(`${base}${number}`)) {
    number += 1;
  }

  return `${base}${number}`;
}

/*
 * Accepts the new format ({files, open, active}) and also the old one
 * ({design, testbench, extras}) so saved projects and old share links
 * keep working. Anything unexpected is dropped.
 */
function normalizeLanguage(language, source) {
  const fallback = emptyLanguage(language);

  if (!source || typeof source !== "object") {
    return fallback;
  }

  let list = [];
  let legacyOpen = null;

  if (Array.isArray(source.files)) {
    list = source.files
      .filter(
        (file) =>
          file && typeof file.name === "string" && typeof file.code === "string"
      )
      .map((file) => ({
        id: typeof file.id === "string" && file.id ? file.id : makeId(),
        role: ROLES.includes(file.role) ? file.role : "source",
        name: stripExtension(file.name),
        code: asText(file.code)
      }));
  } else {
    const design = makeFile("design", defaultName(language, "design"), asText(source.design));
    list.push(design);
    legacyOpen = [design.id];

    if (HDL_LANGUAGES.includes(language) && typeof source.testbench === "string"
        && (source.testbenchOpen === true || source.testbench.trim() !== "")) {
      const testbench = makeFile("testbench", "testbench", asText(source.testbench));
      list.push(testbench);

      if (source.testbenchOpen === true) {
        legacyOpen.push(testbench.id);
      }
    }

    (Array.isArray(source.extras) ? source.extras : []).forEach((extra) => {
      if (extra && typeof extra.name === "string" && typeof extra.code === "string") {
        list.push(makeFile("source", stripExtension(extra.name), asText(extra.code)));
      }
    });
  }

  list = list.slice(0, MAX_FILES);

  // unique ids and unique, valid names
  const ids = new Set();
  const names = new Set();

  list = list.map((file) => {
    let { id, name } = file;

    if (ids.has(id)) id = makeId();
    ids.add(id);

    if (!NAME_PATTERN.test(name)) name = defaultName(language, file.role);

    const base = name;
    let counter = 1;

    while (names.has(name.toLowerCase())) {
      counter += 1;
      name = `${base}${counter}`;
    }

    names.add(name.toLowerCase());

    return { ...file, id, name };
  });

  if (list.length === 0) {
    return fallback;
  }

  const exists = (id) => list.some((file) => file.id === id);

  let open = (Array.isArray(source.open) ? source.open : legacyOpen || [])
    .filter(exists)
    .slice(0, MAX_OPEN_WINDOWS);

  if (open.length === 0) {
    open = [list[0].id];
  }

  const active = exists(source.active) && open.includes(source.active)
    ? source.active
    : open[0];

  return { files: list, open, active };
}

function normalizeFiles(input) {
  const files = emptyFiles();

  if (input && typeof input === "object") {
    LANGUAGES.forEach((name) => {
      files[name] = normalizeLanguage(name, input[name]);
    });
  }

  return files;
}


/* =========================================
   WORKSPACE WINDOWS  (the strip under the language bar)
   Each window is its own project: its own language, files,
   open editors and outline. Project data is stored per window id.
========================================= */

const makeWorkspaceId = () =>
  `w${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/* "Verilog 1", "Verilog 2", ... the first title not used yet */
function nextWorkspaceTitle(workspaces, language) {
  const taken = new Set(workspaces.map((item) => item.title));
  let number = 1;

  while (taken.has(`${language} ${number}`)) {
    number += 1;
  }

  return `${language} ${number}`;
}

const makeWorkspace = (language, workspaces) => ({
  id: makeWorkspaceId(),
  language,
  title: nextWorkspaceTitle(workspaces, language)
});

function singleWorkspaceProject(language, project) {
  const workspace = makeWorkspace(language, []);

  return {
    workspaces: [workspace],
    activeWorkspace: workspace.id,
    files: { [workspace.id]: project }
  };
}

/* saved project from before windows existed: one project per language */
function projectFromLegacy(data) {
  const byLanguage = normalizeFiles(data.files);
  const activeLanguage = LANGUAGES.includes(data.language) ? data.language : "Verilog";
  const workspaces = [];
  const files = {};

  LANGUAGES.forEach((name) => {
    const project = byLanguage[name];
    const hasWork =
      project.files.length > 1 || project.files.some((file) => file.code.trim());

    if (name === activeLanguage || hasWork) {
      const workspace = makeWorkspace(name, workspaces);
      workspaces.push(workspace);
      files[workspace.id] = project;
    }
  });

  const active = workspaces.find((item) => item.language === activeLanguage);

  return { workspaces, activeWorkspace: active.id, files };
}

/* saved project in the current format; anything unexpected is dropped */
function normalizeWorkspaces(data) {
  const workspaces = [];
  const files = {};
  const seen = new Set();

  (Array.isArray(data.workspaces) ? data.workspaces : []).forEach((item) => {
    if (
      !item ||
      typeof item.id !== "string" ||
      seen.has(item.id) ||
      !LANGUAGES.includes(item.language) ||
      workspaces.length >= MAX_WORKSPACES
    ) {
      return;
    }

    seen.add(item.id);

    const title =
      typeof item.title === "string" && item.title.trim()
        ? item.title.trim().slice(0, 30)
        : nextWorkspaceTitle(workspaces, item.language);

    workspaces.push({ id: item.id, language: item.language, title });
    files[item.id] = normalizeLanguage(item.language, data.files?.[item.id]);
  });

  if (workspaces.length === 0) {
    return null;
  }

  const activeWorkspace = workspaces.some((item) => item.id === data.activeWorkspace)
    ? data.activeWorkspace
    : workspaces[0].id;

  return { workspaces, activeWorkspace, files };
}


/* =========================================
   SHARE LINK ENCODING  (code -> text in the URL)
========================================= */

function encodeShare(data) {
  const bytes = new TextEncoder().encode(JSON.stringify(data));

  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function decodeShare(text) {
  const base64 = text.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return JSON.parse(new TextDecoder().decode(bytes));
}


/* =========================================
   INITIAL PROJECT
   priority: share link  >  saved project  >  empty
========================================= */

function readInitialProject() {
  try {
    const hash = window.location.hash;

    if (hash.startsWith("#share=")) {
      const data = decodeShare(hash.slice("#share=".length));

      if (data && LANGUAGES.includes(data.language)) {
        const project = normalizeLanguage(data.language, data);

        // show every shared file (up to the window limit)
        project.open = project.files
          .slice(0, MAX_OPEN_WINDOWS)
          .map((file) => file.id);
        project.active = project.open[0];

        return {
          ...singleWorkspaceProject(data.language, project),
          notice:
            "✓ Shared project loaded.\n" +
            "Read the code before you run it: it was written by someone else."
        };
      }
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const restored = normalizeWorkspaces(JSON.parse(saved));

      if (restored) {
        return { ...restored, notice: "✓ Restored your saved project." };
      }
    }

    // projects saved before windows existed
    const legacy = OLD_STORAGE_KEYS
      .map((key) => window.localStorage.getItem(key))
      .find(Boolean);

    if (legacy) {
      return {
        ...projectFromLegacy(JSON.parse(legacy)),
        notice: "✓ Restored your saved project."
      };
    }
  } catch {
    // broken link or blocked storage: fall through to an empty project
  }

  return {
    ...singleWorkspaceProject("Verilog", emptyLanguage("Verilog")),
    notice: "✓ EDA Playground ready"
  };
}


/* =========================================
   COMPONENT
========================================= */

function EDAPlayground() {
  const { user } = useAuth();
  const [initial] = useState(readInitialProject);

  // windows in the strip under the language bar; files are kept per window id
  const [workspaces, setWorkspaces] = useState(initial.workspaces);
  const [activeWorkspace, setActiveWorkspace] = useState(initial.activeWorkspace);
  const [files, setFiles] = useState(initial.files);

  const [isRunning, setIsRunning] = useState(false);
  const [activity, setActivity] = useState("Running");
  const [consoleOutput, setConsoleOutput] = useState(initial.notice);
  const [flashMessage, setFlashMessage] = useState({ text: "", tone: "ok" });
  const [isSaving, setIsSaving] = useState(false);

  const [waveform, setWaveform] = useState(null);
  const [showWaveform, setShowWaveform] = useState(false);

  const [schematic, setSchematic] = useState(null);
  const [showSchematic, setShowSchematic] = useState(false);

  const [renaming, setRenaming] = useState(null);   // { id, where }
  const [renameValue, setRenameValue] = useState("");

  // which Outline entries are expanded: { "fileId:module": true, ... }
  const [outlineOpen, setOutlineOpen] = useState({});

  // bottom panels: which are minimized, and which one (if any) is maximized
  const [panelView, setPanelView] = useState({ minimized: {}, maximized: null });

  const runIdRef = useRef(0);
  const abortRef = useRef(null);
  const runRef = useRef(null);
  const renameGuard = useRef(null);
  const flashTimer = useRef(null);
  const editorsRef = useRef({});      // fileId -> Monaco editor (for "jump to line")
  const bottomRef = useRef(null);

  const currentWorkspace =
    workspaces.find((item) => item.id === activeWorkspace) ?? workspaces[0];
  const language = currentWorkspace.language;
  const current = files[currentWorkspace.id];
  const isScript = SCRIPT_LANGUAGES.includes(language);
  const hasTestbenchSupport = HDL_LANGUAGES.includes(language);
  const extension = FILE_EXTENSIONS[language];

  const fileLabel = (file) => `${file.name}${extension}`;

  const testbenchFile = current.files.find((file) => file.role === "testbench");

  const visiblePanels = {
    console: true,
    waveform: Boolean(showWaveform && waveform),
    schematic: Boolean(showSchematic && schematic)
  };

  const maximizedPanel =
    panelView.maximized && visiblePanels[panelView.maximized]
      ? panelView.maximized
      : null;

  const allMinimized =
    !maximizedPanel &&
    Object.keys(visiblePanels)
      .filter((name) => visiblePanels[name])
      .every((name) => panelView.minimized[name]);

  // a maximized panel is taller: make sure the student can see it
  useEffect(() => {
    if (maximizedPanel) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [maximizedPanel]);

  const outline = current.files
    .filter((file) => file.code.trim())
    .map((file) => ({
      file,
      modules: parseOutline(language, file.code, fileLabel(file))
    }));

  const updateCurrent = (updater) => {
    setFiles((previous) => ({
      ...previous,
      [currentWorkspace.id]: updater(previous[currentWorkspace.id])
    }));
  };

  // The share link is read once. Remove it from the address bar so a
  // refresh does not overwrite the student's later edits.
  useEffect(() => {
    if (window.location.hash.startsWith("#share=")) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, []);

  useEffect(() => () => clearTimeout(flashTimer.current), []);

  // bring the active window tab into view when there are many
  useEffect(() => {
    document
      .getElementById(`workspace-tab-${activeWorkspace}`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [activeWorkspace, workspaces.length]);

  // bring the active file window into view when there are many
  useEffect(() => {
    document
      .getElementById(`window-${current.active}`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [current.active, current.open.length]);


  /* =========================================
     MESSAGES
     The console keeps the output of the last Run / Compile.
     Short status messages (saved, renamed...) appear next to the
     console title and fade away, so they never erase your output.
  ========================================= */

  const flash = (text, tone = "ok") => {
    clearTimeout(flashTimer.current);
    setFlashMessage({ text, tone });

    flashTimer.current = setTimeout(
      () => setFlashMessage({ text: "", tone: "ok" }),
      tone === "error" ? 6000 : 3500
    );
  };

  const appendToConsole = (text) => {
    setConsoleOutput((previous) =>
      previous.trim() ? previous + SEPARATOR + text : text
    );
  };


  /* =========================================
     LANGUAGE / FILE NAMES
  ========================================= */

  const getLanguageId = () => {
    switch (language) {
      case "SystemVerilog":
        return "systemverilog";
      case "VHDL":
        return "vhdl";
      case "TCL":
        return "tcl";
      case "Perl":
        return "perl";
      default:
        return "verilog";
    }
  };

  const clearPanels = () => {
    setWaveform(null);
    setShowWaveform(false);
    setSchematic(null);
    setShowSchematic(false);
    setPanelView({ minimized: {}, maximized: null });
  };

  /* ----- minimize / maximize / restore the bottom panels ----- */

  const minimizePanel = (name) =>
    setPanelView((view) => ({
      maximized: view.maximized === name ? null : view.maximized,
      minimized: { ...view.minimized, [name]: true }
    }));

  const toggleMaximize = (name) =>
    setPanelView((view) =>
      view.maximized === name
        ? { ...view, maximized: null }
        : { maximized: name, minimized: { ...view.minimized, [name]: false } }
    );

  const restorePanel = (name) =>
    setPanelView((view) => ({
      ...view,
      minimized: { ...view.minimized, [name]: false }
    }));

  // closing a panel also forgets that it was minimized / maximized
  const resetPanelView = (name) =>
    setPanelView((view) => ({
      maximized: view.maximized === name ? null : view.maximized,
      minimized: { ...view.minimized, [name]: false }
    }));

  const closeWaveform = () => {
    setShowWaveform(false);
    resetPanelView("waveform");
  };

  const closeSchematic = () => {
    setShowSchematic(false);
    resetPanelView("schematic");
  };

  /* ----- windows (the strip under the language bar) ----- */

  // leaving a window: stop anything still running for it, hide its panels
  const leaveWorkspace = () => {
    runIdRef.current += 1;
    abortRef.current?.abort();

    setIsRunning(false);
    setRenaming(null);
    renameGuard.current = null;
    clearPanels();
  };

  const switchWorkspace = (id) => {
    const target = workspaces.find((item) => item.id === id);

    if (!target || id === currentWorkspace.id) {
      return;
    }

    leaveWorkspace();
    setActiveWorkspace(id);
    flash(`Window: ${target.title}`);
  };

  const addWorkspace = (newLanguage) => {
    if (workspaces.length >= MAX_WORKSPACES) {
      flash(`✕ You can have at most ${MAX_WORKSPACES} windows.`, "error");
      return;
    }

    const workspace = makeWorkspace(newLanguage, workspaces);

    leaveWorkspace();
    setWorkspaces((previous) => [...previous, workspace]);
    setFiles((previous) => ({
      ...previous,
      [workspace.id]: emptyLanguage(newLanguage)
    }));
    setActiveWorkspace(workspace.id);

    flash(`✓ New window: ${workspace.title}`);
  };

  const closeWorkspace = (id) => {
    if (workspaces.length <= 1) {
      flash("✕ Keep at least one window open.", "error");
      return;
    }

    const index = workspaces.findIndex((item) => item.id === id);

    if (index === -1) {
      return;
    }

    const target = workspaces[index];
    const project = files[id];
    const hasWork =
      project &&
      (project.files.length > 1 || project.files.some((file) => file.code.trim()));

    if (hasWork && !window.confirm(`Close ${target.title}? Its files will be deleted.`)) {
      return;
    }

    const remaining = workspaces.filter((item) => item.id !== id);

    if (id === currentWorkspace.id) {
      leaveWorkspace();
      setActiveWorkspace((remaining[index - 1] ?? remaining[0]).id);
    }

    setWorkspaces(remaining);
    setFiles((previous) => {
      const next = { ...previous };
      delete next[id];
      return next;
    });

    flash(`Closed ${target.title}`);
  };

  /* A language button opens that language's window, or makes one
     if there is none yet. The + next to it always makes a new window. */
  const handleLanguageChange = (newLanguage) => {
    if (language === newLanguage) {
      return;
    }

    const existing = workspaces.find((item) => item.language === newLanguage);

    if (existing) {
      switchWorkspace(existing.id);
    } else {
      addWorkspace(newLanguage);
    }
  };


  /* =========================================
     EDITING
  ========================================= */

  const handleEditorChange = (id, value) => {
    const text = value ?? "";

    updateCurrent((state) => ({
      ...state,
      files: state.files.map((file) =>
        file.id === id ? { ...file, code: text } : file
      )
    }));
  };

  const setActive = (id) => {
    if (current.active !== id) {
      updateCurrent((state) => ({ ...state, active: id }));
    }
  };


  /* =========================================
     OPEN / CLOSE WINDOWS
  ========================================= */

  const openFile = (id) => {
    updateCurrent((state) => {
      let open = state.open.includes(id) ? state.open : [...state.open, id];

      // keep the screen readable: at most a few windows side by side
      if (open.length > MAX_OPEN_WINDOWS) {
        const oldest = open.find((openId) => openId !== id && openId !== state.active);
        open = open.filter((openId) => openId !== oldest);
      }

      return { ...state, open, active: id };
    });
  };

  const closeWindow = (id) => {
    updateCurrent((state) => {
      if (state.open.length <= 1) {
        return state;
      }

      const open = state.open.filter((openId) => openId !== id);

      return {
        ...state,
        open,
        active: state.active === id ? open[0] : state.active
      };
    });
  };


  /* =========================================
     NEW FILE / TESTBENCH / DELETE
  ========================================= */

  const startRename = (id, where) => {
    const file = current.files.find((item) => item.id === id);

    if (!file) return;

    renameGuard.current = id;
    setRenaming({ id, where });
    setRenameValue(file.name);
  };

  const handleNewFile = () => {
    if (current.files.length >= MAX_FILES) {
      flash(`✕ You can have at most ${MAX_FILES} files.`, "error");
      return;
    }

    const file = makeFile("source", freeName(current.files, "file"));

    updateCurrent((state) => ({
      ...state,
      files: [...state.files, file],
      open: [...state.open.filter((id) => id !== file.id), file.id].slice(-MAX_OPEN_WINDOWS),
      active: file.id
    }));

    // the name box opens straight away: type the name and press Enter
    renameGuard.current = file.id;
    setRenaming({ id: file.id, where: "window" });
    setRenameValue(file.name);

    flash("New file: type a name and press Enter");
  };

  const handleCreateTestbench = () => {
    if (!hasTestbenchSupport) {
      return;
    }

    if (testbenchFile) {
      openFile(testbenchFile.id);
      flash("Opened the testbench");
      return;
    }

    if (current.files.length >= MAX_FILES) {
      flash(`✕ You can have at most ${MAX_FILES} files.`, "error");
      return;
    }

    const file = makeFile("testbench", freeName(current.files, "testbench", true));

    updateCurrent((state) => ({
      ...state,
      files: [...state.files, file],
      open: [...state.open, file.id].slice(-MAX_OPEN_WINDOWS),
      active: file.id
    }));

    flash(`✓ Created ${fileLabel(file)}`);
  };

  const handleDeleteFile = (id, event) => {
    event.stopPropagation();

    const file = current.files.find((item) => item.id === id);

    if (!file) return;

    if (current.files.length <= 1) {
      flash("✕ A project needs at least one file.", "error");
      return;
    }

    if (!window.confirm(`Delete ${fileLabel(file)}?`)) {
      return;
    }

    updateCurrent((state) => {
      const remaining = state.files.filter((item) => item.id !== id);
      let open = state.open.filter((openId) => openId !== id);

      if (open.length === 0) {
        open = [remaining[0].id];
      }

      return {
        ...state,
        files: remaining,
        open,
        active: state.active === id ? open[0] : state.active
      };
    });
  };


  /* =========================================
     RENAME
  ========================================= */

  const checkName = (raw, id) => {
    const name = stripExtension(raw);

    if (!name) {
      return { error: "✕ The file name cannot be empty." };
    }

    if (!NAME_PATTERN.test(name)) {
      return {
        error: "✕ Use only letters, numbers, _ and - (up to 40 characters)."
      };
    }

    const taken = current.files.some(
      (file) => file.id !== id && file.name.toLowerCase() === name.toLowerCase()
    );

    if (taken) {
      return { error: `✕ A file called "${name}" already exists.` };
    }

    return { name };
  };

  const cancelRename = () => {
    renameGuard.current = null;
    setRenaming(null);
  };

  const commitRename = (fromEnter) => {
    if (!renaming || renameGuard.current !== renaming.id) {
      return;
    }

    const id = renaming.id;
    const result = checkName(renameValue, id);

    if (result.error) {
      flash(result.error, "error");

      // Enter keeps the box open so the name can be fixed;
      // clicking elsewhere simply keeps the old name.
      if (!fromEnter) {
        cancelRename();
      }

      return;
    }

    cancelRename();

    updateCurrent((state) => ({
      ...state,
      files: state.files.map((file) =>
        file.id === id ? { ...file, name: result.name } : file
      )
    }));
  };

  const renderRenameInput = (className) => (
    <input
      className={className}
      autoFocus
      value={renameValue}
      onChange={(event) => setRenameValue(event.target.value)}
      onFocus={(event) => event.target.select()}
      onClick={(event) => event.stopPropagation()}
      onDoubleClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          commitRename(true);
        }

        if (event.key === "Escape") {
          cancelRename();
        }
      }}
      onBlur={() => commitRename(false)}
      spellCheck={false}
      maxLength={44}
    />
  );


  /* =========================================
     RESET
  ========================================= */

  const handleReset = () => {
    const hasWork =
      current.files.length > 1 ||
      current.files.some((file) => file.code.trim());

    if (hasWork && !window.confirm(`Clear all ${language} files?`)) {
      return;
    }

    runIdRef.current += 1;
    abortRef.current?.abort();

    setIsRunning(false);
    cancelRename();
    clearPanels();

    updateCurrent(() => emptyLanguage(language));
    setConsoleOutput("✓ Editor reset");
  };


  /* =========================================
     SAVE  (stored in this browser)
  ========================================= */

  
const handleSave = async () => {
  if (isSaving) {
    return;
  }

  setIsSaving(true);

  // 1) browser copy (always tried first)
  let savedInBrowser = true;

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ v: 3, workspaces, activeWorkspace, files })
    );
  } catch {
    savedInBrowser = false;   // storage blocked or full
  }

  // 2) cloud copy, only when signed in with Google
  try {
    if (user) {
      await Promise.all(
        workspaces.map((workspace) =>
          savePlaygroundProject(user.uid, workspace.id, {
            name: workspace.title,
            language: workspace.language,
            workspaceData: files[workspace.id]
          })
        )
      );

      flash(`✓ Saved to your Google account (${new Date().toLocaleTimeString()})`);
    } else if (savedInBrowser) {
      flash("✓ Saved in this browser. Sign in with Google (top right) to save to your account.");
    } else {
      flash("✕ Could not save. Sign in with Google to save to your account.", "error");
    }
  } catch (error) {
    console.error("Project save failed:", error);

    flash(
      savedInBrowser
        ? "✕ Cloud save failed. Saved in this browser only. Check your connection."
        : "✕ Cloud save failed. Check your connection and try again.",
      "error"
    );
  } finally {
    setIsSaving(false);
  }
};


const handleLoadCloudProjects = async () => {
  if (!user) {
    flash("Please sign in to access your saved projects.", "error");
    return;
  }

  try {
    flash("Loading your saved projects...");

    const projects = await getPlaygroundProjects(user.uid);

    if (!projects.length) {
      flash("No cloud projects found. Save a project first.");
      return;
    }

    if (
      !window.confirm(
        `Found ${projects.length} saved project(s). Loading them will replace your current editor workspace. Continue?`
      )
    ) {
      return;
    }

    const cloudData = {
      workspaces: projects.map((project) => ({
        id: project.id,
        language: project.language,
        title: project.name
      })),
      activeWorkspace: projects[0].id,
      files: Object.fromEntries(
        projects.map((project) => [
          project.id,
          project.workspaceData || {
      files: project.files,
      open: project.open,
      active: project.active
          }
        ])
      )
    };

    const restored = normalizeWorkspaces(cloudData);

    if (!restored) {
      flash("Could not restore the saved projects.", "error");
      return;
    }

    setWorkspaces(restored.workspaces);
    setActiveWorkspace(restored.activeWorkspace);
    setFiles(restored.files);

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        v: 3,
        ...restored
      })
    );

    flash(`✓ Restored ${restored.workspaces.length} cloud project(s).`);
  } catch (error) {
    console.error("Cloud project loading failed:", error);
    flash("✕ Could not load cloud projects.", "error");
  }
};



  /* =========================================
     SHARE  (the code is packed into the link)
  ========================================= */

  const handleShare = async () => {
    if (!current.files.some((file) => file.code.trim())) {
      flash("Write some code first, then share it.", "error");
      return;
    }

    const encoded = encodeShare({
      v: 2,
      language,
      files: current.files.map(({ name, code, role }) => ({ name, code, role }))
    });

    if (encoded.length > MAX_SHARE_LENGTH) {
      flash("✕ Too big to fit in a link. Use Save for yourself.", "error");
      return;
    }

    const url =
      `${window.location.origin}${window.location.pathname}#share=${encoded}`;

    try {
      await navigator.clipboard.writeText(url);
      flash("✓ Share link copied. Anyone who opens it gets your code.");
    } catch {
      appendToConsole("Copy this link to share your code:\n\n" + url);
    }
  };


  /* =========================================
     RUN / COMPILE / STOP
  ========================================= */

  const startBackendCall = (label) => {
    const runId = ++runIdRef.current;
    const controller = new AbortController();

    abortRef.current = controller;

    setActivity(label);
    setIsRunning(true);

    return { runId, signal: controller.signal };
  };

  const projectFiles = () =>
    current.files.map(({ name, code, role }) => ({ name, code, role }));

  const execute = async (mode) => {
    if (!EXECUTION_ENABLED) {
        setConsoleOutput(
            "Online execution is temporarily unavailable while we prepare a secure execution environment."
        );
        return;
    }

    const isCompile = mode === "compile";

    if (isCompile && language === "TCL") {
      setConsoleOutput(
        "ℹ TCL is interpreted, so it has no separate compile step.\n" +
        "Use Run to execute the script."
      );
      return;
    }

    const mainFile = current.files.find((file) => file.role === "design");
    const hasCode = current.files.some((file) => file.code.trim());

    if (isScript ? !mainFile?.code.trim() : !hasCode) {
      setConsoleOutput(
        isScript
          ? `✕ The main script (${mainFile ? fileLabel(mainFile) : "script"}) is empty.`
          : "✕ There is no code to run. Write some code first."
      );
      return;
    }

    const designOnly =
      !isScript && !current.files.some(
        (file) => file.role === "testbench" && file.code.trim()
      );

    const action = isCompile
      ? isScript ? "syntax check" : "compilation"
      : isScript ? "script" : "simulation";

    const { runId, signal } = startBackendCall(
      isCompile ? "Compiling" : "Running"
    );

    setWaveform(null);

    setConsoleOutput(
      `▶ Starting ${language} ${action}` +
      (designOnly && !isScript && !isCompile
        ? " (no testbench, running your design files)"
        : "") +
      "...\n"
    );

    try {
      const response = await fetch(`${API_URL}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal,
        body: JSON.stringify({ language, mode, files: projectFiles() })
      });

      if (!response.ok) {
        throw new Error(`Backend returned HTTP ${response.status}`);
      }

      const result = await response.json();

      // the student pressed Stop (or started something else) meanwhile
      if (runId !== runIdRef.current) {
        return;
      }

      if (result.success) {
        let output = isCompile
          ? `✓ ${language} ${action} successful\n\n`
          : isScript
            ? `✓ ${language} script finished\n\n`
            : `✓ ${language} simulation completed\n\n`;

        if (result.stdout && result.stdout.trim()) {
          output += result.stdout;
        } else if (!isCompile) {
          if (language === "TCL") {
            output += '(No output. Use "puts" to print, e.g. puts "Hello".)';
          } else if (language === "Perl") {
            output += '(No output. Use "print" to print, e.g. print "Hello\\n";)';
          } else if (language === "VHDL") {
            output += '(No output. Use "report" in your testbench to print messages.)';
          } else {
            output +=
              "(Simulation finished with no output. " +
              "Add $display or $monitor to print values.)";
          }
        }

        if (result.stderr && result.stderr.trim()) {
          output += `\n\nWarnings:\n${result.stderr}`;
        }

        setConsoleOutput(output);

        // The waveform is kept, but only opens when the student asks for it.
        if (!isCompile && result.waveform) {
          setWaveform(result.waveform);
          flash("〽 Waveform ready: click the Waveform button to see it");
        }
      } else {
        let output = `✕ ${language} ${result.stage || action} failed\n\n`;

        if (result.stderr) {
          output += result.stderr;
        }

        if (result.stdout) {
          output += `\n\n${result.stdout}`;
        }

        setConsoleOutput(output);
      }
    } catch (error) {
      if (error.name === "AbortError" || runId !== runIdRef.current) {
        return;
      }

      setConsoleOutput(
        `✕ Could not connect to EDA backend.\n\n${error.message}\n\n` +
        `Make sure the FastAPI server is running:\n` +
        `python -m uvicorn main:app --reload --port 8000`
      );
    } finally {
      if (runId === runIdRef.current) {
        setIsRunning(false);
      }
    }
  };

  const handleRun = () => execute("run");
  const handleCompile = () => execute("compile");

  // Ctrl + Enter inside an editor. runRef is refreshed after every render,
  // so the editor always calls the newest version (never a stale one).
  useEffect(() => {
    runRef.current = () => {
      if (!isRunning) {
        execute("run");
      }
    };
  });

  const handleEditorMount = (id, editor, monaco) => {
    editorsRef.current[id] = editor;

    editor.onDidDispose(() => {
      if (editorsRef.current[id] === editor) {
        delete editorsRef.current[id];
      }
    });

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      () => runRef.current()
    );
  };

  /* Open a file (if its window is closed) and put the cursor on a line.
     Used by the Outline: click a module or a variable to go to it. */
  const jumpTo = (fileId, line) => {
    openFile(fileId);

    let tries = 0;

    const attempt = () => {
      const editor = editorsRef.current[fileId];

      if (editor) {
        editor.revealLineInCenter(line);
        editor.setPosition({ lineNumber: line, column: 1 });
        editor.focus();
        return;
      }

      // the window may still be opening
      tries += 1;

      if (tries < 30) {
        setTimeout(attempt, 100);
      }
    };

    setTimeout(attempt, 0);
  };

  const toggleOutline = (key, openByDefault) => {
    setOutlineOpen((previous) => ({
      ...previous,
      [key]: !(previous[key] ?? openByDefault)
    }));
  };

  const handleStop = () => {
    if (!isRunning) {
      flash("Nothing is running.");
      return;
    }

    runIdRef.current += 1;
    abortRef.current?.abort();

    setIsRunning(false);

    appendToConsole(
      "⏹ Stopped.\n(The server ends any long job by itself after a few seconds.)"
    );
  };


  /* =========================================
     RTL SCHEMATIC
     The console is left alone: a failure is added at the end of it,
     and success only shows the schematic panel.
  ========================================= */

  const handleSchematic = async () => {
        if (!EXECUTION_ENABLED) {
        flash("RTL schematic generation is temporarily unavailable.", "error");
        return;
    }

    const sources = current.files.filter(
      (file) => file.role !== "testbench" && file.code.trim()
    );

    if (sources.length === 0) {
      flash("✕ Write a design first (the testbench is not drawn).", "error");
      return;
    }

    const { runId, signal } = startBackendCall("Drawing schematic");

    try {
      const response = await fetch(`${API_URL}/schematic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal,
        body: JSON.stringify({ language, files: projectFiles() })
      });

      if (!response.ok) {
        throw new Error(`Backend returned HTTP ${response.status}`);
      }

      const result = await response.json();

      if (runId !== runIdRef.current) {
        return;
      }

      if (result.success && result.netlist) {
        setSchematic(result.netlist);
        setShowSchematic(true);
        restorePanel("schematic");
        flash("✓ RTL schematic ready");
      } else {
        appendToConsole(
          `✕ RTL schematic ${result.stage || ""} failed\n\n` +
          (result.stderr || result.stdout || "Unknown error")
        );
      }
    } catch (error) {
      if (error.name === "AbortError" || runId !== runIdRef.current) {
        return;
      }

      appendToConsole(
        `✕ Could not connect to EDA backend.\n\n${error.message}`
      );
    } finally {
      if (runId === runIdRef.current) {
        setIsRunning(false);
      }
    }
  };


  /* =========================================
     WAVEFORM BUTTON
  ========================================= */

  const handleWaveformButton = () => {
    if (waveform) {
      if (!showWaveform) {
        setShowWaveform(true);
        restorePanel("waveform");
      } else if (panelView.minimized.waveform) {
        restorePanel("waveform");       // it was minimized: bring it back
      } else {
        closeWaveform();
      }

      return;
    }

    flash("No waveform yet. Run a simulation first (the testbench must change some signals).", "error");
  };


  /* =========================================
     EDITOR WINDOW
  ========================================= */

  const renderWindow = (id) => {
    const file = current.files.find((item) => item.id === id);

    if (!file) {
      return null;
    }

    const isActive = current.active === id;
    const isRenaming = renaming?.id === id && renaming.where === "window";

    return (
      <div
        key={`${language}-${id}`}
        id={`window-${id}`}
        className={`editor-window file-window ${isActive ? "active-window" : ""}`}
        onMouseDownCapture={() => setActive(id)}
      >

        <div className="editor-window-header">

          <div className="editor-window-file">
            <span className="file-icon">{roleIcon(file.role)}</span>

            {isRenaming ? (
              renderRenameInput("rename-input window-rename-input")
            ) : (
              <>
                <span
                  className="window-name"
                  title="Double-click to rename"
                  onDoubleClick={() => startRename(id, "window")}
                >
                  {fileLabel(file)}
                </span>

                <button
                  className="window-rename"
                  title="Rename file"
                  onClick={() => startRename(id, "window")}
                >
                  ✎
                </button>
              </>
            )}

            {file.role !== "source" && (
              <span className="role-badge">{file.role}</span>
            )}
          </div>

          <div className="editor-window-actions">
            {current.open.length > 1 && (
              <button
                className="editor-close-button"
                onClick={() => closeWindow(id)}
                title="Close this window (the file is kept)"
              >
                ×
              </button>
            )}
          </div>

        </div>

        <div className="code-editor">
          <Editor
            height="100%"
            language={getLanguageId()}
            theme="vs-dark"
            value={file.code}
            onChange={(text) => handleEditorChange(id, text)}
            onMount={(editor, monaco) => handleEditorMount(id, editor, monaco)}
            options={{
              automaticLayout: true,
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              wordWrap: "off",
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: "smooth",
              renderWhitespace: "selection",
              tabSize: 4,
              insertSpaces: true,
              padding: { top: 12, bottom: 12 }
            }}
          />
        </div>

      </div>
    );
  };


  /* class names that tell the CSS what each bottom panel should look like */
  const panelClass = (name, base) => {
    let state = "";

    if (maximizedPanel) {
      state = maximizedPanel === name ? "is-maximized" : "is-hidden";
    } else if (panelView.minimized[name]) {
      state = "is-minimized";
    }

    return `${base} ${state}`.trim();
  };

  /* the narrow bar shown instead of a minimized panel */
  const renderStrip = (name, label) => (
    <button
      className="panel-strip"
      onClick={() => restorePanel(name)}
      title={`Restore the ${label.toLowerCase()}`}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
           stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="1.5" y="1.5" width="9" height="9" />
      </svg>
      <span className="strip-label">{label}</span>
    </button>
  );

  return (
    <div className="eda-playground">

      {/* HEADER */}

      <header className="eda-header">

        <div className="eda-title-section">
          <div className="eda-logo">V</div>
          <div>
            <h1>EDA Playground</h1>
            <p>VLSI Learn Development Environment</p>
          </div>
        </div>

        <div className="eda-header-actions">
  <button className="header-action-button" onClick={handleSave} disabled={isSaving}>
  {isSaving ? "⏳ Saving..." : "💾 Save"}
</button>

  <button
    className="header-action-button"
    onClick={handleLoadCloudProjects}
  >
    ☁ Load Saved
  </button>

  <button className="header-action-button" onClick={handleShare}>
    🔗 Share
  </button>
</div>

      </header>


      {/* LANGUAGE BAR */}

      <div className="eda-language-bar">
        {LANGUAGES.map((item) => (
          <div
            key={item}
            className={`language-item ${language === item ? "active" : ""}`}
          >
            <button
              className={`language-tab ${language === item ? "active" : ""}`}
              onClick={() => handleLanguageChange(item)}
            >
              {item}
            </button>

            <button
              className="language-add"
              onClick={() => addWorkspace(item)}
              title={`New ${item} window`}
              aria-label={`New ${item} window`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                   stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <line x1="6" y1="2" x2="6" y2="10" />
                <line x1="2" y1="6" x2="10" y2="6" />
              </svg>
            </button>
          </div>
        ))}
      </div>


      {/* WINDOW STRIP: one tab per window, side by side */}

      <div className="eda-window-bar">

        <span className="window-bar-label">WINDOWS</span>

        <div className="window-bar-tabs" role="tablist" aria-label="Open windows">
          {workspaces.map((item) => {
            const isActive = item.id === currentWorkspace.id;

            return (
              <div
                key={item.id}
                id={`workspace-tab-${item.id}`}
                className={`window-tab ${isActive ? "active" : ""}`}
              >
                <button
                  role="tab"
                  aria-selected={isActive}
                  className="window-tab-main"
                  onClick={() => switchWorkspace(item.id)}
                  title={item.title}
                >
                  <span
                    className={`window-tab-dot lang-${item.language.toLowerCase()}`}
                    aria-hidden="true"
                  />
                  <span className="window-tab-title">{item.title}</span>
                </button>

                {workspaces.length > 1 && (
                  <button
                    className="window-tab-close"
                    onClick={() => closeWorkspace(item.id)}
                    title={`Close ${item.title}`}
                    aria-label={`Close ${item.title}`}
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"
                         stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <line x1="2" y1="2" x2="10" y2="10" />
                      <line x1="10" y1="2" x2="2" y2="10" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>

      </div>


      {/* MAIN WORKSPACE */}

      <div className="eda-workspace">

        {/* PROJECT EXPLORER */}

        <aside className="eda-sidebar">

          <div className="panel-title">PROJECT EXPLORER</div>

          <div className="project-section">

            <div className="project-name">📁 my-project</div>

            {current.files.map((file) => {
              const isRenamingHere =
                renaming?.id === file.id && renaming.where === "explorer";

              return (
                <div
                  key={file.id}
                  className={`file ${current.active === file.id ? "active-file" : ""} ${
                    current.open.includes(file.id) ? "is-open" : ""
                  }`}
                  onClick={() => openFile(file.id)}
                  onDoubleClick={() => startRename(file.id, "explorer")}
                  title="Click to open · double-click to rename"
                >
                  <span className="file-symbol">{roleIcon(file.role)}</span>

                  {isRenamingHere ? (
                    renderRenameInput("rename-input")
                  ) : (
                    <span className="file-name">{fileLabel(file)}</span>
                  )}

                  {!isRenamingHere && (
                    <>
                      <button
                        className="file-action"
                        title="Rename file"
                        onClick={(event) => {
                          event.stopPropagation();
                          startRename(file.id, "explorer");
                        }}
                      >
                        ✎
                      </button>

                      <button
                        className="file-delete"
                        title="Delete file"
                        onClick={(event) => handleDeleteFile(file.id, event)}
                      >
                        ×
                      </button>
                    </>
                  )}
                </div>
              );
            })}

          </div>

          <div className="sidebar-actions">

            <button className="sidebar-button" onClick={handleNewFile}>
              + New File
            </button>

            {hasTestbenchSupport && (
              <button
                className="sidebar-button testbench-button"
                onClick={handleCreateTestbench}
              >
                {testbenchFile ? "🧪 Open Testbench" : "🧪 Create Testbench"}
              </button>
            )}

          </div>

        </aside>


        {/* EDITOR WINDOWS: every open file side by side */}

        <main className="eda-editor-panel">

          <div className="editor-toolbar">

            <div className="editor-toolbar-left">
              <span className="editor-title">CODE EDITOR</span>
              <span className="editor-language">{language}</span>
            </div>

            <div className="editor-actions">
  <button
    className="editor-action save-action"
    onClick={handleSave}
    disabled={isSaving}
    title={user ? "Save to your Google account" : "Save in this browser (sign in to save to your account)"}
  >
    {isSaving ? "⏳ Saving..." : "💾 Save"}
  </button>

  <button className="editor-action" onClick={handleReset}>
    ↻ Reset
  </button>
</div>

          </div>

          <div className="editor-container split-editor-container editor-windows">
            {current.open.map(renderWindow)}
          </div>

        </main>


        {/* OUTLINE: modules, inputs, outputs and variables of your code */}

        <aside className="eda-outline">

          <div className="panel-title">OUTLINE</div>

          <div className="outline-content">

            {outline.length === 0 && (
              <div className="outline-empty">
                Write some code to see its modules, inputs, outputs and
                variables here.
              </div>
            )}

            {outline.map(({ file, modules }) => (
              <div key={file.id} className="outline-file">

                <button
                  className="outline-file-name"
                  onClick={() => openFile(file.id)}
                  title="Open this file"
                >
                  {roleIcon(file.role)} {fileLabel(file)}
                </button>

                {modules.length === 0 && (
                  <div className="outline-empty">
                    {isScript ? "nothing found yet" : `no ${language === "VHDL" ? "entity" : "module"} found yet`}
                  </div>
                )}

                {modules.map((item, itemIndex) => {
                  const itemKey = `${file.id}:${item.name}:${itemIndex}`;
                  const isScriptEntry = item.kind === "script";
                  const itemOpen = isScriptEntry || (outlineOpen[itemKey] ?? true);

                  return (
                    <div key={itemKey}>

                      {!isScriptEntry && (
                        <button
                          className={`outline-item outline-button ${
                            file.role === "testbench" ? "outline-testbench" : ""
                          }`}
                          onClick={() => {
                            toggleOutline(itemKey, true);
                            jumpTo(file.id, item.line);
                          }}
                          title={`${item.kind} ${item.name} (line ${item.line}): click to expand and go to it`}
                        >
                          <span>{itemOpen ? "▾" : "▸"}</span>
                          <strong>{item.kind} {item.name}</strong>
                        </button>
                      )}

                      {itemOpen && item.groups.length === 0 && (
                        <div className="outline-empty outline-indent">
                          no ports or signals
                        </div>
                      )}

                      {itemOpen && item.groups.map((group) => {
                        const groupKey = `${itemKey}:${group.key}`;
                        const groupOpen = outlineOpen[groupKey] ?? false;

                        return (
                          <div key={groupKey}>

                            <button
                              className="outline-child outline-button"
                              onClick={() => toggleOutline(groupKey, false)}
                              title={`Show the ${group.label} variables`}
                            >
                              <span>{groupOpen ? "▾" : "▸"}</span>
                              {group.label}
                              <em className="outline-count">{group.items.length}</em>
                            </button>

                            {groupOpen && group.items.map((variable) => (
                              <button
                                key={`${variable.name}:${variable.line}`}
                                className="outline-var"
                                onClick={() => jumpTo(file.id, variable.line)}
                                title={`${variable.name} ${variable.detail} (line ${variable.line}): click to go to it`}
                              >
                                <span className="outline-var-name">{variable.name}</span>
                                {variable.detail && (
                                  <span className="outline-detail">{variable.detail}</span>
                                )}
                              </button>
                            ))}

                          </div>
                        );
                      })}

                    </div>
                  );
                })}

              </div>
            ))}

          </div>

        </aside>

      </div>


      {/* CONTROLS */}

      <div className="eda-controls">

        <div className="control-group">

          <button
            className="run-button"
            onClick={handleRun}
            disabled={isRunning || !EXECUTION_ENABLED}
            title="Ctrl + Enter"
          >
            {isRunning && activity === "Running" ? "⏳ Running..." : "▶ Run"}
          </button>

          <button onClick={handleCompile} disabled={isRunning || !EXECUTION_ENABLED}>
            ⚙ Compile
          </button>

          <button onClick={handleStop} disabled={!isRunning}>
            ⏹ Stop
          </button>

        </div>

        <div className="control-group">
          {hasTestbenchSupport && (
            <>
              <button onClick={handleSchematic} disabled={isRunning || !EXECUTION_ENABLED}>
                ◇ RTL Schematic
              </button>

              <button
                className={waveform ? "has-data" : ""}
                onClick={handleWaveformButton}
                title={waveform ? "Show / hide the waveform" : "Run a simulation first"}
              >
                〽 Waveform{waveform && !showWaveform ? " •" : ""}
              </button>
            </>
          )}
        </div>

      </div>


      {/* BOTTOM ROW:  console  |  waveform  |  schematic  (side by side) */}

      <div
        ref={bottomRef}
        className={`eda-bottom ${maximizedPanel ? "has-maximized" : ""} ${
          allMinimized ? "is-collapsed" : ""
        }`}
      >

        {/* CONSOLE */}

        <section className={panelClass("console", "eda-console")}>

          {renderStrip("console", "CONSOLE")}

          <div className="bottom-panel-title">
            <span>CONSOLE</span>

            <div className="console-right">
              {flashMessage.text && (
                <span className={`console-flash flash-${flashMessage.tone}`}>
                  {flashMessage.text}
                </span>
              )}

              <button
                className="console-clear"
                onClick={() => setConsoleOutput("")}
                title="Clear the console"
              >
                Clear
              </button>

              <span className="console-status">
                {isRunning ? `● ${activity}...` : "● Ready"}
              </span>

              <PanelButtons
                maximized={maximizedPanel === "console"}
                onMinimize={() => minimizePanel("console")}
                onMaximize={() => toggleMaximize("console")}
              />
            </div>
          </div>
          {flashMessage.text && (
  <div className={`save-toast flash-${flashMessage.tone}`} role="status">
    {flashMessage.text}
  </div>
)}

          <div className="console-content">
            <pre className="console-output">{consoleOutput}</pre>
          </div>

        </section>


        {/* WAVEFORM: opens only when the Waveform button is clicked */}

        {visiblePanels.waveform && (
          <section className={panelClass("waveform", "eda-waveform")}>
            {renderStrip("waveform", "WAVEFORM")}

            <WaveformPanel
              waveform={waveform}
              maximized={maximizedPanel === "waveform"}
              onMinimize={() => minimizePanel("waveform")}
              onMaximize={() => toggleMaximize("waveform")}
              onClose={closeWaveform}
            />
          </section>
        )}


        {/* RTL SCHEMATIC */}

        {visiblePanels.schematic && (
          <section className={panelClass("schematic", "eda-schematic")}>
            {renderStrip("schematic", "SCHEMATIC")}

            <SchematicViewer
              netlist={schematic}
              maximized={maximizedPanel === "schematic"}
              onMinimize={() => minimizePanel("schematic")}
              onMaximize={() => toggleMaximize("schematic")}
              onClose={closeSchematic}
            />
          </section>
        )}

      </div>

    </div>
  );
}

export default EDAPlayground;
