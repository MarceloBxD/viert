'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import mainData from '@/data/main-data';
import { DESKTOP_IMAGES, MOBILE_IMAGES } from '@/data';

import { gsap } from 'gsap';
import RenderConditional from '@/components/RenderConditional/renderConditional.component';
import SocialMediaLinks from '@/components/SocialMediaLinks/SocialMidiaLinks.component';
import { useAppContext } from '@/context';

export default function Home() {
  const [isIphone, setIsIphone] = useState(false);
  const [idx, setIdx] = useState(0);
  const imagesList = {
    desktop: DESKTOP_IMAGES,
    mobile: MOBILE_IMAGES,
  };
  const [activeImage, setActiveImage] = useState(imagesList.desktop[idx]);
  const { isDesktop } = useAppContext();

  const changeImage = useCallback(() => {
    setActiveImage(() => {
      const nextImages = isDesktop
        ? imagesList.desktop[idx]
        : imagesList.mobile[idx];

      // Realize a animação de fade
      gsap.fromTo(
        '.img',
        {
          opacity: 0, // Comece com opacidade 0
        },
        {
          duration: 1.3, // Duração do fade
          opacity: 1, // Animação para opacidade 1
        },
      );

      return nextImages;
    });
    setIdx((prevIdx) =>
      prevIdx === imagesList.desktop.length - 1 ? 0 : prevIdx + 1,
    );
  }, [idx, isDesktop, imagesList.desktop, imagesList.mobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      changeImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [changeImage]);

  const verifyIfIsIphone = () => {
    const userAgent = window.navigator.userAgent;  
    const isIphone = /iPhone/.test(userAgent);

    if (isIphone && !/CriOS/.test(userAgent)) {
      return true;
    }

    return isIphone;
  };

  useEffect(() => {
    const isIph = verifyIfIsIphone();
    console.log('isIph', isIph);
    setIsIphone(isIph);
  }, []);

  useEffect(() => {
    const disableScrollOnSafari = () => {
      if (navigator.userAgent.indexOf('Safari') !== -1) {
        document.body.style.overflow = 'hidden';
      }
    };

    disableScrollOnSafari();

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <main
      className={`w-screen h-screen text-white relative flex items-center justify-center
        overflow-hidden
      `}
    >
      <RenderConditional
        desktop={
          <>
            <div className="flex-1 relative h-screen">
              <Image
                className={`h-full ${
                  activeImage[0].src === '/assets/gray.jpeg'
                    ? 'bg-bottom'
                    : 'bg-center'
                } object-cover opacity-[0] bg-cover brightness-50 img`}
                loading="eager"
                src={activeImage[0].src}
                layout="fill"
                alt={activeImage[0].alt}
              />
            </div>
            <div className="flex-1 relative h-screen">
              <Image
                className="h-full opacity-[0] brightness-50 object-cover bg-center img bg-cover"
                loading="eager"
                layout="fill"
                src={activeImage[1].src}
                alt={activeImage[1].alt}
              />
            </div>
          </>
        }
        mobile={
          <div className="w-full h-full flex items-center justify-center">
            <Image
              className="img opacity-[0] object-cover bg-cover brightness-50 "
              layout="fill"
              src={activeImage[0].src}
              alt={activeImage[0].alt}
            />
          </div>
        }
      />

      <div
        className={`absolute z-50 flex  bottom-5 flex-col justify-between py-10 gap-[48px]`}
       
      >
        <div className={`flex flex-col relative items-center mx-auto`} style={{
            width: isDesktop ? '300px' : '240px',
            aspectRatio: 3.91
            }}>
          <Image
            layout="fill"
            src="/assets/brand/logo.png"
            alt="Logo"
          />
        </div>
        <p className="tracking-[6px] md:tracking-[11px] text-center font-baskervville uppercase " style={{
          fontSize: isDesktop ? '1.5rem' : '0.92rem',
          fontWeight: 100,
          paddingBottom: isIphone ? '32px' : isDesktop ? undefined : '24px',

          }}>
            {mainData.description}
          </p>
        <div className={`flex flex-col items-center mt-[${isDesktop ? '120px' : '64px'}]`}>
          <div className="flex items-center gap-3 ">
            <h2 className="font-baskervville tracking-[4px]">
              {mainData.contact.title}
            </h2>
            <SocialMediaLinks />
          </div>
          <div className="flex gap-3 mt-5">
            <p>{mainData.address.street}</p> |{' '}
            <p>{mainData.address.neighborhood}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
