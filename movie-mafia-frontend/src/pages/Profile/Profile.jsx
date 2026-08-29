import { useAuth } from "@/context/AuthContext";
import { UserRound, Mail, ShieldCheck, Crown, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen px-4 pb-12 pt-28 sm:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <Link
          className="relative z-20 text-white font-bold mb-2 p-3 m-3 bg-white/7 rounded-2xl flex justify-center items-center gap-3 hover:scale-95 w-45"
          to="/"
        >
          <span>
            <ArrowLeft size={20} />
          </span>
          Back to Home
        </Link>

        {/* Profile Header */}
        <div className="rounded-3xl border border-white/10 bg-black/20 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/10">
              <p className="text-5xl font-bold  text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </p>
            </div>

            <div className="flex items-center gap-2 text-white">
              <UserRound size={20} />
              <h1 className="text-2xl font-bold sm:text-3xl">Profile</h1>
            </div>

            <p className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Welcome, {user?.name}
            </p>

            <p className="mt-1 text-sm text-white/50">
              Manage your Movie Mafia account
            </p>
          </div>
        </div>

        {/* Account Details */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl sm:p-8">
          <h2 className="mb-6 text-lg font-semibold text-white">
            Account Details
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Email */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex items-center gap-3 text-white/50">
                <Mail size={19} />
                <span className="text-sm">Email</span>
              </div>

              <p className="truncate font-medium text-white">{user?.email}</p>
            </div>

            {/* Role */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex items-center gap-3 text-white/50">
                <ShieldCheck size={19} />
                <span className="text-sm">Role</span>
              </div>

              <p className="font-medium capitalize text-white">{user?.role}</p>
            </div>

            {/* Subscription */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:col-span-2">
              <div className="mb-3 flex items-center gap-3 text-white/50">
                <Crown size={19} />
                <span className="text-sm">Subscription</span>
              </div>

              <p className="font-medium capitalize text-white">
                {user?.subscription}
              </p>
            </div>
          </div>
        </div>

        {/* Future Features Block */}
        <div className="mt-6 min-h-48 rounded-3xl border border-dashed border-white/10 bg-white/2 p-6 backdrop-blur-xl sm:p-8">
          <h2 className="text-lg font-semibold text-white">Account Settings</h2>

          <p className="mt-2 text-sm text-white/40">
            More profile options will be added here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
