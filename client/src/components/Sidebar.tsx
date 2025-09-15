"use client"

import {
        Box,
        Drawer,
        List,
        ListItem,
        ListItemButton,
        ListItemIcon,
        ListItemText,
} from "@mui/material"
import {
        Dashboard,
        PersonAdd,
        People,
        Settings,
        Description,
        Logout,
} from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router-dom"

const drawerWidth = 280

const sidebarItems = [
        { text: "Dashboard", icon: Dashboard, route: "/dashboard" },
        { text: "Customer Onboarding", icon: PersonAdd, route: "/onboarding" },
        { text: "Customer Management", icon: People, route: "/management" },
        { text: "Approval", icon: Settings, route: "/approval" },
        { text: "Audit Report", icon: Description, route: "/audit" },
]

export default function Sidebar() {
        const navigate = useNavigate()
        const location = useLocation()

        return (
            <Drawer
                variant="permanent"
                sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                                width: drawerWidth,
                                boxSizing: "border-box",
                                bgcolor: "#1e3a8a",
                                color: "white",
                        },
                }}
            >
                    {/* Logo */}
                    <Box sx={{ p: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                                    <Box mb={3}>
                                            <img src="/assets/lotusss.png" alt="Lotus Bank" height={40} />
                                    </Box>
                            </Box>

                            {/* Navigation Items */}
                            <List sx={{ p: 0 }}>
                                    {sidebarItems.map((item) => (
                                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                                <ListItemButton
                                                    onClick={() => navigate(item.route)}
                                                    sx={{
                                                            borderRadius: 1,
                                                            bgcolor: location.pathname === item.route ? "#1565c0" : "transparent",
                                                            "&:hover": { bgcolor: "#1565c0" },
                                                            color: "white",
                                                    }}
                                                >
                                                        <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                                                                <item.icon />
                                                        </ListItemIcon>
                                                        <ListItemText primary={item.text} />
                                                </ListItemButton>
                                        </ListItem>
                                    ))}
                            </List>
                    </Box>

                    {/* Sign Out Button */}
                    <Box sx={{ mt: "auto", p: 3 }}>
                            <ListItemButton
                                sx={{
                                        borderRadius: 1,
                                        "&:hover": { bgcolor: "#1565c0" },
                                        color: "white",
                                }}
                                onClick={() => navigate("/login")}
                            >
                                    <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                                            <Logout />
                                    </ListItemIcon>
                                    <ListItemText primary="Sign Out" />
                            </ListItemButton>
                    </Box>
            </Drawer>
        )
}

export { drawerWidth }
