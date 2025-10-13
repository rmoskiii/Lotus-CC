"use client"

import { useState } from "react"
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Avatar,
    Pagination,
    InputAdornment,
} from "@mui/material"
import {
    Visibility,
    Edit,
    Delete,
    Add,
    Search,
    KeyboardArrowDown,
    Person,
    CheckCircle,
    VpnKey,
    Cancel,
} from "@mui/icons-material"
import Sidebar, { drawerWidth } from "@/components/Sidebar"
import FixedHeader from "@/components/FixedHeader"

interface Customer {
    accountNumber: string
    fullName: string
    email: string
    phoneNumber: string
    sector: string
    status: "Active" | "Inactive"
}

interface AuthorizedUser {
    id: string
    name: string
    email: string
    phoneNumber: string
    role: string
    approvalTier: string
    status: "Active" | "Inactive"
}

const customers: Customer[] = [
    {
        accountNumber: "1012456789",
        fullName: "Olalekan Aminu",
        email: "Olalekan.Aminu@gmail.com",
        phoneNumber: "08123456789",
        sector: "Healthcare",
        status: "Active",
    },
    {
        accountNumber: "1012456789",
        fullName: "Precious Nwoko",
        email: "Olalekan.Aminu@gmail.com",
        phoneNumber: "08123456789",
        sector: "Education",
        status: "Active",
    },
    {
        accountNumber: "1012567890",
        fullName: "Victor David",
        email: "Victor.David@gmail.com",
        phoneNumber: "08123456789",
        sector: "Technology / IT",
        status: "Active",
    },
    {
        accountNumber: "1012567890",
        fullName: "Precious Matthew",
        email: "Precious.Matthew@gmail.com",
        phoneNumber: "08123456789",
        sector: "Energy & Utilities",
        status: "Inactive",
    },
    {
        accountNumber: "1012567890",
        fullName: "Olalekan Victor",
        email: "Olalekan.Victor@gmail.com",
        phoneNumber: "08123456789",
        sector: "Manufacturing",
        status: "Active",
    },
    {
        accountNumber: "1012567890",
        fullName: "Joshua Nwoko",
        email: "Joshua.Nwoko@gmail.com",
        phoneNumber: "08123456789",
        sector: "Media",
        status: "Active",
    },
    {
        accountNumber: "1012567890",
        fullName: "Victor Matthew",
        email: "VictorMatthew@gmail.com",
        phoneNumber: "08123456789",
        sector: "Nonprofit",
        status: "Active",
    },
]

const authorizedUsers: AuthorizedUser[] = [
    {
        id: "1",
        name: "Olalekan Aminu",
        email: "Olalekan@gmail.com",
        phoneNumber: "08123456789",
        role: "Initiator",
        approvalTier: "Tier 1 (N100M - N500M)",
        status: "Active",
    },
    {
        id: "2",
        name: "Victor David",
        email: "Victor@gmail.com",
        phoneNumber: "08123456789",
        role: "Reviewer",
        approvalTier: "Tier 2 (N100M - N500M)",
        status: "Active",
    },
    {
        id: "3",
        name: "Precious Nwoko",
        email: "Precious@gmail.com",
        phoneNumber: "08123456789",
        role: "Authorizer",
        approvalTier: "Tier 3 (N100M - N1B)",
        status: "Active",
    },
]

export default function CustomerManagement() {
    const [currentView, setCurrentView] = useState<"list" | "detail">("list")
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("All Status")
    const [currentPage, setCurrentPage] = useState(1)

    // Modal states
    const [addUserOpen, setAddUserOpen] = useState(false)
    const [editUserOpen, setEditUserOpen] = useState(false)
    const [deactivateOpen, setDeactivateOpen] = useState(false)
    const [resetPasswordOpen, setResetPasswordOpen] = useState(false)
    const [deleteUserOpen, setDeleteUserOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    // Form states
    const [selectedUser, setSelectedUser] = useState<AuthorizedUser | null>(null)
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        role: "",
        approvalTier: "",
    })

    const handleViewCustomer = (customer: Customer) => {
        setSelectedCustomer(customer)
        setCurrentView("detail")
    }

    const handleBackToList = () => {
        setCurrentView("list")
        setSelectedCustomer(null)
    }

    const handleNavigate = (route: string) => {
        // Handle navigation
        console.log("Navigate to:", route)
    }

    const handleAddUser = () => {
        setSuccessMessage("You have successfully added new user")
        setSuccessOpen(true)
        setAddUserOpen(false)
        setNewUser({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            role: "",
            approvalTier: "",
        })
    }

    const handleEditUser = () => {
        setSuccessMessage("Operation Successful - User successfully edited")
        setSuccessOpen(true)
        setEditUserOpen(false)
        setSelectedUser(null)
    }

    const handleDeactivateCustomer = () => {
        setSuccessMessage("Operation Successful - Customer deactivated")
        setSuccessOpen(true)
        setDeactivateOpen(false)
    }

    const handleResetPassword = () => {
        setSuccessMessage("Customer password has been reset. New password sent via email address")
        setSuccessOpen(true)
        setResetPasswordOpen(false)
    }

    const handleDeleteUser = () => {
        setSuccessMessage("Operation Successful - User deleted")
        setSuccessOpen(true)
        setDeleteUserOpen(false)
        setSelectedUser(null)
    }

    const openEditUser = (user: AuthorizedUser) => {
        setSelectedUser(user)
        setEditUserOpen(true)
    }

    const openDeleteUser = (user: AuthorizedUser) => {
        setSelectedUser(user)
        setDeleteUserOpen(true)
    }

    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch =
            customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.accountNumber.includes(searchTerm)
        const matchesStatus = statusFilter === "All Status" || customer.status === statusFilter
        return matchesSearch && matchesStatus
    })

    if (currentView === "detail" && selectedCustomer) {
        return (
            <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
                <Sidebar />
                <FixedHeader
                    userName="Olalekan Babatunde"
                    userRole="Initiator"
                    showIcons={true}
                />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        pt: 8,
                        px: 6,
                        pb: 3,
                        pl: 3,
                        pr: 3,
                        overflowX: "auto",
                        overflowY: "auto",
                        width: `calc(100vw - ${drawerWidth}px)`, // Proper width calculation
                    }}
                >

                    {/* Page Title */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" fontWeight="600" sx={{ mb: 1, color: "#000000 !important" }}>
                            Customer Management
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            View, edit, and manage all existing customers
                        </Typography>
                    </Box>

                    {/* Account Information Section */}
                        <Grid item xs={12}>
                            <Card sx={{ mb: 3 }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                                        <Typography variant="h6" fontWeight="600">
                                            Account Information
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            startIcon={<VpnKey />}
                                            onClick={() => setResetPasswordOpen(true)}
                                            sx={{ textTransform: "none" }}
                                        >
                                            Reset Password
                                        </Button>
                                    </Box>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                Account Details
                                            </Typography>
                                            <Typography variant="body1" fontWeight="500">
                                                {selectedCustomer.fullName} | {selectedCustomer.accountNumber} | Savings Account
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                Email
                                            </Typography>
                                            <Typography variant="body1">{selectedCustomer.email}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                Phone Number
                                            </Typography>
                                            <Typography variant="body1">{selectedCustomer.phoneNumber}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                Sector
                                            </Typography>
                                            <Typography variant="body1">{selectedCustomer.sector}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                Number of Signatories
                                            </Typography>
                                            <Typography variant="body1">2</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            {/* Authorized Users Section */}
                            <Card>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                                        <Typography variant="h6" fontWeight="600">
                                            Authorized Users
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            startIcon={<Add />}
                                            onClick={() => setAddUserOpen(true)}
                                            sx={{
                                                textTransform: "none",
                                                bgcolor: "#4db6ac",
                                                "&:hover": { bgcolor: "#26a69a" },
                                            }}
                                        >
                                            Add New User
                                        </Button>
                                    </Box>

                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                        {authorizedUsers.map((user) => (
                                            <Paper key={user.id} sx={{ p: 3, border: "1px solid", borderColor: "grey.200" }}>
                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                                    <Box sx={{ display: "flex", gap: 2 }}>
                                                        <Avatar sx={{ bgcolor: "grey.300" }}>
                                                            <Person />
                                                        </Avatar>
                                                        <Box>
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                                                <Typography variant="subtitle1" fontWeight="600">
                                                                    {user.name}
                                                                </Typography>
                                                                <Chip
                                                                    label={user.role}
                                                                    size="small"
                                                                    sx={{
                                                                        bgcolor:
                                                                            user.role === "Initiator"
                                                                                ? "#e3f2fd"
                                                                                : user.role === "Reviewer"
                                                                                    ? "#fff3e0"
                                                                                    : "#f3e5f5",
                                                                        color:
                                                                            user.role === "Initiator"
                                                                                ? "#1976d2"
                                                                                : user.role === "Reviewer"
                                                                                    ? "#f57c00"
                                                                                    : "#7b1fa2",
                                                                    }}
                                                                />
                                                            </Box>
                                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                                {user.approvalTier}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {user.phoneNumber} | {user.email}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: "flex", gap: 1 }}>
                                                        <IconButton size="small" sx={{ color: "grey.600" }} onClick={() => openEditUser(user)}>
                                                            <Edit />
                                                        </IconButton>
                                                        <IconButton size="small" sx={{ color: "error.main" }} onClick={() => openDeleteUser(user)}>
                                                            <Delete />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                        <Button variant="outlined" onClick={handleBackToList} sx={{ textTransform: "none" }}>
                            Go Back
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setDeactivateOpen(true)}
                            sx={{ textTransform: "none" }}
                        >
                            Deactivate Customer
                        </Button>
                    </Box>
                </Box>

                {/* Modals */}
                {/* Add New User Modal */}
                <Dialog open={addUserOpen} onClose={() => setAddUserOpen(false)} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "600" }}>Add New User</DialogTitle>
                    <DialogContent sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    required
                                    placeholder="Enter First Name"
                                    value={newUser.firstName}
                                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    required
                                    placeholder="Enter Last Name"
                                    value={newUser.lastName}
                                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    required
                                    placeholder="Enter Email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    required
                                    placeholder="Enter Phone Number"
                                    value={newUser.phoneNumber}
                                    onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required>
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        value={newUser.role}
                                        label="Role"
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    >
                                        <MenuItem value="Initiator">Initiator</MenuItem>
                                        <MenuItem value="Reviewer">Reviewer</MenuItem>
                                        <MenuItem value="Authorizer">Authorizer</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required>
                                    <InputLabel>Approval Tier</InputLabel>
                                    <Select
                                        value={newUser.approvalTier}
                                        label="Approval Tier"
                                        onChange={(e) => setNewUser({ ...newUser, approvalTier: e.target.value })}
                                    >
                                        <MenuItem value="Tier 1">Tier 1</MenuItem>
                                        <MenuItem value="Tier 2">Tier 2</MenuItem>
                                        <MenuItem value="Tier 3">Tier 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, justifyContent: "space-between" }}>
                        <Button onClick={() => setAddUserOpen(false)} sx={{ textTransform: "none" }}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleAddUser}
                            sx={{
                                textTransform: "none",
                                bgcolor: "#4db6ac",
                                "&:hover": { bgcolor: "#26a69a" },
                            }}
                        >
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Edit User Modal */}
                <Dialog open={editUserOpen} onClose={() => setEditUserOpen(false)} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "600" }}>Edit User</DialogTitle>
                    <DialogContent sx={{ p: 3 }}>
                        {selectedUser && (
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="First Name" required defaultValue={selectedUser.name.split(" ")[0]} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Last Name" required defaultValue={selectedUser.name.split(" ")[1]} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Email" required defaultValue={selectedUser.email} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Phone Number" required defaultValue={selectedUser.phoneNumber} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Role</InputLabel>
                                        <Select defaultValue={selectedUser.role} label="Role">
                                            <MenuItem value="Initiator">Initiator</MenuItem>
                                            <MenuItem value="Reviewer">Reviewer</MenuItem>
                                            <MenuItem value="Authorizer">Authorizer</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Approval Tier</InputLabel>
                                        <Select defaultValue="Tier 1" label="Approval Tier">
                                            <MenuItem value="Tier 1">Tier 1</MenuItem>
                                            <MenuItem value="Tier 2">Tier 2</MenuItem>
                                            <MenuItem value="Tier 3">Tier 3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ p: 3, justifyContent: "space-between" }}>
                        <Button onClick={() => setEditUserOpen(false)} sx={{ textTransform: "none" }}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleEditUser}
                            sx={{
                                textTransform: "none",
                                bgcolor: "#4db6ac",
                                "&:hover": { bgcolor: "#26a69a" },
                            }}
                        >
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Deactivate Customer Modal */}
                <Dialog open={deactivateOpen} onClose={() => setDeactivateOpen(false)} maxWidth="sm">
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "600" }}>Deactivate Customer</DialogTitle>
                    <DialogContent sx={{ textAlign: "center", p: 3 }}>
                        <Typography color="text.secondary">
                            Are you sure you want to proceed? This action cannot be undone once confirmed.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, justifyContent: "space-between" }}>
                        <Button onClick={() => setDeactivateOpen(false)} sx={{ textTransform: "none" }}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleDeactivateCustomer}
                            sx={{
                                textTransform: "none",
                                bgcolor: "#4db6ac",
                                "&:hover": { bgcolor: "#26a69a" },
                            }}
                        >
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Reset Password Modal */}
                <Dialog open={resetPasswordOpen} onClose={() => setResetPasswordOpen(false)} maxWidth="sm">
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "600" }}>Reset Password</DialogTitle>
                    <DialogContent sx={{ textAlign: "center", p: 3 }}>
                        <Typography color="text.secondary">
                            Are you sure you want to reset this customer's main account password? A new temporary password will be
                            sent to their registered email address.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, justifyContent: "space-between" }}>
                        <Button onClick={() => setResetPasswordOpen(false)} sx={{ textTransform: "none" }}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleResetPassword}
                            sx={{
                                textTransform: "none",
                                bgcolor: "#4db6ac",
                                "&:hover": { bgcolor: "#26a69a" },
                            }}
                        >
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete User Modal */}
                <Dialog open={deleteUserOpen} onClose={() => setDeleteUserOpen(false)} maxWidth="sm">
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "600" }}>Delete User</DialogTitle>
                    <DialogContent sx={{ textAlign: "center", p: 3 }}>
                        <Typography color="text.secondary">
                            Are you sure you want to delete this user? This action cannot be undone.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, justifyContent: "space-between" }}>
                        <Button onClick={() => setDeleteUserOpen(false)} sx={{ textTransform: "none" }}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="error" onClick={handleDeleteUser} sx={{ textTransform: "none" }}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Success Modal */}
                <Dialog open={successOpen} onClose={() => setSuccessOpen(false)} maxWidth="sm">
                    <DialogContent sx={{ textAlign: "center", p: 4 }}>
                        <Box sx={{ mb: 3 }}>
                            <Avatar sx={{ bgcolor: "#4caf50", width: 64, height: 64, mx: "auto", mb: 2 }}>
                                <CheckCircle sx={{ fontSize: 32 }} />
                            </Avatar>
                            <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
                                Operation Successful
                            </Typography>
                            <Typography color="text.secondary">{successMessage}</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            onClick={() => setSuccessOpen(false)}
                            sx={{
                                textTransform: "none",
                                bgcolor: "#4db6ac",
                                "&:hover": { bgcolor: "#26a69a" },
                            }}
                        >
                            Done
                        </Button>
                    </DialogContent>
                </Dialog>
            </Box>
        )
    }

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
            <Sidebar  />
            <FixedHeader
                userName="Olalekan Babatunde"
                userRole="Super Admin"
                showIcons={true}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '44px', width: `calc(100vw - ${drawerWidth}px)`, overflowX: "auto",
                overflowY: "auto",
            }}>


                {/* Page Title */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight="600" sx={{ mb: 1, color: "#000000 !important" }}>
                        Customer Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        View, edit, and manage all existing customers
                    </Typography>
                </Box>

                {/* Customers Section */}
                <Card>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
                            Customers
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Search and filter customer profiles with management options
                        </Typography>

                        {/* Search and Filter */}
                        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                            <TextField
                                placeholder="Search Customer"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ flexGrow: 1 }}
                            />
                            <FormControl sx={{ minWidth: 150 }}>
                                <Select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    displayEmpty
                                    IconComponent={KeyboardArrowDown}
                                >
                                    <MenuItem value="All Status">All Status</MenuItem>
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Customer Table */}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: "#1e3a8a" }}>
                                        <TableCell sx={{ color: "white", fontWeight: "600" }}>Account Number</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "600" }}>Full Name</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "600" }}>Email</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "600" }}>Phone Number</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "600" }}>Sector</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "600" }}>Status</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "600" }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredCustomers.slice((currentPage - 1) * 7, currentPage * 7).map((customer, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                "&:hover": { bgcolor: "grey.50", cursor: "pointer" },
                                                cursor: "pointer",
                                            }}
                                            onClick={() => handleViewCustomer(customer)}
                                        >
                                            <TableCell>{customer.accountNumber}</TableCell>
                                            <TableCell>{customer.fullName}</TableCell>
                                            <TableCell>{customer.email}</TableCell>
                                            <TableCell>{customer.phoneNumber}</TableCell>
                                            <TableCell>{customer.sector}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={customer.status}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: customer.status === "Active" ? "#e8f5e8" : "#ffebee",
                                                        color: customer.status === "Active" ? "#2e7d32" : "#d32f2f",
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: "flex", gap: 1 }}>
                                                    <IconButton size="small" sx={{ color: "grey.600" }}>
                                                        <Visibility />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            color: customer.status === "Active" ? "error.main" : "success.main",
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            // Handle activate/deactivate logic here
                                                        }}
                                                    >
                                                        {customer.status === "Active" ? <Cancel /> : <CheckCircle />}
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Pagination */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                Showing 1 to 6 of 20 entries
                            </Typography>
                            <Pagination
                                count={Math.ceil(filteredCustomers.length / 7)}
                                page={currentPage}
                                onChange={(e, page) => setCurrentPage(page)}
                                color="primary"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}
