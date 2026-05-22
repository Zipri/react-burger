import type { Location } from 'react-router-dom';

export type TNavigateOptionsState = {
  /** Маршрут, на фоне которого открываем модалку */
  backgroundLocation?: Location;
};
