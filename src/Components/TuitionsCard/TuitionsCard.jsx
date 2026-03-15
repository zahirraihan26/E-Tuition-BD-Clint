

import { FaBookOpen, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Link } from 'react-router';


const TuitionsCard = ({ Tuitions }) => {
  
  const {
    budget,
    description,
    location,
    schedule,
    subject,
    title,
    _id,
    createdAt
 
  } = Tuitions || {};

  return (
    <div className="border border-base-300/50 rounded-2xl p-6 bg-base-100 shadow-sm hover:shadow-xl transition-all duration-300">

      {/* Top row */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="bg-primary/10 p-3 rounded-xl text-primary">
            <FaBookOpen size={22} />
          </div>

          {/* Subject */}
          <div>
            <span className="text-sm bg-success/10 text-success px-3 py-1 rounded-full font-bold">
              Open
            </span>
            <p className="text-base-content/70 text-sm mt-1">{subject}</p>
          </div>
        </div>

        {/* Time */}
        <p className="text-sm opacity-50">{createdAt}</p>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold hover:text-primary transition-colors mt-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-base-content/70 mt-2">
        {description}
      </p>

      {/* Bottom info */}
      <div className="flex flex-wrap items-center gap-6 mt-4 text-base-content/60 text-sm">

        <div className="flex items-center gap-2">
          <FaMapMarkerAlt />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaClock />
          <span>{schedule}</span>
        </div>

        <div className="font-bold text-primary text-lg">
          ${budget}/hr
        </div>

         {/* View Details button */}
        
          <Link to={`/tuitions/${_id}`} className="btn btn-primary btn-sm rounded-lg">
            View Details
          </Link>
     

        {/* const [showModal, setShowModal] = useState(false); */}

      

        
      </div>

    </div>
  );
};

export default TuitionsCard;
