import {createGlobalStyle} from'styled-components';
export const IconStyle = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1612320711212'); /* IE9 */
  src: url('iconfont.eot?t=1612320711212#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('iconfont.woff?t=1612320711212') format('woff'),
  url('iconfont.ttf?t=1612320711212') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1612320711212#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
`