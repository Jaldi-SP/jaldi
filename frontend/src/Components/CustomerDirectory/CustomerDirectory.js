import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@material-ui/core";

const CustomerDirectory = ({ allCustomers }) => {
    return (
        <TableContainer component={Paper} sx={{ height: '80vh' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allCustomers.map((customer) => (
                        <TableRow key={customer.business_id}>
                            <TableCell>{customer.first_name}</TableCell>
                            <TableCell>{customer.last_name}</TableCell>
                            <TableCell>{customer.phone_number}</TableCell>
                            <TableCell>{customer.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomerDirectory;
