'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import mainData from '@/data/main-data';
import { IMAGES } from '@/data';

import { gsap } from 'gsap';

const IMAGES_TIME_CHANGER = 7;

const SocialMediaLinks = () => {
  return (
    <ul className="flex">
      {mainData.contact.medias.map((media, index) => (
        <li className={`first:after:content-['/'] tracking-wider`} key={index}>
          <Link
            href={media.href}
            passHref
            className="m-2 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {media.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
const { yellow, gray, lightAndDark, redAndOrange } = IMAGES.DESKTOP_IMAGES;

export default function Home() {
  const [images, setImages] = useState(yellow);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768 ? true : false,
  );
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, setIsMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImages((prevImages) => {
        const imageList = [yellow, gray, lightAndDark, redAndOrange];
        const nextImages =
          imageList[(imageList.indexOf(prevImages) + 1) % imageList.length];

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
              setImages(nextImages);
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
              setImages(nextImages);
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
        prevIdx + 1 === IMAGES.MOBILE_IMAGES.length ? 0 : prevIdx + 1,
      );
    }, IMAGES_TIME_CHANGER * 1000);

    return () => clearInterval(interval);
  }, []);

  const [imageOne, imageTwo] = images.map((image) => image.src);
  const [altOne, altTwo] = images.map((image) => image.alt);

  return (
    <main
      className={`w-screen text-white relative h-screen flex items-center justify-center`}
    >
      {!isMobile && (
        <>
          <div className="flex-1 relative h-screen">
            <Image
              className={`h-full ${
                imageOne === '/assets/gray.jpeg' ? 'bg-bottom' : 'bg-center'
              } object-cover bg-cover brightness-50 first-img-desktop`}
              loading="lazy"
              src={imageOne}
              layout="fill"
              alt={altOne}
            />
          </div>
          <div className="flex-1 relative h-screen">
            <Image
              className="h-full brightness-50 object-cover bg-center second-img-desktop bg-cover"
              loading="lazy"
              layout="fill"
              src={imageTwo}
              alt={altTwo}
            />
          </div>
        </>
      )}

      {isMobile && (
        <div className="relative h-screen w-full">
          <Image
            className="h-full object-cover bg-center  bg-cover brightness-50 mobile-img "
            loading="eager"
            layout="fill"
            src={IMAGES.MOBILE_IMAGES[idx].src}
            alt={altOne}
          />
        </div>
      )}

      <div className="absolute z-50 flex flex-col justify-between h-screen py-10">
        <div className="flex flex-col items-center mt-[90%]">
          <h1 className="mb-10 text-6xl text-clamp-2xl tracking-[10px]">
            {mainData.title}
          </h1>
          <p className="tracking-[8px] text-clamp-xl text-center line-clamp-2 font-baskervville uppercase">
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
