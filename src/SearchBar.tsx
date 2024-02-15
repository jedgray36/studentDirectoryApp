

import React, { FC, useState } from 'react';


interface SearchProps {
    querySearch: (query: string) => void;

}


const SearchBar: FC<SearchProps> = ({querySearch}) => {
const [search, setSearch] = useState("");


const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    querySearch(newSearch);
}


return (
<>
<div className="input-group rounded">
  <input 
  value={search}
  onChange={handleUpdate} 
  type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
</div>

</>
);

}


export default SearchBar;