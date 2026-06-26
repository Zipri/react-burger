import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import React from 'react';

import styles from './page.module.scss';

type PageProps = {
  children: React.ReactNode;
  className?: string;
  title?: string;
  isLoading?: boolean;
  error?: string | null;
};

export const Page = (props: PageProps) => {
  const { children, className, title, isLoading, error } = props;
  return (
    <div className={`${styles.page} ${className}`}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        {title}
      </h1>
      {isLoading && <Preloader />}
      {error && <p className="text text_type_main-default pl-5">{error}</p>}
      {!isLoading && !error && children}
    </div>
  );
};
