"use client";
import { useState } from "react";
import Header from "@/components/general/Header"; // If you want your real header as well

const initialUser = {
  name: "Anna Müller",
  username: "@annam",
  avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  bio: "Travel enthusiast. Exploring Chemnitz one spot at a time.",
  location: "Chemnitz, Germany",
};

const favourites = [
   {
    id: "way/23757830",
    title: "Sächsisches Eisenbahnmuseum",
    description: "One of the largest railway museums in Germany.",
    image: "/assets/image/loginBg.png",
    link: "https://www.sem-chemnitz.de/",
  },
  {
    id: "way/102957382",
    title: "Restaurant Villa Esche",
    description: "Historic restaurant with classic Saxon cuisine.",
    image: "/assets/image/loginBg1.png",
    link: "http://www.restaurant-villaesche.de/",
  },
];

export default function UserProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(user);
  const [favs, setFavs] = useState(favourites);

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

  const TopRightButtons = () => (
    <>
      <button
        className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold shadow transition"
        onClick={() => window.location.href = "/"}
      >
        Home
      </button>
      <button
        className="px-5 py-2 bg-black/80 hover:bg-black text-white rounded-full font-semibold shadow transition"
        onClick={() => {
          // Your log out logic here
          alert('Logged out!');
        }}
      >
        Log Out
      </button>
    </>
  );

  return (
    <div className="bg-[#f7faf9] min-h-screen">
      {/* Top right floating for desktop/tablet */}
      <div className="fixed top-4 right-6 z-[100] hidden md:flex  gap-4 whitespace-nowrap">
        <TopRightButtons />
      </div>

      {/* Mobile header with buttons */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 bg-white shadow z-50 sticky top-0 left-0">
        <div className="flex items-center gap-2">
          <img
            src="/assets/icon/headericon.png"
            alt=""
            className="w-10"
          />
        </div>
        <div className="flex gap-2">
          <TopRightButtons />
        </div>
      </div>

      {/* If you want your main header above the desktop/tablet content, you can add it here: */}
      {/* <div className="hidden md:block">
        <Header />
      </div> */}

      <div className="flex flex-col md:flex-row">
        {/* ...sidebar and main content, as before... */}
        <aside className="md:w-1/3 max-w-xs w-full mx-auto md:mx-0 md:h-[100vh] flex flex-col items-center justify-center md:justify-start bg-white shadow-xl rounded-3xl md:rounded-none p-8 md:pt-15 md:pb-12 border-r border-[#e8ede9]">
          <div className="flex flex-col items-center gap-3 w-full">
            {/* ...profile form/content as before... */}
            {/* REMOVE the Home and Log Out buttons from here! */}
            <div className="rounded-full border-4 border-green-500 p-1 mb-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="rounded-full w-28 h-28 object-cover shadow-lg"
              />
            </div>
            {isEditing ? (
              <form className="flex flex-col gap-2 w-full" onSubmit={e => { e.preventDefault(); handleSave(); }}>
                {/* ...inputs... */}
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
        </aside>

        {/* ...your favourites section as before... */}
        <main className="flex-1 px-2 py-10 md:px-8 md:py-16 flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 tracking-tight">
            <span className="text-green-500">Your</span> Favourites
          </h2>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favs.length === 0 ? (
              <div className="col-span-full text-gray-500 italic">No favorites yet. Start exploring Chemnitz!</div>
            ) : (
              favs.map((fav) => (
                <a
                  key={fav.id}
                  href={fav.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col overflow-hidden border border-transparent hover:border-green-400"
                >
                  <img
                    src={fav.image}
                    alt={fav.title}
                    className="h-40 w-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="flex-1 flex flex-col p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg text-gray-800 group-hover:text-green-600">{fav.title}</h3>
                      <button
                        className="ml-2 p-1 bg-black/5 hover:bg-green-100 rounded-full transition"
                        aria-label="Remove from favorites"
                        onClick={e => {
                          e.preventDefault();
                          setFavs((prev) => prev.filter((item) => item.id !== fav.id));
                        }}
                      >
                        <svg width={20} height={20} fill="none" viewBox="0 0 20 20">
                          <path d="M6 6l8 8M6 14L14 6" stroke="#18181b" strokeWidth={2} strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-600 mt-2 mb-3 line-clamp-2">{fav.description}</p>
                    <span className="inline-block text-green-700 text-xs font-medium bg-green-100 rounded-full px-3 py-1 mt-auto self-start">Explore</span>
                  </div>
                </a>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
