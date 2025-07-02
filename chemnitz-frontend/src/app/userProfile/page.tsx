"use client";
import UserFavorites from "@/components/userprofile/UserFavorites";
import UserInfo from "@/components/userprofile/UserInfo";

export default function UserProfilePage() { 

   async function handleLogout() {
    try {
      const res = await fetch('http://localhost:5000/api/auth/logout', { method: 'POST', credentials: 'include' });
      if (!res.ok) {
        throw new Error('Logout failed');
      }
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed. Please try again.");
    }
  }

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
        onClick={handleLogout}
      >
        Log Out
      </button>
    </>
  );

  return (
    <div className="bg-[#f7faf9] min-h-screen">

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

      <div className="flex flex-col md:flex-row">

        <aside className="md:w-1/3 max-w-xs w-full mx-auto md:mx-0 md:h-[100vh] flex flex-col items-center justify-center md:justify-start bg-white shadow-xl rounded-3xl md:rounded-none p-8 md:pt-15 md:pb-12 border-r border-[#e8ede9]">
          <UserInfo />
        </aside>

        <main className="flex-1 px-2 py-10 md:px-8 md:py-16 flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 tracking-tight">
            <span className="text-green-500">Your</span> Favourites
          </h2>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <UserFavorites />
          </div>
        </main>
      </div>
    </div>
  );
}
