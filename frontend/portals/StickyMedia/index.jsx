import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { IntersectionVisibility, Portal } from '@shopgate/engage/components';
import { scrolledTopOffset, scrollStyles } from '../../config';

const {
  enabled: transitionsEnabled,
  ratio: transitionRatio,
  styles: transitionStyles,
} = scrollStyles;

const styles = {
  wrapper: css({
    position: 'sticky',
    top: scrolledTopOffset,
    zIndex: 1,
    ' > div:first-child': {
      transition: 'box-shadow 0.4s ease-out',
    },
  }),
  // Default transitions
  transition: { ' > div:first-child': { boxShadow: '0 12px 8px rgba(0, 0, 0, 0.30)' } },
};

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const StickyMedia = ({ children }) => {
  if (!transitionsEnabled) {
    return (
      <Portal name="product.sticky-media">
        <div className={styles.wrapper}>
          {children}
          <Portal name="product.sticky-media.after" />
        </div>
      </Portal>
    );
  }

  return (
    <IntersectionVisibility>
      {({ ratio, setRef }) => (
        <Portal name="product.sticky-media">
          <div
            className={css(
              styles.wrapper,
              ratio <= transitionRatio ? styles.transition : null,
              ratio <= transitionRatio ? transitionStyles : null
            )}
            ref={setRef}
          >
            {children}
            <Portal name="product.sticky-media.after" />
          </div>
        </Portal>
      )}
    </IntersectionVisibility>
  );
};

StickyMedia.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StickyMedia;
