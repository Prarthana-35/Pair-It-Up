/* eslint-disable no-unused-vars */
import React from "react";
import { Drawer, List, ListItem, ListItemText, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from 'react-router-dom';
import Settings from "./pages/Settings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Themes from "./pages/Themes";

const MenuDrawer = ({ anchor = "left", menuItems, drawerOpen, toggleDrawer }) => {
  return (
    <div>
        
      <IconButton onClick={toggleDrawer(true)} style={{ margin: "10px" }}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor={anchor} open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          style={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index}>
                <Link to={item.link} style={{ textDecoration: "none", color: "inherit" }}>
                  {item.icon}
                  <ListItemText primary={item.text} style={{ marginLeft: "10px" }} />
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default MenuDrawer;
