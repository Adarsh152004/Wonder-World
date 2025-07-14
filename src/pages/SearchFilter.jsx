export const SearchFilter = ({search, setSearch, filter, setFilter, setSortOrder}) => {

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    const handleSelectChange = (e) => {
        e.preventDefault();
        setFilter(e.target.value);
    }

    return (
          <section className="section-searchFilter container">
           <div>
             <input type="text" placeholder="search" value={search} onChange={handleInputChange} />
             </div>

             <div>
                <button className="btn-ascDec" onClick={() => setSortOrder("asc")}>Asc</button>
             </div>

             <div>
                <button className="btn-ascDec" onClick={() => setSortOrder("des")}>Des</button>
             </div>

            <div>
                <select className="select-section" value={filter} onChange={handleSelectChange}>
                    <option value="all">All</option>
                    <option value="Africa">Africa</option>
                    <option value="America">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="India">India</option>
                    <option value="Antarctica">Antarctica</option>

                </select>
            </div>
          </section>
    )
}