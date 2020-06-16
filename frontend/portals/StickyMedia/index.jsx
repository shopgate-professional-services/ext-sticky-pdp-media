import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { Portal } from '@shopgate/engage/components';
import { scrolledTopOffset } from '../../config';

const styles = {
  wrapper: css({
    position: 'sticky',
    top: scrolledTopOffset,
    zIndex: 1,
  }),
};

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const StickyMedia = ({ children }) => (
  <Portal name="product.sticky-media">
    <div className={styles.wrapper}>
      {children}
      <Portal name="product.sticky-media.after" />
    </div>
  </Portal>
);

StickyMedia.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StickyMedia;
