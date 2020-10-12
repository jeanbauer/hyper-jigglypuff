const path = require("path");
const color = require("color");

const filepath = path.resolve(__dirname, "images");

function getUserOptions(configObj) {
  return Object.assign(
    {},
    {
      get jigglypuffVersion() {
        return configObj.jigglypuffVersion || "v";
      },
      get jigglypuffHide() {
        return (configObj.jigglypuffHide || "false") === "true";
      },
    }
  );
}

exports.decorateConfig = (config) => {
  const options = getUserOptions(config);
  const gifPath = path.join(filepath, `${options.jigglypuffVersion}.gif`);

  const primary = "#fac7d6";
  const secondary = "#ff9a9e";
  const tertiary = "#ec6b70";

  const background = primary;
  const selection = color(tertiary).alpha(0.3).string();
  const transparent = color(secondary).alpha(0).string();
  const header = "#FAFAFA";

  const tabContent = options.jigglypuffHide ? "" : gifPath;

  const syntax = {
    backgroundColor: transparent,
    borderColor: background,
    cursorColor: "#ec6b70",
    foregroundColor: "#FFFFFF",
    selectionColor: selection,
    colors: {
      black: "#ff9a9e",
      red: "#C51E14",
      green: "#ec6b70",
      yellow: "#ec6b70",
      blue: "#fac7d6",
      magenta: "#C839C5",
      cyan: "#20C5C6",
      white: "#FFFFFF",
      lightBlack: "#686868",
      lightRed: "#FD6F6B",
      lightGreen: "#67F86F",
      lightYellow: "#FFFA72",
      lightBlue: "#6A76FB",
      lightMagenta: "#FD7CFC",
      lightCyan: "#18565d",
      lightWhite: "#FFFFFF",
    },
  };

  return Object.assign({}, config, syntax, {
    termCSS: config.termCSS || "",
    css: `
      ${config.css || ""}
      .terms_terms {
        background-size: cover;
      }
      .header_shape, .header_appTitle {
        color: ${header};
      }
      .header_header, .header_windowHeader {
        background-color: ${background} !important;
      }
      .hyper_main {
        color: #FFF;
        background-color: ${background};
        background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
        border-width: 3px;border-image: linear-gradient(to top, #fad0c4, #fad0c4 61%, #ff9a9e);
        border-image-slice: 1;
      }
      // Loads jigglypuff in the active tab (even when there is only 1)
      .tabs_nav .tabs_title::before {
        content: url("file://${tabContent}");
        position: absolute;
        right: 10px;
        top: -2px;
      }
      // Loads jigglypuff in the other tabs
      .tab_textActive .tab_textInner::before {
        content: url("file://${tabContent}");
        position: absolute;
        right: 0;
        top: -2px;
      }
      .tabs_nav .tabs_list {
        border-bottom: 0;
      }
      .tabs_nav .tabs_title,
      .tabs_nav .tabs_list .tab_tab {
        color: #FFF;
        border: 0;
      }
      .tab_icon {
        color: ${background};
        width: 15px;
        height: 15px;
      }
      .tab_icon:hover {
        background-color: ${background};
      }
      .tab_shape {
        color: ${secondary};
        width: 7px;
        height: 7px;
      }
      .tab_shape:hover {
        color: #FFF;
      }
      .tab_active {
        background-color: ${secondary};
      }
      .tabs_nav .tabs_list .tab_tab:not(.tab_active) {
        background-color: ${primary};
      }
      .tabs_nav .tabs_list {
        color: ${background};
      }
      .tab_tab::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4px;
        background-color: #FFF;
        transform: scaleX(0);
        transition: none;
      }
      .tab_tab.tab_active::before {
        transform: scaleX(1);
        transition: all 400ms cubic-bezier(0.0, 0.0, 0.2, 1)
      }
      .terms_terms .terms_termGroup .splitpane_panes .splitpane_divider {
        background-color: #FFF !important;
      }
    `,
  });
};
