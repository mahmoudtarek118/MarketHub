import React from 'react';
import './AboutUsPage.css'; // Import the CSS file with enhancements
import NavbarHome from '../components/NavbarHome';
import Footer from '../components/Footer';
import ameen from '../assets/me.jpg'; // Import image (make sure the path is correct)
import a from '../assets/WhatsApp Image 2024-11-29 at 19.45.39_d95ba0cb.jpg'; // Import image (make sure the path is correct)
import b from '../assets/WhatsApp Image 2024-11-29 at 20.53.31_a5806b53.jpg'; // Import image (make sure the path is correct)
import c from '../assets/WhatsApp Image 2024-11-29 at 20.53.51_83e431e2.jpg'; // Import image (make sure the path is correct)


const AboutUsPage: React.FC = () => {
  return (
    <div>
        
        <NavbarHome />
        
        <div className="about-us-page">
            

        <h1>About Us</h1>

        {/* Add Image */}
        <div className="about-us-image">
            <img src={ameen} alt="About Us" />
            <img src={a} alt="About Us" />
            <img src={b} alt="About Us" />
            <img src={c} alt="About Us" />
        </div>

        {/* Company Overview Section */}
        <section className="about-section">
            <h2>Company Overview</h2>
            <p>
            We are a cutting-edge tech company specializing in innovative solutions that help businesses 
            streamline their operations and improve efficiency. With a strong focus on customer satisfaction, 
            we create high-quality products that make a difference.
            </p>
            <p>
            Our team is composed of talented professionals who are passionate about leveraging technology 
            to solve real-world problems. We believe in the power of collaboration, creativity, and continuous 
            improvement to stay ahead in a rapidly changing industry.
            </p>
        </section>

        {/* Mission Statement Section */}
        <section className="about-section">
            <h2>Our Mission</h2>
            <p>
            Our mission is to deliver cutting-edge solutions that empower businesses to thrive in the digital age. 
            We aim to simplify complex processes, enhance decision-making, and foster growth through the use of 
            innovative technologies.
            </p>
        </section>

        {/* Company Values Section */}
        <section className="about-section">
            <h2>Our Values</h2>
            <ul>
            <li><strong>Integrity:</strong> We uphold the highest standards of honesty and transparency in all our actions.</li>
            <li><strong>Innovation:</strong> We embrace creativity and continuously explore new ways to solve challenges.</li>
            <li><strong>Customer-Centric:</strong> Our customers' needs are at the core of everything we do, and we strive to exceed their expectations.</li>
            <li><strong>Collaboration:</strong> We believe in the power of teamwork, sharing knowledge, and growing together.</li>
            <li><strong>Excellence:</strong> We are committed to delivering high-quality products and services that meet the highest standards.</li>
            </ul>
        </section>

        </div>

        <Footer />

    </div>
  );
};

export default AboutUsPage;
