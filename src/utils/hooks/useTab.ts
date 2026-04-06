import { createRef, useMemo, useRef, useState } from 'react';

type TUseTabOptions<T extends string> = {
  tabs: readonly T[];
  initialTab: T;
};

type TUseTabResult<T extends string> = {
  currentTab: T;
  contentRef: React.RefObject<HTMLDivElement | null>;
  sectionRefs: Record<T, React.RefObject<HTMLElement | null>>;
  setCurrentTab: React.Dispatch<React.SetStateAction<T>>;
  scrollToSection: (tab: T) => void;
  handleScroll: () => void;
};

export const useTab = <T extends string>({
  tabs,
  initialTab,
}: TUseTabOptions<T>): TUseTabResult<T> => {
  const [currentTab, setCurrentTab] = useState<T>(initialTab);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs = useMemo(
    () =>
      tabs.reduce(
        (acc, tab) => {
          acc[tab] = createRef<HTMLElement>();
          return acc;
        },
        {} as Record<T, React.RefObject<HTMLElement | null>>
      ),
    [tabs]
  );

  /** Необходимо использовать заголовок h2 для корректного скролла */
  const scrollToSection = (tab: T): void => {
    setCurrentTab(tab);

    const container = contentRef.current;
    const section = sectionRefs[tab].current;

    if (!container || !section) return;

    const anchor = (section.querySelector('h2') as HTMLElement | null) ?? section;

    const top =
      anchor.getBoundingClientRect().top -
      container.getBoundingClientRect().top +
      container.scrollTop;

    container.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  const handleScroll = (): void => {
    const container = contentRef.current;
    if (!container) return;

    const containerTop = container.getBoundingClientRect().top;

    const entries = tabs
      .map((tab) => {
        const node = sectionRefs[tab].current;
        if (!node) return null;

        return {
          tab,
          distance: Math.abs(node.getBoundingClientRect().top - containerTop),
        };
      })
      .filter((entry): entry is { tab: T; distance: number } => entry !== null);

    if (!entries.length) return;

    const nearest = entries.reduce((acc, entry) =>
      entry.distance < acc.distance ? entry : acc
    );

    if (nearest.tab !== currentTab) {
      setCurrentTab(nearest.tab);
    }
  };

  return {
    currentTab,
    contentRef,
    sectionRefs,
    setCurrentTab,
    scrollToSection,
    handleScroll,
  };
};
