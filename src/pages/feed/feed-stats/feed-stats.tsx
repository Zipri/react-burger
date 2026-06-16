import styles from './feed-stats.module.scss';

type TFeedStatsProps = {
  doneColumns: number[][];
  inProgressColumns: number[][];
  total: number;
  totalToday: number;
};

export const FeedStats = ({
  doneColumns,
  inProgressColumns,
  total,
  totalToday,
}: TFeedStatsProps): React.JSX.Element => (
  <aside className={styles.stats}>
    <div className={styles.statuses}>
      <section>
        <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
        <div className={styles.columns}>
          {doneColumns.map((column, index) => (
            <ul key={`done-${index}`} className={styles.list}>
              {column.map((number) => (
                <li
                  key={number}
                  className={`${styles.doneNumber} text text_type_digits-default mb-2`}
                >
                  {number}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text text_type_main-medium mb-6">В работе:</h2>
        <div className={styles.columns}>
          {inProgressColumns.map((column, index) => (
            <ul key={`progress-${index}`} className={styles.list}>
              {column.map((number) => (
                <li key={number} className="text text_type_digits-default mb-2">
                  {number}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>
    </div>

    <section className="mt-15">
      <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
      <p className={`${styles.total} text text_type_digits-large`}>{total}</p>
    </section>

    <section className="mt-15">
      <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
      <p className={`${styles.total} text text_type_digits-large`}>{totalToday}</p>
    </section>
  </aside>
);
