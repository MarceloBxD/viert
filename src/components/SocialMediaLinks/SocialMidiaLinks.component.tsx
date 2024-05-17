import { mainData } from '@/data';
import Link from 'next/link';
import React from 'react';

const SocialMediaLinks: React.FC = () => {
  return (
    <ul className="flex">
      {mainData.contact.medias.map((media, index) => (
        <li
          className={`first:after:content-['/'] tracking-wider italic`}
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

export default SocialMediaLinks;
