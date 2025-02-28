import Image from 'next/image';
import logo from '../../public/favicon.png';

export const Logo = ({ size = 256 }) => {
  return (
    <Image
      src={logo}
      width={size}
      height={size}
      alt="logo"
    />
  );
};
