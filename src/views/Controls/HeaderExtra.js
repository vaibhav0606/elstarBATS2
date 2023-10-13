import { Breadcrumbs } from "@material-tailwind/react";
const HeaderExtra = ({Component}) => {
    return (
    <div>
    <p className='text-xl font-medium text-black'>{Component}</p>
    <Breadcrumbs style={{marginLeft:'-15px',width:'auto'}}>
    <a href="#" className="opacity-60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </a>
      <a href="#" className="opacity-60">
      <span>Admin</span>
    </a>
    <a href="#" ><span>{Component}</span></a>
  </Breadcrumbs>
  </div>
    )
}
export default HeaderExtra;