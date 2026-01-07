import useFilterStore from "./filterStore"

function Filters() {
    const filter = useFilterStore((state) => state.filter);
    const setFilter = useFilterStore((state) => state.setFilter);

    

    return (

        <>
        {/* Filter Tabs */}
        <div className="filter-tabs">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toLowerCase() + f.slice(1)}
            </button>
          ))}
        </div>

          </>
    )

}

export default Filters;
