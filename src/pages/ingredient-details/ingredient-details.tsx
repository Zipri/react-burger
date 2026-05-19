import { Page } from '@/components/common';
import { IngredientInfoContent } from '@/components/modals/ingredient-info';
import React from 'react';

export const IngredientDetailsPage = (): React.JSX.Element => {
  return (
    <Page className="pt-10 pl-5 pr-5">
      <h1 className="text text_type_main-large mb-4">Детали ингредиента</h1>
      <IngredientInfoContent />
    </Page>
  );
};
