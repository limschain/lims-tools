(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{CWS2:function(e,t,n){"use strict";var a=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("T2oS");var r=a(n("W9HT"));n("Pwec");var o=a(n("CtXQ"));n("lUTK");var l=a(n("BvKs"));n("Telt");var u=a(n("Tckk")),c=a(n("2Taf")),i=a(n("vZ4D")),s=a(n("l4Ni")),f=a(n("ujKo")),d=a(n("MhPg")),p=n("Y2fQ"),m=a(n("q1tI")),h=n("MuoO"),g=a(n("3a4m")),y=a(n("uZXw")),v=a(n("h3zL")),b=function(e){function t(){var e;return(0,c.default)(this,t),e=(0,s.default)(this,(0,f.default)(t).apply(this,arguments)),e.onMenuClick=function(t){var n=t.key;if("logout"!==n)g.default.push("/account/".concat(n));else{var a=e.props.dispatch;a&&a({type:"login/logout"})}},e}return(0,d.default)(t,e),(0,i.default)(t,[{key:"render",value:function(){var e=this.props,t=e.currentUser,n=void 0===t?{}:t,a=e.menu;if(!a)return m.default.createElement("span",{className:"".concat(v.default.action," ").concat(v.default.account)},m.default.createElement(u.default,{size:"small",className:v.default.avatar,src:n.avatar,alt:"avatar"}),m.default.createElement("span",{className:v.default.name},n.name));var c=m.default.createElement(l.default,{className:v.default.menu,selectedKeys:[],onClick:this.onMenuClick},m.default.createElement(l.default.Item,{key:"center"},m.default.createElement(o.default,{type:"user"}),m.default.createElement(p.FormattedMessage,{id:"menu.account.center",defaultMessage:"account center"})),m.default.createElement(l.default.Item,{key:"settings"},m.default.createElement(o.default,{type:"setting"}),m.default.createElement(p.FormattedMessage,{id:"menu.account.settings",defaultMessage:"account settings"})),m.default.createElement(l.default.Divider,null),m.default.createElement(l.default.Item,{key:"logout"},m.default.createElement(o.default,{type:"logout"}),m.default.createElement(p.FormattedMessage,{id:"menu.account.logout",defaultMessage:"logout"})));return n&&n.name?m.default.createElement(y.default,{overlay:c},m.default.createElement("span",{className:"".concat(v.default.action," ").concat(v.default.account)},m.default.createElement(u.default,{size:"small",className:v.default.avatar,src:n.avatar,alt:"avatar"}),m.default.createElement("span",{className:v.default.name},n.name))):m.default.createElement(r.default,{size:"small",style:{marginLeft:8,marginRight:8}})}}]),t}(m.default.Component),E=(0,h.connect)(function(e){var t=e.user;return{currentUser:t.currentUser}})(b);t.default=E},Fw9o:function(e,t,n){"use strict";var a=n("tAuX"),r=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("5NDa");var o=r(n("5rEg"));n("O3gP");var l=r(n("lrIw"));n("Pwec");var u=r(n("CtXQ")),c=r(n("eHn4")),i=r(n("Y/ft")),s=r(n("2Taf")),f=r(n("vZ4D")),d=r(n("l4Ni")),p=r(n("ujKo")),m=r(n("MhPg")),h=a(n("q1tI")),g=r(n("TSYQ")),y=r(n("sEfC")),v=r(n("G3lK")),b=function(e){function t(e){var n;return(0,s.default)(this,t),n=(0,d.default)(this,(0,p.default)(t).call(this,e)),n.timeout=void 0,n.inputRef=null,n.onKeyDown=function(e){if("Enter"===e.key){var t=n.props.onPressEnter,a=n.state.value;n.timeout=window.setTimeout(function(){t(a)},0)}},n.onChange=function(e){if("string"===typeof e){var t=n.props,a=t.onSearch,r=t.onChange;n.setState({value:e}),a&&a(e),r&&r(e)}},n.enterSearchMode=function(){var e=n.props.onVisibleChange;e(!0),n.setState({searchMode:!0},function(){var e=n.state.searchMode;e&&n.inputRef&&n.inputRef.focus()})},n.leaveSearchMode=function(){n.setState({searchMode:!1,value:""})},n.debouncePressEnter=function(){var e=n.props.onPressEnter,t=n.state.value;e(t)},n.state={searchMode:e.defaultOpen,value:""},n.debouncePressEnter=(0,y.default)(n.debouncePressEnter,500,{leading:!0,trailing:!1}),n}return(0,m.default)(t,e),(0,f.default)(t,[{key:"componentWillUnmount",value:function(){clearTimeout(this.timeout)}},{key:"render",value:function(){var e=this,t=this.props,n=t.className,a=t.placeholder,r=(t.open,(0,i.default)(t,["className","placeholder","open"])),s=this.state,f=s.searchMode,d=s.value;delete r.defaultOpen;var p=(0,g.default)(v.default.input,(0,c.default)({},v.default.show,f));return h.default.createElement("span",{className:(0,g.default)(n,v.default.headerSearch),onClick:this.enterSearchMode,onTransitionEnd:function(t){var n=t.propertyName;if("width"===n&&!f){var a=e.props.onVisibleChange;a(f)}}},h.default.createElement(u.default,{type:"search",key:"Icon"}),h.default.createElement(l.default,Object.assign({key:"AutoComplete"},r,{className:p,value:d,onChange:this.onChange}),h.default.createElement(o.default,{ref:function(t){e.inputRef=t},"aria-label":a,placeholder:a,onKeyDown:this.onKeyDown,onBlur:this.leaveSearchMode})))}}],[{key:"getDerivedStateFromProps",value:function(e){return"open"in e?{searchMode:e.open}:null}}]),t}(h.Component);t.default=b,b.defaultProps={defaultActiveFirstOption:!1,onPressEnter:function(){},onSearch:function(){},onChange:function(){},className:"",placeholder:"",dataSource:[],defaultOpen:!1,onVisibleChange:function(){}}},G3lK:function(e,t,n){e.exports={headerSearch:"antd-pro-components-header-search-index-headerSearch",input:"antd-pro-components-header-search-index-input",show:"antd-pro-components-header-search-index-show"}},"O/iA":function(e,t,n){e.exports={"ant-select-auto-complete":"ant-select-auto-complete","ant-select":"ant-select","ant-select-selection":"ant-select-selection","ant-select-selection__rendered":"ant-select-selection__rendered","ant-select-selection__placeholder":"ant-select-selection__placeholder","ant-select-selection--single":"ant-select-selection--single","ant-select-search--inline":"ant-select-search--inline","ant-select-allow-clear":"ant-select-allow-clear","ant-input":"ant-input","ant-select-lg":"ant-select-lg","ant-select-sm":"ant-select-sm","ant-input-group":"ant-input-group","ant-select-search__field":"ant-select-search__field","ant-input-affix-wrapper":"ant-input-affix-wrapper"}},O3gP:function(e,t,n){"use strict";n.r(t);n("cIOH"),n("O/iA"),n("OaEy"),n("5NDa")},bx7e:function(e,t,n){"use strict";var a=n("tAuX"),r=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("gWZ8")),l=r(n("p0pE")),u=r(n("y1Nh")),c=a(n("q1tI")),i=r(n("wY1l")),s=n("MuoO"),f=n("Y2fQ"),d=r(n("eTk0")),p=r(n("sgkG")),m=r(n("mxmt")),h=function e(t){return t.map(function(t){var n=(0,l.default)({},t,{children:t.children?e(t.children):[]});return d.default.check(t.authority,n,null)})},g=function(e,t){return c.default.createElement(c.default.Fragment,null,c.default.createElement("div",{style:{padding:"0px 24px 24px",textAlign:"center"}},"copyright\xa9","\u5229\u59c6\u65af\uff08\u5317\u4eac\uff09\u533a\u5757\u94fe\u79d1\u6280\u6709\u9650\u516c\u53f8"))},y=function(e){var t=e.dispatch,n=e.children,a=e.settings;(0,c.useEffect)(function(){t&&(t({type:"user/fetchCurrent"}),t({type:"settings/getSetting"}))},[]);var r=function(e){return t&&t({type:"global/changeLayoutCollapsed",payload:e})};return c.default.createElement(u.default,Object.assign({logo:m.default,onCollapse:r,menuItemRender:function(e,t){return e.isUrl?t:c.default.createElement(i.default,{to:e.path},t)},breadcrumbRender:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return[{path:"/",breadcrumbName:(0,f.formatMessage)({id:"menu.home",defaultMessage:"Home"})}].concat((0,o.default)(e))},footerRender:g,menuDataRender:h,formatMessage:f.formatMessage,rightContentRender:function(e){return c.default.createElement(p.default,Object.assign({},e))}},e,a),n)},v=(0,s.connect)(function(e){var t=e.global,n=e.settings;return{collapsed:t.collapsed,settings:n}})(y);t.default=v},h3zL:function(e,t,n){e.exports={logo:"antd-pro-components-global-header-index-logo",menu:"antd-pro-components-global-header-index-menu",trigger:"antd-pro-components-global-header-index-trigger",right:"antd-pro-components-global-header-index-right",action:"antd-pro-components-global-header-index-action",search:"antd-pro-components-global-header-index-search",account:"antd-pro-components-global-header-index-account",avatar:"antd-pro-components-global-header-index-avatar",dark:"antd-pro-components-global-header-index-dark",name:"antd-pro-components-global-header-index-name"}},lrIw:function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),r=n("LdHM"),o=n("TSYQ"),l=n.n(o),u=n("i8i4");function c(e){return c="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},i.apply(this,arguments)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function d(e,t,n){return t&&f(e.prototype,t),n&&f(e,n),e}function p(e,t){return!t||"object"!==c(t)&&"function"!==typeof t?m(e):t}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}function g(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}function y(e,t){return y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},y(e,t)}var v=function(e){function t(){var e;return s(this,t),e=p(this,h(t).apply(this,arguments)),e.focus=function(){e.ele.focus?e.ele.focus():u["findDOMNode"](e.ele).focus()},e.blur=function(){e.ele.blur?e.ele.blur():u["findDOMNode"](e.ele).blur()},e.saveRef=function(t){e.ele=t;var n=e.props.children.ref;"function"===typeof n&&n(t)},e}return g(t,e),d(t,[{key:"render",value:function(){return a["cloneElement"](this.props.children,i({},this.props,{ref:this.saveRef}),null)}}]),t}(a["Component"]),b=n("5rEg"),E=n("2fM7"),O=n("wEI+");function w(e){return w="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w(e)}function S(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function M(){return M=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},M.apply(this,arguments)}function _(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function C(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function P(e,t,n){return t&&C(e.prototype,t),n&&C(e,n),e}function k(e,t){return!t||"object"!==w(t)&&"function"!==typeof t?x(e):t}function x(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function j(e){return j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},j(e)}function N(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&T(e,t)}function T(e,t){return T=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},T(e,t)}function I(e){return e&&e.type&&(e.type.isSelectOption||e.type.isSelectOptGroup)}n.d(t,"default",function(){return D});var D=function(e){function t(){var e;return _(this,t),e=k(this,j(t).apply(this,arguments)),e.getInputElement=function(){var t=e.props.children,n=t&&a["isValidElement"](t)&&t.type!==r["Option"]?a["Children"].only(e.props.children):a["createElement"](b["default"],null),o=M({},n.props);return delete o.children,a["createElement"](v,o,n)},e.saveSelect=function(t){e.select=t},e.renderAutoComplete=function(t){var n,o,u=t.getPrefixCls,c=e.props,i=c.prefixCls,s=c.size,f=c.className,d=void 0===f?"":f,p=c.notFoundContent,m=c.optionLabelProp,h=c.dataSource,g=c.children,y=u("select",i),v=l()((n={},S(n,"".concat(y,"-lg"),"large"===s),S(n,"".concat(y,"-sm"),"small"===s),S(n,d,!!d),S(n,"".concat(y,"-show-search"),!0),S(n,"".concat(y,"-auto-complete"),!0),n)),b=a["Children"].toArray(g);return o=b.length&&I(b[0])?g:h?h.map(function(e){if(a["isValidElement"](e))return e;switch(w(e)){case"string":return a["createElement"](r["Option"],{key:e},e);case"object":return a["createElement"](r["Option"],{key:e.value},e.text);default:throw new Error("AutoComplete[dataSource] only supports type `string[] | Object[]`.")}}):[],a["createElement"](E["default"],M({},e.props,{className:v,mode:E["default"].SECRET_COMBOBOX_MODE_DO_NOT_USE,optionLabelProp:m,getInputElement:e.getInputElement,notFoundContent:p,ref:e.saveSelect}),o)},e}return N(t,e),P(t,[{key:"focus",value:function(){this.select.focus()}},{key:"blur",value:function(){this.select.blur()}},{key:"render",value:function(){return a["createElement"](O["a"],null,this.renderAutoComplete)}}]),t}(a["Component"]);D.Option=r["Option"],D.OptGroup=r["OptGroup"],D.defaultProps={transitionName:"slide-up",optionLabelProp:"children",choiceTransitionName:"zoom",showSearch:!1,filterOption:!1}},sgkG:function(e,t,n){"use strict";var a=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("Pwec");var r=a(n("CtXQ"));n("5Dmo");var o=a(n("3S7+")),l=a(n("q1tI")),u=n("MuoO"),c=n("Y2fQ"),i=a(n("CWS2")),s=a(n("Fw9o")),f=a(n("trCS")),d=a(n("h3zL")),p=function(e){var t=e.theme,n=e.layout,a=d.default.right;return"dark"===t&&"topmenu"===n&&(a="".concat(d.default.right,"  ").concat(d.default.dark)),l.default.createElement("div",{className:a},l.default.createElement(s.default,{className:"".concat(d.default.action," ").concat(d.default.search),placeholder:(0,c.formatMessage)({id:"component.globalHeader.search"}),dataSource:[(0,c.formatMessage)({id:"component.globalHeader.search.example1"}),(0,c.formatMessage)({id:"component.globalHeader.search.example2"}),(0,c.formatMessage)({id:"component.globalHeader.search.example3"})],onSearch:function(e){console.log("input",e)},onPressEnter:function(e){console.log("enter",e)}}),l.default.createElement(o.default,{title:(0,c.formatMessage)({id:"component.globalHeader.help"})},l.default.createElement("a",{target:"_blank",href:"https://pro.ant.design/docs/getting-started",rel:"noopener noreferrer",className:d.default.action},l.default.createElement(r.default,{type:"question-circle-o"}))),l.default.createElement(i.default,null),l.default.createElement(f.default,{className:d.default.action}))},m=(0,u.connect)(function(e){var t=e.settings;return{theme:t.navTheme,layout:t.layout}})(p);t.default=m}}]);