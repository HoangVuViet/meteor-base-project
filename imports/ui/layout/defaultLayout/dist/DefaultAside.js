"use strict";
exports.__esModule = true;
exports.ButtonRow = void 0;
var core_1 = require("@material-ui/core");
var Menu_1 = require("@material-ui/icons/Menu");
var classnames_1 = require("classnames");
var React = require("react");
require("react-perfect-scrollbar/dist/css/styles.css");
var react_redux_1 = require("react-redux");
var sidebarStyle_js_1 = require("../../../../public/jss/material-dashboard-react/components/sidebarStyle.js");
var colors_1 = require("../../configs/colors");
var routes_1 = require("../../configs/routes");
var elements_1 = require("../../modules/common/components/elements");
require("../../scss/svg.scss");
var constants_1 = require("../constants");
var utils_1 = require("../utils");
var useStyles = core_1.makeStyles(sidebarStyle_js_1["default"]);
exports.ButtonRow = core_1.withStyles(function (theme) { return ({
    root: {
        '&:hover': {
            background: colors_1.GREEN
        },
        height: constants_1.ASIDE_ITEM_HEIGHT,
        paddingRight: '20px',
        display: 'flex',
        justifyContent: 'flex-start',
        minWidth: constants_1.ASIDE_WIDTH,
        textAlign: 'start'
    }
}); })(core_1.ButtonBase);
var mapStateToProps = function (state) {
    return { router: state.router, userData: state.account.userData };
};
var DefaultAside = function (props) {
    var classes = useStyles();
    var router = props.router, open = props.open, onClose = props.onClose, userData = props.userData;
    var pathname = router.location.pathname;
    var _a = React.useState(false), hoverOpen = _a[0], setOpen = _a[1];
    var getListRouterActive = React.useMemo(function () {
        return utils_1.getListRoutesContain(routes_1.ROUTES_TAB, router.location.pathname);
    }, [router.location.pathname]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: {
                minWidth: open ? constants_1.ASIDE_WIDTH : constants_1.ASIDE_MIN_WIDTH,
                transition: 'all 0.3s'
            } }),
        React.createElement("div", { className: classes.background, style: {
                width: open || hoverOpen ? constants_1.ASIDE_WIDTH : constants_1.ASIDE_MIN_WIDTH,
                overflow: 'hidden',
                height: 'calc(100vh)',
                transition: 'width 0.3s',
                position: 'fixed',
                left: 0,
                flexShrink: 0,
                // background: PRIMARY
                backgroundImage: 'url(../../../../images/sidebar-2.jpg)',
                zIndex: 1200
            } },
            React.createElement(exports.ButtonRow, { style: {
                    justifyContent: open || hoverOpen ? 'flex-end' : 'center',
                    padding: open || hoverOpen ? '0px 20px' : 0,
                    height: constants_1.HEADER_HEIGHT,
                    minWidth: open || hoverOpen ? constants_1.ASIDE_WIDTH : constants_1.ASIDE_MIN_WIDTH
                }, onClick: onClose }, open || hoverOpen ? (React.createElement(elements_1.Row, { className: classes.background },
                React.createElement("div", { className: classes.logo },
                    React.createElement(elements_1.Row, { className: classnames_1["default"](classes.logoLink) },
                        React.createElement("div", null,
                            React.createElement("img", { src: "../../../../svg/ic_myTourWhiteLogo.svg", alt: "logo" })),
                        "Logooo")))) : (React.createElement(elements_1.Row, { className: classes.background, style: { alignItems: 'center' } },
                React.createElement(Menu_1["default"], { className: classes.background })))))));
};
exports["default"] = react_redux_1.connect(mapStateToProps)(DefaultAside);
