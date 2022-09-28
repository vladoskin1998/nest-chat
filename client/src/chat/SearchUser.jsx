import React, { useState } from "react";

export const SearchUser = () => {

    const [search, setSearch] = useState('')
    const [searchList, setSearchList] = useState([])

    const handlerSearch = () => {
        fetch(`http://localhost:5000/api/user/search-user?email=${search}`)
            .then(res => res.json())
            .then((res) => setSearchList(res))
    }

    return <div>
        <h4>Search User List</h4>
        <div style={{ display: "flex",flexDirection:'column' ,rowGap: "10px" }}>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
            <button onClick={handlerSearch}>Search</button>
        </div>
        <div>
            {
                searchList.map((it, id) => <div style={{ display: "flex", columnGap: "10px" }}>
                    <span>{id}</span>
                    <span>{it.email}</span>
                </div>)
            }
        </div>

    </div>
}