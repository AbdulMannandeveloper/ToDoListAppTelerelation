import { create } from 'zustand'

// Set keyword is used to set the new values to the states.
// the following global state is about filter management so that if the state of filter has to be same for multiple componenets, it can deal with that rather than a local state.
// It sets the filter to initially all, means to show all the tasks and the suer can set to different states.


const useFilterStore = create( 
    (set) => ({ 
      filter : 'all',

      setFilter : (newFilter) => set({
        filter : newFilter
      }),

    })
  );

export default useFilterStore;