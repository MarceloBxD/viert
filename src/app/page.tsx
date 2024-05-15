"use client";
import mainData from "@/data/main-data";
import Link from "next/link";

import { images } from "@/data";
import { useEffect, useState } from "react";

const { yellow, gray, lightAndDark, redAndOrange } = images;

const SocialMediaLinks = () => {
  const [images, setImages] = useState(yellow);

  console.log(images);

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
  return (
    <main className="w-full h-[100vh] flex flex-col items-center justify-center">
      <h1 className="mb-10 text-4xl text-clamp-2xl tracking-[10px]">
        {mainData.title}
      </h1>
      <p className="tracking-[8px] text-clamp-xl text-center line-clamp-2 font-montserratt- uppercase">
        {mainData.description}
      </p>
      <div className="hidden md:block">
        <SocialMediaLinks />
      </div>
      <div className="flex flex-col items-center absolute bottom-20">
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
    </main>
  );
}
