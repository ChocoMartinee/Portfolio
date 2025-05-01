// @flow strict
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { useState } from "react";
import Modal from "../../helper/modal";

function Certificates() {
  const [selectedImage, setSelectedImage] = useState(null);

  const certificates = [
    {
      image: '/png/Cert-ComputerHardwareBasics.png',
      title: 'Computer Hardware Basics',
      link: 'https://www.netacad.com/certificates?issuanceId=38a1b815-d009-4374-ba0e-d80c969370a2',
    },
    {
      image: '/png/Cert-DataAnalyticsEssentials.png',
      title: 'Data Analytics Essentials',
      link: 'https://www.netacad.com/certificates?issuanceId=f4a0da67-7512-4c39-b515-94d712863975',
    },
    {
      image: '/png/Cert-EthicalHacker.png',
      title: 'Ethical Hacker',
      link: 'https://www.netacad.com/certificates?issuanceId=509b3165-02e8-44d8-9f2d-421bc84fd702',
    },
    {
      image: '/png/Cert-GoogleCybersecurity.png',
      title: 'Google Cybersecurity',
      link: 'https://coursera.org/share/3e27e51deb362784ab0b23d11c158369',
    },
    {
      image: '/png/Cert-GoogleITSupport.png',
      title: 'Google IT Support',
      link: 'https://coursera.org/share/ba178dc1a8b993a57cc4b32c1e94cbde',
    },
    {
      image: '/png/Cert-PythonEssentials1.png',
      title: 'Python Essentials 1',
      link: 'https://www.netacad.com/certificates?issuanceId=b9e8484a-6212-48db-9c44-00ec9002550f',
    },
    {
      image: '/png/Cert-BasicsOfGraphicsDesignUsingCanva.jpg',
      title: 'Basics Of Graphics Design Using Canva',
      link: '',
    },
    {
      image: '/png/Cert-BITSCON2024.png',
      title: 'BITSCON 2024',
      link: '',
    }
  ];

  return (
    <div id='certificates' className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Certificate"
            className="w-full h-auto rounded-lg"
          />
        )}
      </Modal>

      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl  opacity-20"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Certificates
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {
          certificates.map((cert, i) => (
            <div
              key={i}
              className="bg-[#1a1443] p-4 rounded-lg shadow-md transform transition-transform hover:scale-105"
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-auto rounded-md cursor-pointer"
                onClick={() => setSelectedImage(cert.image)}
              />
              <p className="text-center text-white mt-2">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {cert.title}
                </a>
              </p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Certificates;