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
    IconButton,
    TextField,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Pagination,
} from "@mui/material"
import { Search, CheckCircle, Cancel, Person } from "@mui/icons-material"
import Sidebar from "@/components/Sidebar"
import FixedHeader from "@/components/FixedHeader"

interface PendingApproval {
    accountNumber: string
    fullName: string
    email: string
    phoneNumber: string
    sector: string
    signatories: number
    authorizedUsers: AuthorizedUser[]
}

interface AuthorizedUser {
    name: string
    tier: string
    role: string
    accountNumber: string
    email: string
}

const mockApprovals: PendingApproval[] = [
    {
        accountNumber: "1012456789",
        fullName: "Olalekan Aminu",
        email: "Olalekan.Aminu@gmail.com",
        phoneNumber: "08123456789",
        sector: "Healthcare",
        signatories: 3,
        authorizedUsers: [
            {
                name: "Olalekan Aminu",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                accountNumber: "08123456789",
                email: "Olalekan@gmail.com",
            },
            {
                name: "Victor David",
                tier: "Tier 2 (N100M - N500M)",
                role: "Authorizer",
                accountNumber: "08123456789",
                email: "Olalekan@gmail.com",
            },
            {
                name: "Precious Nwoko",
                tier: "Tier 3 (N100M - N1B)",
                role: "Authorizer",
                accountNumber: "08123456789",
                email: "Olalekan@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Precious Nwoko",
        email: "Olalekan.Aminu@gmail.com",
        phoneNumber: "08123456789",
        sector: "Education",
        signatories: 4,
        authorizedUsers: [
            {
                name: "Precious Nwoko",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                accountNumber: "08123456789",
                email: "Precious@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Victor David",
        email: "Victor.David@gmail.com",
        phoneNumber: "08123456789",
        sector: "Technology / IT",
        signatories: 4,
        authorizedUsers: [
            {
                name: "Victor David",
                tier: "Tier 2 (N100M - N500M)",
                role: "Initiator",
                accountNumber: "08123456789",
                email: "Victor@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Precious Matthew",
        email: "Precious.Matthew@gmail.com",
        phoneNumber: "08123456789",
        sector: "Energy & Utilities",
        signatories: 1,
        authorizedUsers: [
            {
                name: "Precious Matthew",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                accountNumber: "08123456789",
                email: "Matthew@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Olalekan Victor",
        email: "Olalekan.Victor@gmail.com",
        phoneNumber: "08123456789",
        sector: "Manufacturing",
        signatories: 3,
        authorizedUsers: [
            {
                name: "Olalekan Victor",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                accountNumber: "08123456789",
                email: "Victor@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Joshua Nwoko",
        email: "Joshua.Nwoko@gmail.com",
        phoneNumber: "08123456789",
        sector: "Media",
        signatories: 1,
        authorizedUsers: [
            {
                name: "Joshua Nwoko",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                accountNumber: "08123456789",
                email: "Joshua@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Victor Matthew",
        email: "VictorMatthew@gmail.com",
        phoneNumber: "08123456789",
        sector: "Nonprofit",
        signatories: 5,
        authorizedUsers: [
            {
                name: "Victor Matthew",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                accountNumber: "08123456789",
                email: "Matthew@gmail.com",
            },
        ],
    },
]

export default function ApprovalWorkflow() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedApproval, setSelectedApproval] = useState<PendingApproval | null>(null)
    const [showUsersDialog, setShowUsersDialog] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState<{
        open: boolean
        type: "approve" | "reject"
        customer: PendingApproval | null
    }>({
        open: false,
        type: "approve",
        customer: null,
    })
    const [successDialog, setSuccessDialog] = useState<{
        open: boolean
        type: "approve" | "reject"
    }>({
        open: false,
        type: "approve",
    })
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 7

    const filteredApprovals = mockApprovals.filter(
        (approval) =>
            approval.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            approval.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            approval.sector.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const paginatedApprovals = filteredApprovals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handleViewUsers = (approval: PendingApproval) => {
        setSelectedApproval(approval)
        setShowUsersDialog(true)
    }

    const handleApprove = (approval: PendingApproval) => {
        setConfirmDialog({
            open: true,
            type: "approve",
            customer: approval,
        })
    }

    const handleReject = (approval: PendingApproval) => {
        setConfirmDialog({
            open: true,
            type: "reject",
            customer: approval,
        })
    }

    const handleConfirmAction = () => {
        setConfirmDialog({ open: false, type: "approve", customer: null })
        setSuccessDialog({
            open: true,
            type: confirmDialog.type,
        })
    }

    const handleSuccessClose = () => {
        setSuccessDialog({ open: false, type: "approve" })
    }

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
            <Sidebar  />
            <FixedHeader
                userName="Olalekan Babatunde"
                userRole="Super Admin"
                showIcons={true}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '44px' }}>

                {/* Page Title */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color: "#000000" }}>
                        Approval Workflow
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Review and confirm customer onboarding requests
                    </Typography>
                </Box>

                {/* Approvals Section */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight="600" sx={{ mb: 1, color: "#000000 !important" }}>
                        Approvals
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Review profile requests submitted
                    </Typography>

                    {/* Search */}
                    <TextField
                        placeholder="Search Beneficiary"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ mb: 3, width: 300 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: "text.secondary" }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Approvals Table */}
                    <TableContainer component={Paper} sx={{ mb: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#1e3a8a" }}>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Account Number</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Full Name</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phone Number</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sector</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>No of Signatories</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Authorised Users</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedApprovals.map((approval, index) => (
                                    <TableRow key={index} sx={{ "&:hover": { bgcolor: "grey.50" } }}>
                                        <TableCell>{approval.accountNumber}</TableCell>
                                        <TableCell>{approval.fullName}</TableCell>
                                        <TableCell>{approval.email}</TableCell>
                                        <TableCell>{approval.phoneNumber}</TableCell>
                                        <TableCell>{approval.sector}</TableCell>
                                        <TableCell>{approval.signatories.toString().padStart(2, "0")}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="text"
                                                size="small"
                                                onClick={() => handleViewUsers(approval)}
                                                sx={{ color: "#1976d2", textTransform: "none" }}
                                            >
                                                View Users
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", gap: 1 }}>
                                                <IconButton size="small" onClick={() => handleApprove(approval)} sx={{ color: "success.main" }}>
                                                    <CheckCircle />
                                                </IconButton>
                                                <IconButton size="small" onClick={() => handleReject(approval)} sx={{ color: "error.main" }}>
                                                    <Cancel />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                            Showing 1 to {Math.min(itemsPerPage, filteredApprovals.length)} of {filteredApprovals.length} entries
                        </Typography>
                        <Pagination
                            count={Math.ceil(filteredApprovals.length / itemsPerPage)}
                            page={currentPage}
                            onChange={(_, page) => setCurrentPage(page)}
                            color="primary"
                        />
                    </Box>
                </Box>
            </Box>

            {/* View Users Dialog */}
            <Dialog open={showUsersDialog} onClose={() => setShowUsersDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Authorized Users</DialogTitle>
                <DialogContent>
                    <List>
                        {selectedApproval?.authorizedUsers.map((user, index) => (
                            <ListItem key={index} sx={{ px: 0 }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${user.name} ${user.tier}`}
                                    secondary={
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {user.accountNumber} | {user.role}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {user.email}
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmDialog.open}
                onClose={() => setConfirmDialog({ open: false, type: "approve", customer: null })}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>{confirmDialog.type === "approve" ? "Approve Onboarding" : "Reject Onboarding"}</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary">
                        Are you sure you want to proceed? This action cannot be undone once confirmed.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialog({ open: false, type: "approve", customer: null })} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmAction}
                        variant="contained"
                        sx={{ bgcolor: "#4db6ac", "&:hover": { bgcolor: "#26a69a" } }}
                    >
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Success Dialog */}
            <Dialog open={successDialog.open} onClose={handleSuccessClose} maxWidth="xs" fullWidth>
                <DialogContent sx={{ textAlign: "center", py: 4 }}>
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            bgcolor: "#4caf50",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2,
                        }}
                    >
                        <CheckCircle sx={{ fontSize: 40, color: "white" }} />
                    </Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        Operation Successful
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {successDialog.type === "approve"
                            ? "The customer profile has been successfully Onboarded"
                            : "you have successfully rejected this Onboarding"}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleSuccessClose}
                        sx={{ bgcolor: "#4db6ac", "&:hover": { bgcolor: "#26a69a" } }}
                    >
                        Done
                    </Button>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
