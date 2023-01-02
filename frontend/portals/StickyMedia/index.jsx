import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { IntersectionVisibility, Portal } from '@shopgate/engage/components';
import { scrolledTopOffset, scrollStyles } from '../../config';
import connect from './connector';

const {
  enabled: transitionsEnabled,
  ratio: transitionRatio,
  styles: transitionStyles,
} = scrollStyles;

const styles = {
  wrapper: css({
    position: 'sticky',
    top: scrolledTopOffset,
    zIndex: 2,
    ' > div > div:first-child': {
      transition: 'box-shadow 0.4s ease-out',
    },
  }),
  stickyTrigger: css({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: `calc(${scrolledTopOffset} * -1)`,
    zIndex: -1,
  }),
  // Default transitions
  transition: {
    ' > div:first-child': {
      boxShadow: '0 12px 8px rgba(0, 0, 0, 0.30)',
      ...transitionStyles,
    },
    ' [data-test-id="image"]': {
      ...transitionStyles,
    },
  },
};

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const StickyMedia = ({ children, getDeviceInformation }) => {
  const [isSticky, setIsSticky] = useState(false);

  // as this sticky media has issues in tablets so it will be disabled for them.
  if (getDeviceInformation.type === 'tablet') {
    return children;
  }
  const childs = React.Children.toArray(children.props.children);
  // [0] => ProductDiscountBadge
  // [1] => ProductImageSlider/ProductMediaSlider
  // take always last child
  const child = childs[childs.length - 1];
  if (!transitionsEnabled) {
    return (
      <Portal name="product.sticky-media" props={{ media: child }}>
        {({ media }) => (
          <div className={styles.wrapper}>
            <div>{media}</div>
            <Portal name="product.sticky-media.after" />
          </div>
        )}
      </Portal>
    );
  }

  return (
    <Fragment>
      <IntersectionVisibility thresholds={[0, 0.01]}>
        {({ ratio, setRef }) => {
          setIsSticky(ratio === 0);
          return (
            <div className={styles.stickyTrigger} ref={setRef} />
          );
        }}
      </IntersectionVisibility>
      <IntersectionVisibility>
        {({ ratio, setRef }) => (
          <Portal name="product.sticky-media" props={{ media: child }}>
            {({ media }) => (
              <div className={styles.wrapper}>
                <div
                  className={css(
                    ratio <= transitionRatio ? styles.transition : null,
                    isSticky ? styles.transition : null
                  )}
                  ref={setRef}
                >
                  {media}
                </div>
                <Portal name="product.sticky-media.after" />
              </div>
            )}
          </Portal>
        )}
      </IntersectionVisibility>
    </Fragment>
  );
};

StickyMedia.propTypes = {
  children: PropTypes.node.isRequired,
  getDeviceInformation: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(StickyMedia);
