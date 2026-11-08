
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function UserMenu() {
  const {
    user,
    loading,
    signInWithGoogle,
    signOut
  } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const rootRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleLogin = async () => {
    setBusy(true);
    setError("");

    try {
      await signInWithGoogle();
      setOpen(false);
    } catch (err) {
      console.error("Google login error:", err);

      if (err.code === "auth/popup-closed-by-user") {
        setError("Login cancelled. Please try again.");
      } else if (err.code === "auth/popup-blocked") {
        setError("Popup blocked. Please allow popups.");
      } else if (err.code === "auth/unauthorized-domain") {
        setError("This domain is not authorized in Firebase.");
      } else {
        setError("Unable to sign in. Please try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    setBusy(true);
    setError("");

    try {
      await signOut();
      setOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
      setError("Unable to logout. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleMyProjects = () => {
    setOpen(false);
    navigate("/my-projects");
  };

  const initials = (user?.displayName || user?.email || "U")
    .trim()
    .split(/\s+/)
    .map(part => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="user-menu" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className={`user-circle ${user ? "logged-in" : "logged-out"}`}
        onClick={() => {
          setOpen(!open);
          setError("");
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={user ? "Open account menu" : "Sign in"}
        title={user?.displayName || user?.email || "Sign in"}
        disabled={loading}
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="user-avatar"
            referrerPolicy="no-referrer"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : user ? (
          initials
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
          </svg>
        )}
      </button>

      {open && (
        <div className="user-popover" role="dialog" aria-label="Account">
          {loading ? (
            <p>Loading account...</p>
          ) : user ? (
            <>
              <div className="user-card">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="user-circle-large user-avatar"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="user-circle-large">
                    {initials}
                  </span>
                )}

                <div className="user-card-text">
                  <strong>
                    {user.displayName || "VLSI Learn User"}
                  </strong>
                  <span>{user.email}</span>
                </div>
              </div>

              {/* My Projects */}
              <button
                type="button"
                className="user-my-projects"
                onClick={handleMyProjects}
              >
                <span>📁</span>
                My Projects
              </button>

              {/* Sign Out */}
              <button
                type="button"
                className="user-signout"
                onClick={handleLogout}
                disabled={busy}
              >
                {busy ? "Signing out..." : "Sign out"}
              </button>
            </>
          ) : (
            <>
              <h3>Welcome to VLSI Learn</h3>

              <p className="user-hint">
                Sign in with your Google account to continue learning.
              </p>

              <button
                type="button"
                className="user-google-signin"
                onClick={handleLogin}
                disabled={busy}
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt=""
                />
                {busy ? "Connecting..." : "Continue with Google"}
              </button>
            </>
          )}

          {error && (
            <p className="user-error" role="alert">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserMenu;
