import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { scrolledTopOffset } from '../../config';

const styles = {
  wrapper: css({
    position: 'sticky',
    top: scrolledTopOffset,
    zIndex: 99,
  }),
};

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const StickyMedia = ({ children }) => (
  <div className={styles.wrapper}>
    {children}
  </div>
);

StickyMedia.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StickyMedia;
