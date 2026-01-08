import useFilterStore from "./filterStore" //importing the global storage Zustand actions(functions) in filter compnent

function Filters() {
    const filter = useFilterStore((state) => state.filter); //Initiallizing filter, that stores the curernt state of filter
    const setFilter = useFilterStore((state) => state.setFilter); //This action(function) sets the value for filter

    

    return (

        <>
        {/* Filter Tabs */}
        <div className="filter-tabs">
          {['all', 'active', 'completed'].map((f) => ( //Either active tasks, complete tasks or all tasks
            <button
              key={f} //key name
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)} //this button activaes on clicking by mouse
            >
              {
                f.charAt(0).toLowerCase() + f.slice(1)  //it takes first character of filter and make it lower, i.e "Active", it takes A and lower it and concatenate it with "ctive" as that is already lower, no need to lower that
              } 
                
            </button>
          ))}
        </div>

          </>
    )

}

export default Filters;
