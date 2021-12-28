
// styles
import './ProjectFilters.css'

// categories to be sorted
const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales'];
export default function ProjectFilters({ currentFilter, changeFilter}) {
    
    return (
        <div className='project-filter'>
            <nav>
                <p>Filter by :</p>
            { filterList.map((each) => {
                return(
                    <button className={currentFilter === each ? 'active' : ''} onClick={() => changeFilter(each)} key={each}>
                        {each}
                    </button>
                )
            })}
            </nav>
        </div>
    )
}
