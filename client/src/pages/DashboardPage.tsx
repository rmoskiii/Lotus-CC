"use client"

import React, { useState } from "react"
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Paper,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material"
import {
    TrendingUp,
    TrendingDown,
    People,
    CreditCard,
    AccountCircle,
    PersonOff,
    Info,
    Logout,
    Dashboard,
    PersonAdd,
    Settings,
    Description,
    FiberManualRecord,
    ShowChart,
} from "@mui/icons-material"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts"

const transactionData = [
    { month: "Jan", amount: 150 },
    { month: "Feb", amount: 380 },
    { month: "Mar", amount: 200 },
    { month: "Apr", amount: 520 },
    { month: "May", amount: 420 },
    { month: "Jun", amount: 650 },
    { month: "Jul", amount: 850 },
    { month: "Aug", amount: 580 },
    { month: "Sep", amount: 380 },
    { month: "Oct", amount: 150 },
    { month: "Nov", amount: 450 },
    { month: "Dec", amount: 180 },
]

const corporateAccountsData = [
    { month: "Jan", accounts: 2650 },
    { month: "Feb", accounts: 2720 },
    { month: "Mar", accounts: 2780 },
    { month: "Apr", accounts: 2820 },
    { month: "May", accounts: 2847 },
]

const activeInactiveData = [
    { name: "Active Accounts", value: 1647, color: "#1976d2" },
    { name: "Inactive Accounts", value: 1200, color: "#d32f2f" },
]

const dailyTransactionTrend = [
    { day: "Mon", transactions: 42000 },
    { day: "Tue", transactions: 45200 },
    { day: "Wed", transactions: 38000 },
    { day: "Thu", transactions: 47500 },
    { day: "Fri", transactions: 52000 },
    { day: "Sat", transactions: 28000 },
    { day: "Sun", transactions: 22000 },
]

const drawerWidth = 280

export default function CorporateBankingDashboard() {
    const [selectedMetric, setSelectedMetric] = useState<string | null>(null)

    const metrics = [
        {
            id: "corporate-accounts",
            title: "Total Corporate Accounts",
            value: "2,847",
            change: "+5.1%",
            changeType: "positive",
            subtitle: "+112 from yesterday",
            icon: People,
            color: "#1976d2",
        },
        {
            id: "daily-transactions",
            title: "Daily Transaction Count",
            value: "45.2K",
            change: "+5.1%",
            changeType: "positive",
            subtitle: "+112 from yesterday",
            icon: CreditCard,
            color: "#2e7d32",
        },
        {
            id: "active-accounts",
            title: "Total Active Accounts",
            value: "1647",
            change: "+5.1%",
            changeType: "positive",
            subtitle: "+112 from yesterday",
            icon: AccountCircle,
            color: "#388e3c",
        },
        {
            id: "inactive-accounts",
            title: "Total Inactive Accounts",
            value: "1200",
            change: "-25.5%",
            changeType: "negative",
            subtitle: "-12 from yesterday",
            icon: PersonOff,
            color: "#d32f2f",
        },
    ]

    const sidebarItems = [
        { text: "Dashboard", icon: Dashboard, active: true },
        { text: "Customer Onboarding", icon: PersonAdd, active: false },
        { text: "Customer Management", icon: People, active: false },
        { text: "Approval", icon: Settings, active: false },
        { text: "Audit Report", icon: Description, active: false },
    ]

    const renderOverlayContent = (metricId: string) => {
        switch (metricId) {
            case "corporate-accounts":
                return (
                    <Box sx={{ p: 2 }}>
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={6}>
                                <Card>
                                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            New This Month
                                        </Typography>
                                        <Typography variant="h4" fontWeight="bold">
                                            112
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card>
                                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Growth Rate
                                        </Typography>
                                        <Typography variant="h4" fontWeight="bold" color="success.main">
                                            5.1%
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Account Growth Trend
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={corporateAccountsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip cursor={{ fill: "transparent" }} />
                                <Line type="monotone" dataKey="accounts" stroke="#1976d2" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                )

            case "daily-transactions":
                return (
                    <Box sx={{ p: 2 }}>
                        <Grid container spacing={2} sx={{ mb: 4 }}>
                            <Grid item xs={4}>
                                <Card>
                                    <CardContent sx={{ textAlign: "center", py: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Peak Hour
                                        </Typography>
                                        <Typography variant="h6" fontWeight="bold">
                                            2:00 PM
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card>
                                    <CardContent sx={{ textAlign: "center", py: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Avg Amount
                                        </Typography>
                                        <Typography variant="h6" fontWeight="bold">
                                            $2,450
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card>
                                    <CardContent sx={{ textAlign: "center", py: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Success Rate
                                        </Typography>
                                        <Typography variant="h6" fontWeight="bold" color="success.main">
                                            98.7%
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Weekly Transaction Pattern
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dailyTransactionTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip cursor={{ fill: "transparent" }} />
                                <Bar dataKey="transactions" fill="#2e7d32" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                )

            case "active-accounts":
                return (
                    <Box sx={{ p: 2 }}>
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={6}>
                                <Card>
                                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Last Login Today
                                        </Typography>
                                        <Typography variant="h4" fontWeight="bold">
                                            1,247
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card>
                                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Active This Week
                                        </Typography>
                                        <Typography variant="h4" fontWeight="bold">
                                            1,580
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Active vs Inactive Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={activeInactiveData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {activeInactiveData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip cursor={{ fill: "transparent" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                )

            case "inactive-accounts":
                return (
                    <Box sx={{ p: 2 }}>
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={6}>
                                <Card>
                                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Dormant (&gt;90 days)
                                        </Typography>
                                        <Typography variant="h4" fontWeight="bold">
                                            850
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card>
                                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Recently Inactive
                                        </Typography>
                                        <Typography variant="h4" fontWeight="bold">
                                            350
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Typography variant="h6" sx={{ mb: 3 }}>
                            Reactivation Opportunities
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Paper sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography>Accounts inactive 30-60 days</Typography>
                                <Chip label="245" variant="outlined" />
                            </Paper>
                            <Paper sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography>Accounts inactive 60-90 days</Typography>
                                <Chip label="105" variant="outlined" />
                            </Paper>
                            <Paper sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography>Dormant accounts (&gt;90 days)</Typography>
                                <Chip label="850" color="error" />
                            </Paper>
                        </Box>
                    </Box>
                )

            default:
                return null
        }
    }

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
            {/* Sidebar */}
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
                <Box sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                        <Box mb={3}>
                            <img src="/assets/lotusss.png" alt="Lotus Bank" height={40} />
                        </Box>
                    </Box>

                    <List sx={{ p: 0 }}>
                        {sidebarItems.map((item) => (
                            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    sx={{
                                        borderRadius: 1,
                                        bgcolor: item.active ? "#1565c0" : "transparent",
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

                <Box sx={{ mt: "auto", p: 3 }}>
                    <ListItemButton
                        sx={{
                            borderRadius: 1,
                            "&:hover": { bgcolor: "#1565c0" },
                            color: "white",
                        }}
                    >
                        <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary="Sign Out" />
                    </ListItemButton>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: `calc(100vw - ${drawerWidth}px)`,
                    overflow: "hidden",
                }}
            >

                <Box
                    sx={{
                        transform: { xs: "scale(1)", md: "scale(0.8)" },
                        transformOrigin: "top left",
                        width: { xs: "100%", md: "calc(100% / 0.8)" },
                    }}
                >
                    {/* Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <FiberManualRecord sx={{ fontSize: 8, color: "#1976d2" }} />
                            <Typography variant="body2" color="text.secondary">
                                Your last login was recorded on: July 30, 2025 | 12:00PM
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <IconButton size="small">
                                <Description />
                            </IconButton>
                            <IconButton size="small">
                                <People />
                            </IconButton>
                            <Typography variant="body2">
                                <Box component="span" sx={{ color: "text.secondary" }}>
                                    Olalekan Babatunde |{" "}
                                </Box>
                                <Box component="span" sx={{ fontWeight: "medium" }}>
                                    Super Admin
                                </Box>
                            </Typography>
                        </Box>
                    </Box>

                    {/* Page Title */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color: "black" }}>
                            Corporate Banking Overview
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Real-time monitoring and management of corporate internet banking operations
                        </Typography>
                    </Box>

                    {/* Metrics Cards */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {metrics.map((metric) => {
                            const Icon = metric.icon
                            return (
                                <Grid item xs={12} sm={6} lg={3} key={metric.id}>
                                    <Card
                                        sx={{
                                            cursor: "pointer",
                                            transition: "all 0.2s",
                                            "&:hover": { boxShadow: 4 },
                                        }}
                                        onClick={() => setSelectedMetric(metric.id)}
                                    >
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                                                <Typography variant="subtitle1" fontWeight="medium">
                                                    {metric.title}
                                                </Typography>
                                                <Info sx={{ fontSize: 16, color: "text.secondary" }} />
                                            </Box>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                                                <Typography variant="h4" fontWeight="bold">
                                                    {metric.value}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 0.5,
                                                        color: metric.changeType === "positive" ? "success.main" : "error.main",
                                                    }}
                                                >
                                                    {metric.changeType === "positive" ? (
                                                        <TrendingUp sx={{ fontSize: 16 }} />
                                                    ) : (
                                                        <TrendingDown sx={{ fontSize: 16 }} />
                                                    )}
                                                    <Typography variant="body2" fontWeight="medium">
                                                        {metric.change}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {metric.subtitle}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>

                    {/* Transaction Trend Chart */}
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                            <ShowChart />
                            <Typography variant="h6" fontWeight="600">
                                Transaction Trend
                            </Typography>
                        </Box>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={transactionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip cursor={{ fill: "transparent" }} />
                                <Bar dataKey="amount" fill="#1976d2" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Box>
            </Box>

            {/* Overlay Dialog */}
            <Dialog
                open={!!selectedMetric}
                onClose={() => setSelectedMetric(null)}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                    {metrics.find((m) => m.id === selectedMetric)?.title}
                </DialogTitle>
                <DialogContent>{selectedMetric && renderOverlayContent(selectedMetric)}</DialogContent>
            </Dialog>
        </Box>
    )
}
