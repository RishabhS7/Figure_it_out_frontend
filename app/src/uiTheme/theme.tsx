import { createMuiTheme} from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
// declare module '@material-ui/core/styles/createMuiTheme' {
//   interface Theme {
//     appDrawer: {
//       width: React.CSSProperties['width']
//       breakpoint: Breakpoint
//     },
//       // palette :{
//       //          primary:{main:'#5A254B',light:"#5A254B"},
//       //          secondary:{main:'#48A8E8'},
//       //          selected:{main:'#700688'}
//       //        }
              
    
//   }
// }
const  theme = createMuiTheme({
  palette: {
    primary:{main:'#FFE400',light:'#F85C01'},
    secondary:{main:'#53900f',light:"red"},
  },
  });

 export default theme;


