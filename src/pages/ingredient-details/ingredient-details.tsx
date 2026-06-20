import React from 'react';

import styles from './ingredient-details.module.scss';

import { Page } from '@/components/common';
import { IngredientInfoContent } from '@/components/modals/ingredient-info';
import { useAppSelector } from '@/services/hooks';
import { selectIngredientsError } from '@/services/ingredients/selectors';

export const IngredientDetailsPage = (): React.JSX.Element => {
  const error = useAppSelector(selectIngredientsError);

  return (
    <Page title="Детали ингредиента" error={error}>
      <main className={styles.main}>
        <IngredientInfoContent />
      </main>
    </Page>
  );
};
