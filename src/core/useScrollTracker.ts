import { throttle } from 'lodash-es';
import { useCallback, useEffect, useRef, useState } from 'react';

interface useScrollTrackerProps {
  sectionIds: string[];
  /** @param trackSide determines where to track the element. Bottom of the page or top of the page */
  trackSide?: 'top' | 'bottom';
  offset?: number; // in px
}

const useScrollTracker = (props: useScrollTrackerProps) => {
  const [activeSection, setActiveSection] = useState(null);
  const sections = useRef([]);

  const handleScroll = useCallback(
    throttle(() => {
      let thresholdPoint;
      if (props.trackSide === 'bottom') {
        thresholdPoint = window.scrollY + window.innerHeight - props.offset;
      } else {
        thresholdPoint = window.scrollY + props.offset;
      }
      let newActiveSection = null;

      sections.current.forEach((section, index) => {
        const sectionOffsetTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          thresholdPoint >= sectionOffsetTop &&
          window.scrollY < sectionOffsetTop + sectionHeight
        ) {
          newActiveSection = section.id;
        }
        // If we are in the upper position of the first section
        else if (index === 0 && thresholdPoint < sectionOffsetTop) {
          newActiveSection = section.id;
        }
        // If we are in the bottom position of the last section
        else if (
          index === sections.current?.length - 1 &&
          thresholdPoint > sectionOffsetTop
        ) {
          newActiveSection = section.id;
        }
      });

      setActiveSection(newActiveSection);
    }, 100),
    [props.trackSide, props.offset, setActiveSection, sections],
  );

  useEffect(() => {
    sections.current = props.sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    handleScroll();
  }, [props.sectionIds]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    document.addEventListener('click', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      document.removeEventListener('click', handleScroll);
    };
  }, [handleScroll]);

  return activeSection;
};

export default useScrollTracker;
