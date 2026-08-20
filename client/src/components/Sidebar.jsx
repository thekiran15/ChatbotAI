
import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'
import toast from 'react-hot-toast'

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {

  const {
    chats,
    setSelectedChat,
    theme,
    setTheme,
    user,
    navigate,
    createNewChat,
    axios,
    setChats,
    fetchUsersChats,
    setToken,
    token
  } = useAppContext()

  const [search, setSearch] = useState('')

  // ============================
  // LOGOUT
  // ============================

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    toast.success('Logged out successfully')
  }

  // ============================
  // DELETE CHAT
  // ============================

  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation()

      const confirmDelete = window.confirm(
        'Are you sure you want to delete this chat?'
      )

      if (!confirmDelete) return

      const { data } = await axios.post(
        '/api/chat/delete',
        { chatId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (data.success) {
        setChats(prev => prev.filter(chat => chat._id !== chatId))
        await fetchUsersChats()
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      )
    }
  }

  return (
    <div
      className={`flex flex-col h-screen min-w-72 p-5
        dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30
        border-r border-[#80609F]/30 backdrop-blur-3xl
        transition-all duration-500
        max-md:absolute left-0 z-10
        ${!isMenuOpen && 'max-md:-translate-x-full'}`
      }
    >

      {/* ============================
          LOGO
      ============================ */}

      <img
        src={
          theme === 'dark'
            ? assets.logo_full
            : assets.logo_full_dark
        }
        alt="ChatbotAI"
        className="w-full max-w-48"
      />

      {/* ============================
          NEW CHAT
      ============================ */}

      <button
        onClick={createNewChat}
        className="flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer"
      >
        <span className="mr-2 text-xl">+</span>
        New Chat
      </button>

      {/* ============================
          SEARCH
      ============================ */}

      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md">

        <img
          src={assets.search_icon}
          className="w-4 h-4 not-dark:invert"
          alt="Search"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search conversations"
          className="text-xs placeholder:text-gray-400 outline-none bg-transparent w-full"
        />

      </div>

      {/* ============================
          RECENT CHATS
      ============================ */}

      {chats.length > 0 && (
        <p className="mt-4 text-sm">
          Recent Chats
        </p>
      )}

      <div className="flex-1 overflow-y-auto mt-3 text-sm space-y-3 scrollbar-hide">

        {chats
          .filter(chat =>
            chat.messages.length > 0
              ? chat.messages[0].content
                  .toLowerCase()
                  .includes(search.toLowerCase())
              : chat.name
                  .toLowerCase()
                  .includes(search.toLowerCase())
          )
          .map(chat => (

            <div
              key={chat._id}
              onClick={() => {
                setSelectedChat(chat)
                setIsMenuOpen(false)
                navigate('/')
              }}
              className="p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between items-center gap-3"
            >

              {/* Chat information */}

              <div className="overflow-hidden flex-1">

                <p className="truncate">
                  {chat.messages.length > 0
                    ? chat.messages[0].content.slice(0, 32)
                    : chat.name}
                </p>

                <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
                  {moment(chat.updatedAt).fromNow()}
                </p>

              </div>

              {/* DELETE ICON */}

              <img
                src={assets.bin_icon}
                alt="Delete chat"
                onClick={(e) => {
                  e.stopPropagation()

                  toast.promise(
                    deleteChat(e, chat._id),
                    {
                      loading: 'Deleting...'
                    }
                  )
                }}
                className="
                  w-5
                  h-5
                  flex-shrink-0
                  cursor-pointer
                  not-dark:invert
                  hover:scale-110
                  transition-transform
                "
              />

            </div>
          ))}
      </div>

      {/* ============================
          COMMUNITY
      ============================ */}

      <div
        onClick={() => {
          navigate('/community')
          setIsMenuOpen(false)
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-105 transition-all"
      >

        <img
          src={assets.gallery_icon}
          className="w-4 h-4 not-dark:invert flex-shrink-0"
          alt="Community"
        />

        <p className="text-sm">
          Community Images
        </p>

      </div>

      {/* ============================
          CREDITS
      ============================ */}

      <div
  onClick={() => {
    navigate('/credits')
    setIsMenuOpen(false)
  }}
  className="flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-105 transition-all"
>
  <img
    src={assets.diamond_icon}
    className="w-5 h-5 flex-shrink-0 dark:invert"
    alt="Credits"
  />

  <div className="flex flex-col text-sm overflow-hidden">
    <p>Credits : {user?.credits}</p>
    <p className="text-xs text-gray-400 truncate">
      Purchase credits to use QuickGPT
    </p>
  </div>
</div>
      {/* ============================
          DARK MODE
      ============================ */}

      <div className="flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md">

        <div className="flex items-center gap-2 text-sm">

          <img
            src={assets.theme_icon}
            className="w-4 h-4 not-dark:invert"
            alt="Theme"
          />

          <p>
            Dark Mode
          </p>

        </div>

        <label className="relative inline-flex cursor-pointer">

          <input
            type="checkbox"
            className="sr-only peer"
            checked={theme === 'dark'}
            onChange={() =>
              setTheme(
                theme === 'dark'
                  ? 'light'
                  : 'dark'
              )
            }
          />

          <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all"></div>

          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>

        </label>

      </div>

      {/* ============================
          USER ACCOUNT / LOGOUT
      ============================ */}

      <div className="flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md">

        <img
          src={assets.user_icon}
          className="w-7 h-7 rounded-full flex-shrink-0"
          alt="User"
        />

        <p className="flex-1 text-sm truncate">
          {user ? user.name : 'Login your account'}
        </p>

        {/* LOGOUT ICON */}

        {user && (
          <img
            onClick={logout}
            src={assets.logout_icon}
            alt="Logout"
            className="
              w-5
              h-5
              flex-shrink-0
              cursor-pointer
              not-dark:invert
              hover:scale-110
              transition-transform
            "
          />
        )}

      </div>

      {/* ============================
          CLOSE BUTTON - MOBILE
      ============================ */}

      <img
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert"
        alt="Close"
      />

    </div>
  )
}

export default Sidebar