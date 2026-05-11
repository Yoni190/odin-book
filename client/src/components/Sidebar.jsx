import React, { useState } from 'react'

const Sidebar = () => {
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()

        console.log(search)
    }
  return (
    <div className="min-h-screen bg-zinc-100 p-5 border-r border-zinc-200">

        <form onSubmit={handleSearch}>
            <div className='flex flex-col gap-3'>
                <label htmlFor="search" className='text-2xl'>Search</label>
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder='clover away...'
                    className='p-2 border border-zinc-400 outline-none focus:ring-2 focus:ring-zinc-400 rounded-xl'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
            </div>
        </form>
    </div>
  )
}

export default Sidebar