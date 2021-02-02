import {createGlobalStyle} from'styled-components';
export const IconStyle = createGlobalStyle`
    @font-face {font-family: "iconfont";
    src: url('iconfont.eot?t=1612254955072'); /* IE9 */
    src: url('iconfont.eot?t=1612254955072#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
    url('iconfont.woff?t=1612254955072') format('woff'),
    url('iconfont.ttf?t=1612254955072') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url('iconfont.svg?t=1612254955072#iconfont') format('svg'); /* iOS 4.1- */
    }

    .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }
`