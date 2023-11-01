import { connect } from 'react-redux';
import { getDeviceInformation } from '@shopgate/pwa-common/selectors/client';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  getDeviceInformation: getDeviceInformation(state),
});

export default connect(mapStateToProps);
