import React, { useState, useEffect } from "react";
import { fetchCurrentUser, updateUserProfile } from "@/api/userApi"; // <-- import

const DEMO_BIOS = [
    "Building tomorrow, one line of code at a time.",
    "Just another adventurer in the land of Chemnitz.",
    "Cultural explorer and coffee enthusiast.",
    "Bringing ideas to life through tech.",
    "Keep calm and discover Chemnitz!"
];

function getRandomBio() {
    return DEMO_BIOS[Math.floor(Math.random() * DEMO_BIOS.length)];
}

export default function UserInfo() {
    const [user, setUser] = useState<any>(null);
    const [form, setForm] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [bio, setBio] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    useEffect(() => {
        async function loadUser() {
            setLoading(true);
            try {
                const u = await fetchCurrentUser();
                setUser(u);
                setForm(u);
                setBio(getRandomBio());
            } catch {
                setUser(null);
                setForm(null);
                setBio(getRandomBio());
            }
            setLoading(false);
        }
        loadUser();
    }, []);

    if (loading) return <div>Loading profile...</div>;
    if (!user) return <div>User not found or not logged in.</div>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setError(null);
        setSuccess(null);

        const payload: { name: string; password?: string } = { name: form.name };
        if (form.password && form.password.trim()) {
            payload.password = form.password;
        }
        try {
            const updated = await updateUserProfile({
                name: form.name,
                password: form.password,
            });
            setUser(updated);
            setForm(updated);
            setIsEditing(false);
            setSuccess("Profile updated successfully!");
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Failed to update profile. Please try again."
            );
        }
    };

    const handleCancel = () => {
        setForm(user);
        setIsEditing(false);
        setError(null);
        setSuccess(null);
    };

    return (
        <div className="flex flex-col items-center gap-5 w-full rounded-3xl p-6 bg-gradient-to-b from-[#f6fef5] to-[#eaf8ec] shadow-lg max-w-sm mx-auto border border-[#d7edd8]">
            <div className="rounded-full border-4 border-[#7bac7c] p-1 mb-2 bg-white shadow-md">
                <img
                    src={'/assets/image/profile.png'}
                    alt={user.name}
                    className="rounded-full w-28 h-28 object-cover shadow-lg"
                />
            </div>

            {isEditing ? (
                <form
                    className="flex flex-col gap-4 w-full"
                    onSubmit={e => { e.preventDefault(); handleSave(); }}
                >
                    <div>
                        <label htmlFor="name" className="block text-xs font-medium text-[#446c47] mb-1">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            className="w-full  px-4 py-2 rounded-xl border border-[#b6d3b7] focus:ring-2 focus:ring-[#7bac7c] shadow"
                            value={form.name}
                            onChange={handleChange}
                            required
                            autoFocus
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-xs font-medium text-[#446c47] mb-1">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="w-full text-base px-4 py-2 rounded-xl border border-[#b6d3b7] focus:ring-2 focus:ring-[#7bac7c] shadow"
                            value={form.password || ""}
                            onChange={handleChange}
                            placeholder="New Password"
                            autoComplete="off"
                        />
                    </div>
                    {/* <div>
            <span className="block text-xs font-medium text-[#446c47] mb-1">Bio</span>
            <span className="inline-block px-3 py-2 rounded-full bg-[#f5f5f5] border border-[#cde3ce] text-[#4d694e] text-xs shadow-sm transition-all">
              {bio}
            </span>
            <span className="block text-[10px] text-gray-400 mt-1">* Bio is for demo only</span>
          </div> */}
                    <div className="flex w-full gap-3 mt-1">
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-[#7bac7c] text-white rounded-2xl font-semibold shadow transition hover:bg-[#6aa46b]"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="flex-1 px-4 py-2 bg-black/5 text-gray-900 rounded-2xl font-semibold shadow transition hover:bg-black/10"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="text-2xl font-bold text-gray-800">{user.name}</div>
                    {/* <span className="inline-block px-4 py-2 rounded-2xl bg-[#ffffff] border border-[#cde3ce] text-[#558062] text-xs font-semibold shadow mb-2 mt-1">
            {bio}
          </span> */}
                    <button
                        className="mt-2 px-6 py-2 bg-[#7bac7c] text-white rounded-full font-semibold shadow transition hover:bg-[#6aa46b] focus:outline-none"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                </>
            )}
        </div>
    );
}
