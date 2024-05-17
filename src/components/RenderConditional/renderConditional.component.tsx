import { FC, ReactNode } from 'react';
import { useAppContext } from '@/context';

interface ConditionalProps {
  notOn?: 'desktop' | 'mobile';
  desktop?: JSX.Element | null;
  mobile?: JSX.Element | null;
  condition?: boolean;
  children?: ReactNode;
}

const RenderConditional: FC<ConditionalProps> = ({
  notOn,
  mobile,
  condition,
  desktop,
  children,
}) => {
  const { isDesktop } = useAppContext();

  if (condition !== null && condition) {
    return <>{children}</>;
  }
  if ((notOn === 'desktop' || !!mobile) && !isDesktop) {
    return <>{children ?? mobile}</>;
  }
  if ((notOn === 'mobile' || !!desktop) && isDesktop) {
    return <>{children ?? desktop}</>;
  }
  return null;
};

export default RenderConditional;
