import { Page } from '@/components/common';

export const ErrorPage = (): React.JSX.Element => (
  <Page className="pt-10 pl-5 pr-5">
    <h1 className="text text_type_main-large mb-4">Что-то пошло не так</h1>
    <p className="text text_type_main-default">Попробуйте обновить страницу</p>
  </Page>
);
