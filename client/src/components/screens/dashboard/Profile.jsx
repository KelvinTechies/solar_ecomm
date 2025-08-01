import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  // fetchUser,
  // selectCurrentUser,
  selectAuthLoading,
  selectAuthError,
} from "../../../reducx/authSlice";
import useLoggedInUser from "../../../services/app";
import Spinner from "../../Spinner";

const Profile = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const { auth, refetchUser } = useLoggedInUser();

    const [activeTab, setActiveTab] = useState("profile");
    const [up_Loading, setUpLoading] = useState();
    const [profileForm, setProfileForm] = useState({
      name: "",
      email: "",
    });
    const [passwordForm, setPasswordForm] = useState({
      current_password: "",
      password: "",
      password_confirmation: "",
    });
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
      if (auth) {
        setProfileForm({
          name: auth.name || "",
          email: auth.email || "",
        });
      }
    }, [auth]);

const handleProfileSubmit = async (e) => {
  e.preventDefault();
  setUpLoading(true);
  try {
    const result = await dispatch(updateUser(profileForm)).unwrap();
    if (result.status === "success") {
      await refetchUser();
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    }
  } catch (error) {
    console.error("Update failed:", error);
  } finally {
    setUpLoading(false); // Make sure to set loading to false even if there's an error
  }
};

const handlePasswordSubmit = async (e) => {
  e.preventDefault();
  if (passwordForm.password !== passwordForm.password_confirmation) {
    return;
  }

  setUpLoading(true);
  try {
    const result = await dispatch(updateUser(passwordForm)).unwrap();
    if (result.status === "success") {
      await refetchUser();
      setUpdateSuccess(true);
      setPasswordForm({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
      setTimeout(() => setUpdateSuccess(false), 3000);
    }
  } catch (error) {
    console.error("Password update failed:", error);
  } finally {
    setUpLoading(false);
  }
};




  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "profile" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    Profile Details
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "password" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("password")}
                  >
                    Change Password
                  </button>
                </li>
              </ul>
            </div>

            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error.message}
                </div>
              )}

              {updateSuccess && (
                <div className="alert alert-success" role="alert">
                  Profile updated successfully!
                </div>
              )}

              {activeTab === "profile" ? (
                <form onSubmit={handleProfileSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handlePasswordSubmit}>
                  <div className="mb-3">
                    <label htmlFor="current_password" className="form-label">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="current_password"
                      value={passwordForm.current_password}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          current_password: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="new_password" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="new_password"
                      value={passwordForm.password}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="password_confirmation"
                      className="form-label"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password_confirmation"
                      value={passwordForm.password_confirmation}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          password_confirmation: e.target.value,
                        })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
