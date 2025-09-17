"use client"

import { useState } from "react"
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    InputAdornment,
    MenuItem,
    Select,
    Button,
    Pagination,
} from "@mui/material"
import { Search } from "@mui/icons-material"
import Sidebar, {drawerWidth} from "@/components/Sidebar"
import { DateRange } from "@mui/icons-material"
import FixedHeader from "@/components/FixedHeader.tsx"; // for the date filter button

interface AuditRecord {
    timestamp: string
    action: string
    performedBy: string
    targetCustomer: string
    branch: string
    status: "Success" | "Failed"
    ipAddress: string
}

const mockAuditTrail: AuditRecord[] = [
    {
        timestamp: "7th of Aug, 2025 02:35 PM",
        action: "Profile Created",
        performedBy: "Olalekan Aminu",
        targetCustomer: "Adeola Ogunleye",
        branch: "Lekki Admiralty",
        status: "Success",
        ipAddress: "192.168.1.45",
    },
    {
        timestamp: "7th of Aug, 2025 02:35 PM",
        action: "Profile Approved",
        performedBy: "Olalekan Aminu",
        targetCustomer: "Chiamaka Eze",
        branch: "Head Office",
        status: "Success",
        ipAddress: "192.168.1.45",
    },
    {
        timestamp: "7th of Aug, 2025 02:35 PM",
        action: "Profile Rejected",
        performedBy: "Olalekan Aminu",
        targetCustomer: "Folake Balogun",
        branch: "Ahmed Onibo",
        status: "Success",
        ipAddress: "192.168.1.45",
    },
    {
        timestamp: "7th of Aug, 2025 02:35 PM",
        action: "Profile Activated",
        performedBy: "Olalekan Aminu",
        targetCustomer: "Kabiru Lawal",
        branch: "Obalende",
        status: "Failed",
        ipAddress: "192.168.1.45",
    },
    {
        timestamp: "7th of Aug, 2025 02:35 PM",
        action: "Profile Created",
        performedBy: "Olalekan Aminu",
        targetCustomer: "Obinna Nwosu",
        branch: "Obalende",
        status: "Success",
        ipAddress: "192.168.1.45",
    },
]

export default function AuditReportPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [actionFilter, setActionFilter] = useState("All Actions")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const filteredRecords = mockAuditTrail.filter(
        (record) =>
            record.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.performedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.targetCustomer.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const paginatedRecords = filteredRecords.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    )

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
            <Sidebar />
            <FixedHeader
                userName="Olalekan Babatunde"
                userRole="Super Admin"
                showIcons={true}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: `calc(100vw - ${drawerWidth}px - 40px)`,
                    mt: "44px",
                    pr: 3,
                    p: 3,
                    pt: 4,
                    pb: 4,
                }}
            >

            {/* Page Title */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color: "#000000" }}>
                        Audit Trail & Reporting
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Monitor system activities and generate compliance reports
                    </Typography>
                </Box>

                {/* Section Title + Button */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Box>
                        <Typography variant="h6" fontWeight="600" sx={{ mb: 1, color: "#000000 !important" }}>
                            Audit Trail
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Search and filter audit trail by various criteria
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#00C2A8",
                            textTransform: "none",
                            fontWeight: "bold",
                            borderRadius: "8px",
                            px: 3,
                        }}
                    >
                        Generate Report
                    </Button>
                </Box>

                {/* Search + Filters */}
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <TextField
                        placeholder="Search by user, action"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ width: 300 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: "text.secondary" }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Select
                        size="small"
                        value={actionFilter}
                        onChange={(e) => setActionFilter(e.target.value)}
                        sx={{ minWidth: 150 }}
                    >
                        <MenuItem value="All Actions">All Actions</MenuItem>
                        <MenuItem value="Profile Created">Profile Created</MenuItem>
                        <MenuItem value="Profile Approved">Profile Approved</MenuItem>
                        <MenuItem value="Profile Rejected">Profile Rejected</MenuItem>
                    </Select>

                    <Button
                        variant="outlined"
                        startIcon={<DateRange />}
                        sx={{ borderColor: "grey.400", color: "grey.700", textTransform: "none" }}
                    >
                        01 Jan 2023 - 10 Mar 2023
                    </Button>
                </Box>

                {/* Audit Table */}
                <TableContainer component={Paper} sx={{ mb: 3, width: "100%" }}>
                <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "#1e3a8a" }}>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Timestamp</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Performed By</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Target Customer</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Branch</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>IP Address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedRecords.map((record, index) => (
                                <TableRow key={index}>
                                    <TableCell>{record.timestamp}</TableCell>
                                    <TableCell>{record.action}</TableCell>
                                    <TableCell>{record.performedBy}</TableCell>
                                    <TableCell>{record.targetCustomer}</TableCell>
                                    <TableCell>{record.branch}</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "inline-block",
                                                bgcolor: record.status === "Success" ? "#E8F5E9" : "#FFEBEE",
                                                color: record.status === "Success" ? "green" : "red",
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: "6px",
                                                fontSize: "0.8rem",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {record.status}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{record.ipAddress}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                        Showing 1 to {Math.min(itemsPerPage, filteredRecords.length)} of {filteredRecords.length} entries
                    </Typography>
                    <Pagination
                        count={Math.ceil(filteredRecords.length / itemsPerPage)}
                        page={currentPage}
                        onChange={(_, page) => setCurrentPage(page)}
                        color="primary"
                    />
                </Box>
            </Box>
        </Box>
    )
}
