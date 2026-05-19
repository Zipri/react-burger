import React from 'react';
import styles from './page.module.scss';

type PageProps = {
  children: React.ReactNode;
  className?: string;
};

export const Page = (props: PageProps) => {
  const { children, className } = props;
  return <div className={`${styles.page} ${className}`}>{children}</div>;
};
