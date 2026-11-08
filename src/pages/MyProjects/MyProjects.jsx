
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getPlaygroundProjects,
  savePlaygroundProject,
  deletePlaygroundProject
} from "../../utils/firestore";
import "./MyProjects.css";

const LANGUAGES = [
  "All",
  "Verilog",
  "SystemVerilog",
  "VHDL",
  "TCL",
  "Perl"
];

const LANGUAGE_ICONS = {
  Verilog: "V",
  SystemVerilog: "SV",
  VHDL: "VH",
  TCL: "TCL",
  Perl: "PL"
};

function formatDate(timestamp) {
  if (!timestamp) return "Recently saved";

  const date = timestamp.toDate
    ? timestamp.toDate()
    : new Date(timestamp);

  if (Number.isNaN(date.getTime())) return "Recently saved";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function MyProjects() {
  const { user, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  const loadProjects = async () => {
    if (!user) {
      setProjects([]);
      setFetching(false);
      return;
    }

    try {
      setFetching(true);
      setError("");

      const savedProjects = await getPlaygroundProjects(user.uid);
      setProjects(savedProjects);
    } catch (err) {
      console.error("Failed to load projects:", err);
      setError("Unable to load your projects. Please try again.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      loadProjects();
    }
  }, [user, loading]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = (project.name || "Untitled Project")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesLanguage =
        selectedLanguage === "All" ||
        project.language === selectedLanguage;

      return matchesSearch && matchesLanguage;
    });
  }, [projects, search, selectedLanguage]);

  const openProject = (project) => {
    navigate(
      `/eda-playground?projectId=${encodeURIComponent(project.id)}`
    );
  };

  const renameProject = async (project) => {
    const newName = window.prompt(
      "Enter a new project name:",
      project.name || "Untitled Project"
    );

    if (newName === null) return;

    const trimmedName = newName.trim();

    if (!trimmedName) {
      window.alert("Project name cannot be empty.");
      return;
    }

    try {
      await savePlaygroundProject(user.uid, project.id, {
        name: trimmedName,
        language: project.language,
        workspaceData: project.workspaceData
      });

      await loadProjects();
    } catch (err) {
      console.error("Rename failed:", err);
      window.alert("Could not rename the project. Please try again.");
    }
  };

  const removeProject = async (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name || "Untitled Project"}"? This cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await deletePlaygroundProject(user.uid, project.id);
      setProjects((previous) =>
        previous.filter((item) => item.id !== project.id)
      );
    } catch (err) {
      console.error("Delete failed:", err);
      window.alert("Could not delete the project. Please try again.");
    }
  };

  if (loading || fetching) {
    return (
      <div className="my-projects-page">
        <div className="projects-loading">
          <div className="projects-spinner"></div>
          <p>Loading your projects...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="my-projects-page">
        <div className="projects-login-card">
          <div className="projects-login-icon">📁</div>
          <h1>Sign in to view your projects</h1>
          <p>
            Your saved EDA Playground projects will appear here.
            Sign in with Google to access them.
          </p>
          <button
            className="projects-primary-btn"
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-projects-page">
      <div className="my-projects-container">

        <div className="projects-heading">
          <div>
            <div className="projects-eyebrow">
              EDA PLAYGROUND
            </div>
            <h1>My Projects</h1>
            <p>
              Your saved workspaces, all in one place.
            </p>
          </div>

          <button
            className="projects-primary-btn"
            onClick={() => navigate("/eda-playground")}
          >
            <span>＋</span> New Project
          </button>
        </div>

        <div className="projects-summary">
          <div className="projects-summary-icon">📂</div>
          <div>
            <strong>{projects.length}</strong>
            <span>
              {projects.length === 1 ? "Saved project" : "Saved projects"}
            </span>
          </div>
        </div>

        <div className="projects-toolbar">
          <div className="projects-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search your projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="projects-filters">
            {LANGUAGES.map((language) => (
              <button
                key={language}
                className={
                  selectedLanguage === language ? "active" : ""
                }
                onClick={() => setSelectedLanguage(language)}
              >
                {language}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="projects-error">
            {error}
            <button onClick={loadProjects}>Retry</button>
          </div>
        )}

        {!error && filteredProjects.length > 0 && (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-card-top">
                  <div
                    className={`project-language-icon ${(
                      project.language || "Verilog"
                    ).toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {LANGUAGE_ICONS[project.language] || "EDA"}
                  </div>

                  <div className="project-card-menu">
                    <button
                      title="Rename project"
                      onClick={() => renameProject(project)}
                    >
                      ✎
                    </button>
                    <button
                      title="Delete project"
                      className="project-delete-btn"
                      onClick={() => removeProject(project)}
                    >
                      🗑
                    </button>
                  </div>
                </div>

                <div className="project-card-content">
                  <span className="project-language">
                    {project.language || "Unknown language"}
                  </span>

                  <h3>
                    {project.name || "Untitled Project"}
                  </h3>

                  <p className="project-updated">
                    Last updated: {formatDate(project.updatedAt)}
                  </p>
                </div>

                <div className="project-card-footer">
                  <button
                    className="project-open-btn"
                    onClick={() => openProject(project)}
                  >
                    Open Project <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {!error && projects.length === 0 && (
          <div className="projects-empty">
            <div className="projects-empty-icon">📁</div>
            <h2>No projects yet</h2>
            <p>
              Your saved EDA Playground workspaces will appear here.
              Start coding and save your first project.
            </p>
            <button
              className="projects-primary-btn"
              onClick={() => navigate("/eda-playground")}
            >
              Open EDA Playground
            </button>
          </div>
        )}

        {!error && projects.length > 0 && filteredProjects.length === 0 && (
          <div className="projects-empty projects-no-results">
            <div className="projects-empty-icon">⌕</div>
            <h2>No matching projects</h2>
            <p>Try another search term or language filter.</p>
            <button
              className="projects-secondary-btn"
              onClick={() => {
                setSearch("");
                setSelectedLanguage("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default MyProjects;
