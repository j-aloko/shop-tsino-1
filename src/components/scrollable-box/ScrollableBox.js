import { styled } from '../../mui-styles/muiStyles';
import { Box } from '../mui-components/MuiComponents';

const ScrollableBox = styled(Box)({
  '&::-webkit-scrollbar': {
    display: 'none' /* For Chrome, Safari, and Opera */,
  },
  overflowY: 'scroll' /* For Firefox */,
  scrollbarWidth: 'none',
});

export default ScrollableBox;
