import {LoremIpsum} from 'lorem-ipsum'
import assets from '../assets/assets.js';
import Title from './Title.jsx';
import ServiceCard from './ServiceCard.jsx';

const Services = () => {
    const lorem = new LoremIpsum();

    const servicesData = [
        {
            title: 'Advertising',
            description: 'we turn bold ideas into powerful digital solution that connect, engage...',
            icon: assets.ads_icon
        },
        {
            title: 'Content marketing',
            description: `${lorem.generateWords(10)}`,
            icon: assets.marketing_icon
        },
        {
            title: 'Content writing',
            description: `${lorem.generateWords(10)}`,
            icon: assets.content_icon
        },
        {
            title: 'Social Media',
            description: `${lorem.generateWords(10)}`,
            icon: assets.social_icon
        },
        
    ]

    return (
        <div id='services' className='relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white'>
            
            <img src={assets.bgImage2} alt="" className='absolute -top-110 -left-70 -z-1 dark:hidden'/>
            <Title title='How can we help?' desc={`${lorem.generateWords(15)}`}/>

            <div className='flex flex-col md:grid grid-cols-2'>
                {servicesData.map((service, index)=>(
                    <ServiceCard key={index} service={service} index={index}/>
                ))}
            </div>
        </div>
    );
};


export default Services;