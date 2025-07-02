import React from 'react'
import { useState } from "react";

const initialUser = {
    name: "Anna Müller",
    username: "@annam",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Travel enthusiast. Exploring Chemnitz one spot at a time.",
    location: "Chemnitz, Germany",
};



export default function UserInfo() {

    const [user, setUser] = useState(initialUser);
    const [form, setForm] = useState(user);
    const [isEditing, setIsEditing] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setUser(form);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setForm(user);
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col items-center gap-3 w-full">

            <div className="rounded-full border-4 border-green-500 p-1 mb-2">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="rounded-full w-28 h-28 object-cover shadow-lg"
                />
            </div>
            {isEditing ? (
                <form className="flex flex-col gap-2 w-full" onSubmit={e => { e.preventDefault(); handleSave(); }}>

                    <input
                        name="name"
                        className="text-lg font-bold text-gray-800 px-3 py-1 rounded-xl border focus:ring-2 focus:ring-green-200"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        name="username"
                        className="text-sm text-gray-500 px-3 py-1 rounded-xl border focus:ring-2 focus:ring-green-200"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <div className="flex items-center gap-2 text-green-700 mt-1">
                        <svg width={18} height={18} fill="none" viewBox="0 0 20 20"><path d="M10 2a7 7 0 0 1 7 7c0 5.25-7 9-7 9s-7-3.75-7-9a7 7 0 0 1 7-7Zm0 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" fill="#22c55e" /></svg>
                        <input
                            name="location"
                            className="text-xs bg-transparent border-b border-green-200 focus:ring-0 px-1 py-0.5 text-green-700"
                            value={form.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <textarea
                        name="bio"
                        className="text-gray-700 text-center mt-2 mb-2 px-3 py-2 rounded-xl border focus:ring-2 focus:ring-green-200"
                        value={form.bio}
                        onChange={handleChange}
                        rows={3}
                        maxLength={160}
                        placeholder="Your bio"
                    />
                    <div className="flex w-full gap-2 mt-3">
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-2xl font-semibold shadow transition hover:bg-green-600"
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
                    <div className="text-sm text-gray-500">{user.username}</div>
                    <div className="flex items-center gap-2 text-green-700 mt-2">
                        <svg width={18} height={18} fill="none" viewBox="0 0 20 20"><path d="M10 2a7 7 0 0 1 7 7c0 5.25-7 9-7 9s-7-3.75-7-9a7 7 0 0 1 7-7Zm0 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" fill="#22c55e" /></svg>
                        <span className="text-xs">{user.location}</span>
                    </div>
                    <p className="text-gray-700 text-center mt-4 mb-2">{user.bio}</p>
                    <button
                        className="mt-3 px-6 py-2 bg-green-500 text-white rounded-full font-semibold shadow transition hover:bg-green-600 focus:outline-none"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                </>
            )}
        </div>
    )
}
