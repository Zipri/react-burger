import { Page } from '@/components/common';

export const NotFoundPage = (): React.JSX.Element => (
  <Page title="404">
    <main className="pl-5 pr-5">
      <p className="text text_type_main-default">Страница не найдена</p>
    </main>
  </Page>
);
