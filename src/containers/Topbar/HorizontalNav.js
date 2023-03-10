import React from "react";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const HorizontalNav = () => {

  const navStyle = useSelector(({ settings }) => settings.navStyle);
  const { pathname } = useSelector(({ common }) => common);

  const getNavStyleSubMenuClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
      default:
        return "gx-menu-horizontal";

    }
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];
  return (

    <Menu
      defaultOpenKeys={[defaultOpenKeys]}
      selectedKeys={[selectedKeys]}
      mode="horizontal">

      <Link to="/dashboard">
        <SubMenu className={getNavStyleSubMenuClass(navStyle)} key="dashboard"
          title={<IntlMessages id="sidebar.dashboard" />}>
        </SubMenu>
      </Link>


      <Link to="/manageUser">
        <SubMenu className={getNavStyleSubMenuClass(navStyle)} key="users"
          title={<IntlMessages id="sidebar.users" />}>
        </SubMenu>
      </Link>

      <Link to="/manageSector">
        <SubMenu className={getNavStyleSubMenuClass(navStyle)} key="sectors"
          title={<IntlMessages id="sidebar.sectors" />}>
        </SubMenu>
      </Link>

      <Link to="/manageBond">
        <SubMenu className={getNavStyleSubMenuClass(navStyle)} key="bonds"
          title={<IntlMessages id="sidebar.bonds" />}>
        </SubMenu>
      </Link>

      <SubMenu className={getNavStyleSubMenuClass(navStyle)} key="news"
        title={<IntlMessages id="sidebar.news" />}>
      </SubMenu>


    </Menu>

  );
};

HorizontalNav.propTypes = {};

export default HorizontalNav;

