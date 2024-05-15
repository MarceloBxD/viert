"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import mainData from "@/data/main-data";
import { images } from "@/data";

const TIME_CHANGER = 10;
const { yellow, gray, lightAndDark, redAndOrange } = images;

const SocialMediaLinks = () => {
  return (
    <ul className="flex">
      {mainData.contact.medias.map((media, index) => (
        <li
          className={`first:after:content-['/'] md:first:after:content-['|'] tracking-wider`}
          key={index}
        >
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

export default function Home() {
  const [images, setImages] = useState(yellow);

  useEffect(() => {
    const interval = setInterval(() => {
      setImages((prevImages) => {
        if (prevImages === yellow) return gray;
        if (prevImages === gray) return lightAndDark;
        if (prevImages === lightAndDark) return redAndOrange;
        if (prevImages === redAndOrange) return yellow;
      });
    }, TIME_CHANGER * 1000);

    return () => clearInterval(interval);
  }, []);

  const [imageOne, imageTwo] = images.map((image) => image.src);
  const [altOne, altTwo] = images.map((image) => image.alt);

  return (
    <main
      className={`w-screen text-white relative h-screen flex items-center justify-center`}
    >
      <div className="flex-1 relative h-screen">
        <Image
          className=" h-full object-cover bg-center bg-cover"
          loading="eager"
          src={imageOne}
          layout="fill"
          alt={altOne}
        />
      </div>
      <div className="flex-1 relative h-screen">
        <Image
          className="h-full object-cover bg-center bg-cover"
          loading="eager"
          layout="fill"
          src={imageTwo}
          alt={altTwo}
        />
      </div>

      <div className="absolute z-50 flex flex-col justify-between h-screen py-10">
        <div className="flex flex-col items-center mt-56">
          <h1 className="mb-10 text-4xl text-clamp-2xl tracking-[10px]">
            {mainData.title}
          </h1>
          <p className="tracking-[8px] text-clamp-xl text-center line-clamp-2 font-montserratt- uppercase">
            {mainData.description}
          </p>
          <div className="hidden md:block">
            <SocialMediaLinks />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3 ">
            <h2 className="font-baskervville md:hidden">
              {mainData.contact.title}
            </h2>
            <div className="md:hidden">
              <SocialMediaLinks />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <p>{mainData.address.street}</p> |{" "}
            <p>{mainData.address.neighborhood}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
