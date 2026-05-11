import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../Howitworks/Howitworks';
import Tuitions from '../../../Components/Tuitions/Tuitions';
import TuitionSort from '../../../Components/Homepagedata/TuitionSort';
import TuitorShort from '../../../Components/Homepagedata/TuitorShort';
import WhyTutionHub from '../../../Components/Homepagedata/WhyTutionHub';
import Testimonials from '../../../Components/Homepagedata/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TuitionSort></TuitionSort>
            <HowItWorks></HowItWorks>
            <TuitorShort></TuitorShort>
            <WhyTutionHub></WhyTutionHub>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;