"use client"

import { useState } from "react"
import {
    Box,
    Card,
    CardContent,
    Typography,
} from "@mui/material"
import { Grid } from "@mui/material"
import FixedHeader from "@/components/FixedHeader"
import {
    TrendingUp,
    TrendingDown,
    People,
    CreditCard,
    AccountCircle,
    PersonOff,
    Info,
    ShowChart,
} from "@mui/icons-material"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from "recharts"

import Sidebar, { drawerWidth } from "@/components/Sidebar"

// Dummy data
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


export default function CorporateBankingDashboard() {
    const [ setSelectedMetric] = useState<string | null>(null)

    const metrics = [
        {
            id: "corporate-accounts",
            title: "Total Corporate Accounts",
            value: "2,847",
            change: "+5.1%",
            changeType: "positive",
            subtitle: "+112 from yesterday",
            icon: People,
        },
        {
            id: "daily-transactions",
            title: "Daily Transaction Count",
            value: "45.2K",
            change: "+5.1%",
            changeType: "positive",
            subtitle: "+112 from yesterday",
            icon: CreditCard,
        },
        {
            id: "active-accounts",
            title: "Total Active Accounts",
            value: "1647",
            change: "+5.1%",
            changeType: "positive",
            subtitle: "+112 from yesterday",
            icon: AccountCircle,
        },
        {
            id: "inactive-accounts",
            title: "Total Inactive Accounts",
            value: "1200",
            change: "-25.5%",
            changeType: "negative",
            subtitle: "-12 from yesterday",
            icon: PersonOff,
        },
    ]

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
            {/* Sidebar */}
            <Sidebar />

            <FixedHeader
                userName="Olalekan Babatunde"
                userRole="Super Admin"
                showIcons={true}
            />
            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    mt: '44px',
                    p: 4,
                    overflow: "hidden",
                    width: `calc(100vw - ${drawerWidth}px - 60px)`,
                }}
            >
                <Box
                    sx={{
                        transform: { xs: "scale(1)", md: "scale(0.8)" },
                        transformOrigin: "top left",
                        width: { xs: "100%", md: "calc(100% / 0.8)" },
                    }}
                >

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
                        {metrics.map((metric) => (
                            <Grid item xs={12} sm={6} lg={3} key={metric.id}>
                                <Card
                                    sx={{ cursor: "pointer", transition: "all 0.2s", "&:hover": { boxShadow: 4 } }}
                                    onClick={() => setSelectedMetric(metric.id)}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
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
                        ))}
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
                                <Bar dataKey="amount" fill="#1e3a8a" radius={[18, 18, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Box>
            </Box>
        </Box>
    )
}
