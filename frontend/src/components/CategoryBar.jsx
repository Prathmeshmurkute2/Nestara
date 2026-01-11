import { CATEGORIES } from '../utils/categories.js';

const CategoryBar = ({ activeCategory, onSelect }) =>{
  return(
    <div className='flex gap-8 overflow-x-auto py-4 border'>
      {CATEGORIES.map((cat) =>(
        <button
          key={cat.key}
          onClick={()=> onSelect(cat.key)}
          className={`flex flex-col items-center min-w-[80px]
            ${activeCategory === cat.key
              ?"text-black border-b-2 border-black"
              : "text-text-400 hover:text-black"}`}
        >
          <span className='text-xl'>{cat.icon}</span>
          <span className='text-sm'>{cat.label}</span>
        </button>
      ))}
    </div>
  )
}

export default CategoryBar;