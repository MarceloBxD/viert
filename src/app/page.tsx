'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import mainData from '@/data/main-data';
import { DESKTOP_IMAGES, MOBILE_IMAGES } from '@/data';

import { gsap } from 'gsap';
import RenderConditional from '@/components/RenderConditional/renderConditional.component';
import SocialMediaLinks from '@/components/SocialMediaLinks/SocialMidiaLinks.component';
import { useAppContext } from '@/context';

const IMAGES_TIME_CHANGER = 7;

export default function Home() {
  const [isIphone, setIsIphone] = useState(false);
  const [idx, setIdx] = useState(0);
  const imagesList = {
    desktop: DESKTOP_IMAGES,
    mobile: MOBILE_IMAGES,
  };
  const [activeImage, setActiveImage] = useState(imagesList.desktop[idx]);
  const { isDesktop } = useAppContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage(() => {
        const nextImages = isDesktop
          ? imagesList.desktop[idx]
          : imagesList.mobile[idx];

        // Realize a animação de fade
        gsap.fromTo(
          '.mobile-img',
          {
            opacity: 0, // Comece com opacidade 0
          },
          {
            duration: 1.3, // Duração do fade
            opacity: 1, // Animação para opacidade 1
            onComplete: () => {
              setActiveImage(nextImages);
            },
          },
        );

        gsap.fromTo(
          '.first-img-desktop',
          { opacity: 0 },
          {
            duration: 1.3,
            opacity: 1,
            onComplete: () => {
              setActiveImage(nextImages);
            },
          },
        );

        gsap.fromTo(
          '.second-img-desktop',
          { opacity: 0 },
          { duration: 1.3, opacity: 1 }, // Adiciona um pequeno atraso para suavidade
        );

        return nextImages;
      });
      setIdx((prevIdx) =>
        prevIdx === imagesList.desktop.length - 1 ? 0 : prevIdx + 1,
      );
    }, IMAGES_TIME_CHANGER * 1000);

    return () => clearInterval(interval);
  }, []);

  const verifyIfIsIphone = () => {
    const userAgent = window.navigator.userAgent;
    const isIphone = /iPhone/.test(userAgent);

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
      onLoad={() => {
        const isDesktop = window.innerWidth > 768;

        if (isDesktop) {
          setActiveImage(imagesList.desktop[idx]);
        } else {
          setActiveImage(imagesList.mobile[idx]);
        }

        window.addEventListener('resize', () => {
          if (window.innerWidth > 768) {
            setActiveImage(imagesList.desktop[idx]);
          } else {
            setActiveImage(imagesList.mobile[idx]);
          }
        });

        return () => window.removeEventListener('resize', () => {});
      }}
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
                } object-cover bg-cover brightness-50 first-img-desktop`}
                loading="lazy"
                src={activeImage[0].src}
                layout="fill"
                alt={activeImage[0].alt}
              />
            </div>
            <div className="flex-1 relative h-screen">
              <Image
                className="h-full brightness-50 object-cover bg-center second-img-desktop bg-cover"
                loading="lazy"
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
              className="mobile-img
              object-cover bg-cover brightness-50
              "
              layout="fill"
              src={activeImage[0].src}
              alt={activeImage[0].alt}
            />
          </div>
        }
      />

      <div
        className={`absolute z-50 flex h-[50%] bottom-5 flex-col justify-between py-10`}
        style={{
          paddingBottom: isIphone ? '120px' : undefined,
        }}
      >
        <div className="flex flex-col relative items-center ">
          <Image
            layout="fill"
            src="/assets/brand/logo.png"
            alt="Logo"
            className="max-w-[300px]  max-h-[120px] mx-auto object-contain "
          />
          <p className="tracking-[6px] md:tracking-[11px] mt-36 text-center font-baskervville uppercase">
            {mainData.description}
          </p>
        </div>
        <div className="flex flex-col items-center">
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
