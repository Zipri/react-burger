import type { MouseEventHandler, ReactNode } from 'react';

import styles from './styles.module.scss';

import type { TID } from '@/api/base/types';

type Props = {
  id?: TID;
  maxLines?: number;
  className?: string;
  title?: string;
  hardBreak?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler;
  stopPropagation?: boolean;
  preventDefault?: boolean;
};

const linesBottomBorderCount = 1;
const linesTopBorderCount = 6;
const linesClassMap: Record<1 | 2 | 3 | 4 | 5 | 6, keyof typeof styles> = {
  1: 'ellipsisText1Lines',
  2: 'ellipsisText2Lines',
  3: 'ellipsisText3Lines',
  4: 'ellipsisText4Lines',
  5: 'ellipsisText5Lines',
  6: 'ellipsisText6Lines',
};

export const EllipsisText = ({
  hardBreak,
  children,
  maxLines = 3,
  className,
  title,
  onClick,
  id,
  stopPropagation = false,
  preventDefault = false,
}: Props) => {
  if (maxLines < linesBottomBorderCount || maxLines > linesTopBorderCount)
    console.error(
      `EllipsisText: максимальное кол-во строк должно находиться в пределах от ${linesBottomBorderCount} до ${linesTopBorderCount}, текущее: ${maxLines}`
    );

  const handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    stopPropagation && event.stopPropagation();
    preventDefault && event.preventDefault();
    onClick && onClick(event);
  };

  const linesCount = Math.max(
    Math.min(maxLines, linesTopBorderCount),
    linesBottomBorderCount
  ) as 1 | 2 | 3 | 4 | 5 | 6;

  const baseClassNameString = hardBreak
    ? styles.ellipsisBreakAll
    : styles[linesClassMap[linesCount]];

  const classNameString = `${baseClassNameString} ${className}`;

  return (
    <span className={classNameString} title={title} onClick={handleClick} id={id}>
      {children}
    </span>
  );
};
