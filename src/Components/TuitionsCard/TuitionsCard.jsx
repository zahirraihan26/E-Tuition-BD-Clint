
import React, { useState } from 'react';
import { FaBookOpen, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Link } from 'react-router';
import TutorApplyModal from '../TuitoApplyModal/TutorApplyModal';

const TuitionsCard = ({ Tuitions }) => {
  const [showModal, setShowModal] = useState(false); 
  const {
    budget,
    description,
    location,
    schedule,
    subject,
    title,
  } = Tuitions || {};

  return (
    <div className="border border-yellow-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition">

      {/* Top row */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="bg-yellow-100 p-3 rounded-xl text-yellow-500">
            <FaBookOpen size={22} />
          </div>

          {/* Subject */}
          <div>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full font-medium">
              Open
            </span>
            <p className="text-gray-600 text-sm mt-1">{subject}</p>
          </div>
        </div>

        {/* Time */}
        <p className="text-sm text-gray-400">2 days ago</p>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-yellow-500 mt-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mt-2">
        {description}
      </p>

      {/* Bottom info */}
      <div className="flex flex-wrap items-center gap-6 mt-4 text-gray-500 text-sm">

        <div className="flex items-center gap-2">
          <FaMapMarkerAlt />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaClock />
          <span>{schedule}</span>
        </div>

        <div className="font-semibold text-yellow-500">
          ${budget}/hr
        </div>

        {/* const [showModal, setShowModal] = useState(false); */}
            {/* user===role */}
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Apply
        </button>

        {showModal && (
          <TutorApplyModal
            tuition={Tuitions} 
            closeModal={() => setShowModal(false)}
          />
        )}
      </div>

    </div>
  );
};

export default TuitionsCard;
