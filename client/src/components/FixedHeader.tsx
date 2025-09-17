// components/FixedHeader.tsx
"use client"

import { Box, Typography, IconButton } from "@mui/material"
import { FiberManualRecord, Chat, Description, People } from "@mui/icons-material"

interface FixedHeaderProps {
    userName?: string
    userRole?: string
    lastLogin?: string
    showIcons?: boolean
}

export default function FixedHeader({
                                        userName = "Olalekan Babatunde",
                                        userRole = "Super Admin",
                                        lastLogin = "July 30, 2025 | 12:00PM",
                                        showIcons = true
                                    }: FixedHeaderProps) {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                right: 0,
                left: 280, // Sidebar width - adjust to match your sidebar
                height: 44,
                bgcolor: "white",
                borderBottom: "1px solid",
                borderColor: "grey.200",
                zIndex: 1200,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}
        >
            {/* Left side - Last login */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "grey.100",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                        bgcolor: "grey.200",
                        "& .status-dot": {
                            fontSize: 12
                        }
                    }
                }}
            >
                <FiberManualRecord
                    className="status-dot"
                    sx={{
                        fontSize: 8,
                        color: "#1976d2",
                        transition: "font-size 0.2s ease"
                    }}
                />
                <Typography variant="body2" color="text.secondary">
                    Your last login was recorded on: {lastLogin}
                </Typography>
            </Box>

            {/* Right side - Icons and user info */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {showIcons && (
                    <>
                        <IconButton size="small" sx={{ color: "grey.600" }}>
                            <Description />
                        </IconButton>
                        <IconButton size="small" sx={{ color: "grey.600" }}>
                            <People />
                        </IconButton>
                        <IconButton size="small" sx={{ color: "grey.600" }}>
                            <Chat />
                        </IconButton>
                    </>
                )}
                <Typography variant="body2">
                    <Box component="span" sx={{ color: "text.secondary" }}>
                        {userName} |{" Super Admin "}
                    </Box>
                    <Box component="span" sx={{ fontWeight: "medium" }}>
                        {userRole}
                    </Box>
                </Typography>
            </Box>
        </Box>
    )
}