import express from 'express';
import { Error } from 'mongoose';
const customersRouter = express.Router();
import Customer from '../models/customer'

async function getCustomer(req, res, next) {
    try {
        const customer = await Customer.findById(req.params.id);
        if (customer == null) {
            return res.status(404).json({ message: Error.messages });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.customer = Customer;
    next();
};

// Get All Customers
customersRouter.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create A Customer
customersRouter.post('/customers', async (req, res) => {
    const customer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
    });

    try {
        const newCustomer = await customer.save();
        res.status(201).json(newCustomer)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Get A Customer
// customersRouter.get('/customers/:id', getCustomer, (req, res) => {
//     res.json(res.customer);
// });


// // Delete A Customer
// customersRouter.delete('/customers/:id', getCustomer, async (req, res) => {
//     try {
//         await res.customer.remove();
//         res.json({ message: "Customer Deleted" });
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// });

// // Update A Customer
// customersRouter.patch('/customers/:id', getCustomer, async (req, res) => {
//     if (req.body.firstName != null) {
//         res.customer.firstName = req.body.firstName;
//     } else if (req.body.lastName != null) {
//         res.customer.lastName = req.body.lastName;
//     }else if (req.body.age != null) {
//         res.customer.age = req.body.age;
//     }else if (req.body.email != null) {
//         res.customer.email = req.body.email;
//     }
//     try {
//         const updateCustomer = await res.customer.save();
//         res.json(updateCustomer);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

export default customersRouter; 